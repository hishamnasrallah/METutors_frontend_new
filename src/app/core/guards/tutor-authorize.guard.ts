import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
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
export class TutorAuthorizeGuard implements CanActivate {
  constructor(private _store: Store<any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this._store.dispatch(fromCore.loadProfileTutor());

    return this._store.pipe(
      select(fromCore.selectProfileTutor),
      map((profileTutor) => {
        if (profileTutor) {
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
}
