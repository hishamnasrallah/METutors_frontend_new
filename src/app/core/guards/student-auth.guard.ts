import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import camelcaseKeys from 'camelcase-keys';
import { UserRole } from '@metutor/config';

@Injectable()
export class StudentAuthGuard implements CanActivate {
  constructor(private _store: Store<any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this._store.pipe(
      select(fromCore.selectToken),
      map((token) => {
        if (!token || !this._isStudentToken(token)) {
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

  private _isStudentToken(token: string): boolean {
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

      if (userRole?.toString() === UserRole.student.toString()) return true;
      else return false;
    } else return false;
  }
}
