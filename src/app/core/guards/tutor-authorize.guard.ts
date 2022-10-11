import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { InterviewStatus } from '@metutor/config';
import { Observable, of, filter, map } from 'rxjs';

@Injectable()
export class TutorAuthorizeGuard implements CanActivate {
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
        } else if (
          !tutor?.interviewRequest ||
          tutor?.interviewRequest?.status === InterviewStatus.pending ||
          tutor?.interviewRequest?.status === InterviewStatus.scheduled ||
          tutor?.interviewRequest?.status === InterviewStatus.rejected
        ) {
          this._router.navigateByUrl('/tutor/settings');

          return false;
        }

        return true;
      })
    );
  }
}
