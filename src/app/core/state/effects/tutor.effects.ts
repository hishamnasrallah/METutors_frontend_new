import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { IInterview } from '@metutor/core/models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { TutorsService } from '@services';
import { environment } from '@environment';
import * as fromRouterStore from '@metutor/state';
import * as tutorActions from '../actions/tutor.actions';
import { AlertNotificationService } from '@metutor/core/components';

import {
  selectTutors,
  selectProfileTutor,
  selectCurrentTutors,
  selectPendingTutors,
  selectTutorDashboard,
  selectSuspendedTutors,
} from '..';
import {
  loadAvailableTutors,
  loadAvailableTutorsEnded,
} from '../actions/tutor.actions';

@Injectable()
export class TutorEffects {
  completeTutorProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.completeTutorProfile),
      mergeMap(({ data, nextStep }) =>
        this._tutorService.sendTeacherAccount(data).pipe(
          map((response) => {
            const jwtHelper = new JwtHelperService();
            const decodeToken = camelcaseKeys(
              jwtHelper.decodeToken(response?.token),
              {
                deep: true,
              }
            );
            const user: any = decodeToken?.user;

            return tutorActions.completeTutorProfileSuccess({
              nextStep,
              token: response?.token,
              user: {
                ...user,
                avatar: environment.imageURL + user?.avatar,
              },
            });
          }),
          catchError((error) =>
            of(
              tutorActions.completeTutorProfileFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  updateTutorProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.updateTutorProfile),
      mergeMap(({ data }) =>
        this._tutorService.updateTeacherProfile(data).pipe(
          map((response) =>
            tutorActions.updateTutorProfileSuccess({
              message: response?.message,
            })
          ),
          catchError((error) =>
            of(
              tutorActions.updateTutorProfileFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutors),
      withLatestFrom(this._store.select(selectTutors)),
      mergeMap(([_, _tutors]) => {
        if (!_tutors || !_tutors?.length) {
          return this._tutorService.getTutors().pipe(
            map((response) =>
              tutorActions.loadTutorsSuccess({
                tutors: response.tutors,
                tutorsCounts: response.tutorsCounts,
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadTutorsEnded());
        }
      })
    )
  );

  loadAvailableTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadAvailableTutors),
      withLatestFrom(
        this._store.select(selectTutors),
        this._store.select(fromRouterStore.selectRouteParams)
      ),
      mergeMap(([_, _tutors, { id }]) => {
        if (!_tutors || !_tutors?.length) {
          return this._tutorService.getAvailableTutors(id).pipe(
            map((availableTutors) => {
              return tutorActions.loadAvailableTutorsSuccess({
                availableTutors,
              });
            }),
            catchError((error) => {
              console.log(error);
              return of(
                tutorActions.loadAvailableTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              );
            })
          );
        } else {
          return of(tutorActions.loadAvailableTutorsEnded());
        }
      })
    )
  );

  loadCurrentTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadCurrentTutors),
      withLatestFrom(this._store.select(selectCurrentTutors)),
      mergeMap(([_, _tutors]) => {
        if (!_tutors || !_tutors?.length) {
          return this._tutorService.getCurrentTutors().pipe(
            map((currentTutors) =>
              tutorActions.loadCurrentTutorsSuccess({
                currentTutors,
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadCurrentTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadCurrentTutorsEnded());
        }
      })
    )
  );

  loadPendingTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadPendingTutors),
      withLatestFrom(this._store.select(selectPendingTutors)),
      mergeMap(([_, _tutors]) => {
        if (!_tutors || !_tutors?.length) {
          return this._tutorService.getPendingTutors().pipe(
            map((pendingTutors) =>
              tutorActions.loadPendingTutorsSuccess({
                pendingTutors,
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadPendingTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadPendingTutorsEnded());
        }
      })
    )
  );

  loadSuspendedTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadSuspendedTutors),
      withLatestFrom(this._store.select(selectSuspendedTutors)),
      mergeMap(([_, _tutors]) => {
        if (!_tutors || !_tutors?.length) {
          return this._tutorService.getSuspendedTutors().pipe(
            map((suspendedTutors) =>
              tutorActions.loadSuspendedTutorsSuccess({
                suspendedTutors,
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadSuspendedTutorsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadSuspendedTutorsEnded());
        }
      })
    )
  );

  loadTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutor),
      mergeMap(({ id }) =>
        this._tutorService.getTutorById(id).pipe(
          map((tutor) =>
            tutorActions.loadTutorSuccess({
              tutor,
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadProfileTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadProfileTutor),
      withLatestFrom(this._store.select(selectProfileTutor)),
      mergeMap(([_, _profile]) => {
        if (!_profile) {
          return this._tutorService.getProfileTutor().pipe(
            map((tutor) =>
              tutorActions.loadProfileTutorSuccess({
                tutor,
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadProfileTutorFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadProfileTutorEnded());
        }
      })
    )
  );

  changeTutorCoverr$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.changeTutorCover),
      mergeMap(({ file }) =>
        this._tutorService.changeCover(file).pipe(
          map((response) =>
            tutorActions.changeTutorCoverSuccess({
              cover: environment.imageURL + response?.cover_img,
            })
          ),
          catchError((error) =>
            of(
              tutorActions.changeTutorCoverFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  submitInterview$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.submitInterview),
      mergeMap((action) =>
        this._tutorService
          .tutorSubmitInterview(action.submitInterviewInput)
          .pipe(
            map((response) =>
              tutorActions.submitInterviewSuccess({
                message: response.message,
                interviewRequest: new IInterview(
                  false,
                  response.interview_request
                ),
              })
            ),
            catchError((error) =>
              of(
                tutorActions.submitInterviewFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  loadTutorDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorDashboard),
      withLatestFrom(this._store.select(selectTutorDashboard)),
      mergeMap(([{ params, load }, _dashboard]) => {
        if (!_dashboard || load) {
          return this._tutorService.getTutorDashboard(params).pipe(
            map((dashboard) =>
              tutorActions.loadTutorDashboardSuccess({
                dashboard: camelcaseKeys(dashboard, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                tutorActions.loadTutorDashboardFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadTutorDashboardEnded());
        }
      })
    )
  );

  tutorLaunchClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorLaunchClass),
      mergeMap(({ classId }) =>
        this._tutorService.launchClass(classId).pipe(
          map((response) => {
            if (response && response?.class_url) {
              window.open(response.class_url, '_blank');
            }

            return tutorActions.tutorLaunchClassSuccess();
          }),
          catchError((error) =>
            of(
              tutorActions.tutorLaunchClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorAttendance$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorAttendance),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorAttendance(id).pipe(
          map((attendance) =>
            tutorActions.loadTutorAttendanceSuccess({
              attendance: camelcaseKeys(attendance, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorAttendanceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorFeedbackOptions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorFeedbackOptions),
      mergeMap(() =>
        this._tutorService.getTutorFeedbackOptions().pipe(
          map((feedbackOptions) =>
            tutorActions.loadTutorFeedbackOptionsSuccess({
              feedbackOptions: camelcaseKeys(feedbackOptions, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorFeedbackOptionsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorFeedbackPlatformOptions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorFeedbackPlatformOptions),
      mergeMap(() =>
        this._tutorService.getTutorFeedbackPlatformOptions().pipe(
          map((feedbackOptions) =>
            tutorActions.loadTutorFeedbackPlatformOptionsSuccess({
              feedbackOptions: camelcaseKeys(feedbackOptions, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorFeedbackPlatformOptionsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorSubmitFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorSubmitFeedback),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._tutorService.tutorSubmitFeedback(body, id).pipe(
          map(() =>
            tutorActions.tutorSubmitFeedbackSuccess({
              redirect: body?.redirect,
              message: 'Feedback successfully submitted',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorSubmitFeedbackFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorSubmitPlatformFeedback$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorSubmitPlatformFeedback),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._tutorService.tutorSubmitPlatformFeedback(body, id).pipe(
          map(() =>
            tutorActions.tutorSubmitPlatformFeedbackSuccess({
              message: 'Feedback successfully submitted',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorSubmitPlatformFeedbackFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorRescheduleClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorRescheduleClass),
      mergeMap(({ body }) =>
        this._tutorService.tutorRescheduleClass(body).pipe(
          map((attendance) =>
            tutorActions.tutorRescheduleClassSuccess({
              body,
              message: 'Class successfully rescheduled',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorRescheduleClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorSubmitFeedbackSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(tutorActions.tutorSubmitFeedbackSuccess),
        map(({ redirect }) => {
          console.log(redirect);
          if (redirect) {
            this._router.navigate(['/tutor/classrooms']);
          }
        })
      ),
    { dispatch: false }
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            tutorActions.submitInterviewSuccess,
            tutorActions.updateTutorProfileSuccess,
            tutorActions.tutorSubmitFeedbackSuccess,
            tutorActions.tutorRescheduleClassSuccess,
            tutorActions.tutorSubmitPlatformFeedbackSuccess,
          ]
        ),
        map(({ message }) => this._alertNotificationService.success(message))
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
            tutorActions.submitInterviewFailure,
            tutorActions.tutorLaunchClassFailure,
            tutorActions.updateTutorProfileFailure,
            tutorActions.tutorSubmitFeedbackFailure,
            tutorActions.completeTutorProfileFailure,
            tutorActions.completeTutorProfileFailure,
            tutorActions.tutorRescheduleClassFailure,
            tutorActions.tutorSubmitPlatformFeedbackFailure,
          ]
        ),
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
    private _tutorService: TutorsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
