import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, of, filter, map } from 'rxjs';
import * as fromCore from '@metutor/core/state';

@Injectable()
export class TutorSettingsGuard implements CanActivate {
  constructor(private _router: Router, private _store: Store<any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this._store.dispatch(fromCore.loadProfileTutor());

    return this._store.pipe(
      select(fromCore.selectProfileTutor),
      filter((profileTutor) => !!profileTutor),
      map((tutor) => {
        if (+tutor?.completedStep! < 5) {
          this._router.navigateByUrl('/profile/complete-profile');

          return false;
        }

        return true;
      })
    );
  }
}
