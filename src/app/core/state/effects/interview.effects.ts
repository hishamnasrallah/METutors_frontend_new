import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { InterviewsService } from '@services';
import * as fromCore from '@metutor/core/state';
import * as fromRouterStore from '@metutor/state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as interviewActions from '../actions/interview.actions';
import { AlertNotificationService } from '@metutor/core/components';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class InterviewEffects {
  loadInterviews$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.loadInterviews),
      mergeMap(({ params }) =>
        this._interviewService.loadInterviews(params).pipe(
          map(({ total, interviews }) =>
            interviewActions.loadInterviewsSuccess({
              total,
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
        )
      )
    )
  );

  loadInterview$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.loadInterview),
      withLatestFrom(
        this._store.select(fromCore.selectInterview),
        this._store.select(fromRouterStore.selectRouteParams)
      ),
      mergeMap(([action, _interview, { id }]) => {
        const interviewId = action.id ? action.id : id;

        if (_interview && _interview.id === interviewId) {
          return of(interviewActions.loadInterviewEnded());
        } else {
          return this._interviewService.loadInterview(interviewId).pipe(
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
        }
      })
    )
  );

  acceptInterviewRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.acceptInterviewRequest),
      mergeMap((action) =>
        this._interviewService
          .acceptInterviewRequest(action.id, action.body)
          .pipe(
            map((acceptInterviewPayload) =>
              interviewActions.acceptInterviewRequestSuccess({
                message: acceptInterviewPayload.message,
              })
            ),
            catchError((error) =>
              of(
                interviewActions.acceptInterviewRequestFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  declineInterviewRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.declineInterviewRequest),
      mergeMap((action) =>
        this._interviewService
          .declineInterviewRequest(action.id, action.body)
          .pipe(
            map((declineInterviewPayload) =>
              interviewActions.declineInterviewRequestSuccess({
                message: declineInterviewPayload.message,
              })
            ),
            catchError((error) =>
              of(
                interviewActions.declineInterviewRequestFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  scheduleInterviewRequest$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.scheduleInterviewRequest),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body, interviewId }, { id }]) =>
        this._interviewService
          .scheduleInterviewRequest(id || interviewId, body)
          .pipe(
            map(() =>
              interviewActions.scheduleInterviewRequestSuccess({
                id: id || interviewId,
                interview: {
                  interviewDate: body?.date,
                  interviewTime: body?.start_time,
                },
                message: 'INTERVIEW_SENT_SUCCESSFULLY',
              })
            ),
            catchError((error) =>
              of(
                interviewActions.scheduleInterviewRequestFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  joinInterview$ = createEffect(() =>
    this._actions$.pipe(
      ofType(interviewActions.joinInterview),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ interviewId }, { id }]) =>
        this._interviewService.joinInterview(id || interviewId).pipe(
          map((result) => {
            if (result?.meeting_url) {
              window.open(result.meeting_url, '_blank');
            }

            return interviewActions.joinInterviewSuccess();
          }),
          catchError((error) =>
            of(
              interviewActions.joinInterviewFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  acceptInterviewRequestSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            interviewActions.acceptInterviewRequestSuccess,
            interviewActions.declineInterviewRequestSuccess,
          ]
        ),
        map(() => {
          this._router.navigate(['/admin/tutor/interview']);
        })
      ),
    {
      dispatch: false,
    }
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            interviewActions.acceptInterviewRequestSuccess,
            interviewActions.declineInterviewRequestSuccess,
            interviewActions.scheduleInterviewRequestSuccess,
          ]
        ),
        map((action) => {
          if (action.message) {
            return this._alertNotificationService.success(action.message);
          } else {
            return this._alertNotificationService.success(
              'INFORMATION_UPDATED_SUCCESSFULLY'
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            interviewActions.joinInterviewFailure,
            interviewActions.loadInterviewsFailure,
            interviewActions.acceptInterviewRequestFailure,
            interviewActions.declineInterviewRequestFailure,
            interviewActions.scheduleInterviewRequestFailure,
          ]
        ),
        map((action) => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error('SOMETHING_WENT_WRONG');
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
