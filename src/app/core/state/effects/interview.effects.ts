import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { InterviewsService } from '@services';
import * as fromCore from '@metutor/core/state';
import * as interviewActions from '../actions/interview.actions';
import { AlertNotificationService } from '@metutor/core/components';
import { Router } from '@angular/router';

@Injectable()
export class InterviewEffects {
  loadInterviews$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.loadInterviews),
      withLatestFrom(this._store.select(fromCore.selectInterviews)),
      mergeMap(([_, _interviews]) => {
        if (!_interviews || !_interviews.length) {
          return this._interviewService.loadInterviews().pipe(
            map((interviews) =>
              interviewActions.loadInterviewsSuccess({
                interviews,
              })
            ),
            catchError((error) =>
              of(
                interviewActions.loadInterviewsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(interviewActions.loadInterviewsEnded());
        }
      })
    )
  );

  loadInterview$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.loadInterview),
      withLatestFrom(this._store.select(fromCore.selectInterview)),
      mergeMap(([action, _interview]) => {
        // if (_interview && _interview.interviewId === action.id) {
        //   return of(interviewActions.loadInterviewEnded());
        // } else {
          return this._interviewService.loadInterview(action.id).pipe(
            map((interview) =>
              interviewActions.loadInterviewSuccess({
                interview,
              })
            ),
            catchError((error) =>
              of(
                interviewActions.loadInterviewFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        // }
      })
    )
  );

  /*
  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[]),
        map((action) => {
          if (action.message) {
            return this._alertNotificationService.success(action.message);
          } else {
            return this._alertNotificationService.success(
              'Information updated successfully!'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );
  */

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[interviewActions.loadInterviewsFailure]),
        map((action) => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error(
              'Something went wrong!'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _interviewService: InterviewsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
