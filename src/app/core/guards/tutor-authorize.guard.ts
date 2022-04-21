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
import { AlertNotificationService } from '../components';

@Injectable()
export class TutorAuthorizeGuard implements CanActivate {
  constructor(
    private _store: Store<any>,
    private _router: Router,
    private _alertNotificationService: AlertNotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this._store
      .select(fromCore.selectProfileTutor)
      .pipe(filter((profileTutor) => !!profileTutor))
      .subscribe((tutor) => {
        if (
          tutor?.interviewRequest?.status === InterviewStatus.pending ||
          tutor?.interviewRequest?.status === InterviewStatus.scheduled ||
          tutor?.interviewRequest?.status === InterviewStatus.rejected
        ) {
          this._alertNotificationService.error(
            "You don't have a permission to access this route"
          );
          this._router.navigateByUrl('/tutor/settings');

          return of(false);
        }

        return of(true);
      });

    return true;
  }
}
