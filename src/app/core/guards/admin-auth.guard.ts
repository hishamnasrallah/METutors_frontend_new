import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import camelcaseKeys from 'camelcase-keys';
import { UserRole } from '@metutor/config';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private _store: Store<any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this._store.pipe(
      select(fromCore.selectToken),
      map((token) => {
        if (!token || !this._isAdminToken(token)) {
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

  private _isAdminToken(token: string): boolean {
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

      return userRole?.toString() === UserRole.admin.toString();
    } else return false;
  }
}
