import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, of, filter } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { InterviewStatus } from '@metutor/config';

@Injectable()
export class TutorAuthorizeGuard implements CanActivate {
  constructor(private _router: Router, private _store: Store<any>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this._store
      .select(fromCore.selectProfileTutor)
      .pipe(filter((profileTutor) => !!profileTutor))
      .subscribe((tutor) => {
        // console.log(this._router.url);
        // if (this._router.url === '/profile/complete-profile') {
        //   return of(false);
        // }
        // if (+tutor?.completedStep! <= 5) {
        //   console.log(tutor?.completedStep);
        //   //   // this._store.dispatch(fromCore.enterTutorSettings());
        //   //   // this._router.navigateByUrl(`/profile/tutor/${tutor?.id.toString()}`);
        //   // this._router.navigateByUrl('/profile/complete-profile');
        //   //   // this._router.navigateByUrl('/tutor/settings');
        //   // this._router.navigateByUrl('/signin');
        //   return of(false);
        // }

        if (
          !tutor?.interviewRequest ||
          tutor?.interviewRequest?.status === InterviewStatus.pending ||
          tutor?.interviewRequest?.status === InterviewStatus.scheduled ||
          tutor?.interviewRequest?.status === InterviewStatus.rejected
        ) {
          // this._alertNotificationService.error("You don't have a permission to access this route");
          this._router.navigateByUrl('/tutor/settings');

          return of(false);
        }

        return of(true);
      });

    return of(true);
  }
}
