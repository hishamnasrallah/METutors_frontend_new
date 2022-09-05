import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { UserRole } from '@metutor/config';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable()
export class TutorAuthGuard implements CanActivate {
  constructor(private _store: Store<any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this._store.pipe(
      select(fromCore.selectToken),
      map((token) => {
        if (!token || !this._isTutorToken(token)) {
          this._store.dispatch(
            fromCore.signInRequired({
              returnUrl: state.url,
            })
          );

          return false;
        }

        return true;
      })
    );
  }

  private _isTutorToken(token: string): boolean {
    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();
    const isExpired = jwtHelper.isTokenExpired(token);

    if (!isExpired) {
      const user = camelcaseKeys(jwtHelper.decodeToken(token), {
        deep: true,
      });
      const userRole = user?.user?.roleId;

      return userRole?.toString() === UserRole.tutor.toString();
    } else return false;
  }
}
