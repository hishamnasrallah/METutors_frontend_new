import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { isNil, omitBy } from 'lodash';
import { TutorsService } from '@services';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import * as fromRouterStore from '@metutor/state';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as tutorActions from '../actions/tutor.actions';
import { IInterview, ITutor } from '@metutor/core/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { selectTutorDashboard, selectFeaturedTutors } from '..';
import { AlertNotificationService } from '@metutor/core/components';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class TutorEffects {
  completeTutorProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.completeTutorProfile),
      mergeMap(({ data, nextStep }) =>
        this._tutorService.sendTeacherAccount(data).pipe(
          map(response => {
            const jwtHelper = new JwtHelperService();
            const decodeToken = camelcaseKeys(
              jwtHelper.decodeToken(response?.token),
              {
                deep: true
              }
            );
            const user: any = decodeToken?.user;

            return tutorActions.completeTutorProfileSuccess({
              user,
              nextStep,
              token: response?.token,
              profileTutor: new ITutor(false, response?.user)
            });
          }),
          catchError(error =>
            of(
              tutorActions.completeTutorProfileFailure({
                error: error?.error?.message || error?.error?.errors
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
          map(response =>
            tutorActions.updateTutorProfileSuccess({
              message: response?.message,
              profileTutor: new ITutor(false, response?.user)
            })
          ),
          catchError(error =>
            of(
              tutorActions.updateTutorProfileFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  updateTutorPreferences$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.updateTutorPreferences),
      mergeMap(({ data }) =>
        this._tutorService.updateTeacherPreferences(data).pipe(
          map(({ message, preferences }) =>
            tutorActions.updateTutorPreferencesSuccess({
              message,
              preferences
            })
          ),
          catchError(error =>
            of(
              tutorActions.updateTutorPreferencesFailure({
                error: error?.error?.message || error?.error?.errors[0]
              })
            )
          )
        )
      )
    )
  );

  updateTutorProfileRates$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.updateTutorProfileRates),
      mergeMap(({ data }) =>
        this._tutorService.updateTeacherProfileRates(data).pipe(
          map(response =>
            tutorActions.updateTutorProfileRatesSuccess({
              message: response?.message,
              profileTutor: new ITutor(false, response?.user)
            })
          ),
          catchError(error =>
            of(
              tutorActions.updateTutorProfileRatesFailure({
                error: error?.error?.message || error?.error?.errors
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
      mergeMap(({ page, search }) =>
        this._tutorService.getTutors(page, search).pipe(
          map(response =>
            tutorActions.loadTutorsSuccess({
              tutors: response.tutors,
              tutorsCounts: response.tutorsCounts
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadTutorsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadAvailableTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadAvailableTutors),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ id }, { courseId }]) => {
        id = id ? id : 0;
        return this._tutorService.getAvailableTutors(id | courseId).pipe(
          map(availableTutors => {
            return tutorActions.loadAvailableTutorsSuccess({
              availableTutors
            });
          }),
          catchError(error => {
            return of(
              tutorActions.loadAvailableTutorsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            );
          })
        );
      })
    )
  );

  loadCurrentTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadCurrentTutors),
      mergeMap(({ params }) =>
        this._tutorService.getCurrentTutors(params).pipe(
          map(({ tutors, tutorsCounts }) =>
            tutorActions.loadCurrentTutorsSuccess({
              tutorsCounts,
              currentTutors: tutors
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadCurrentTutorsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadPendingTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadPendingTutors),
      mergeMap(({ params }) =>
        this._tutorService.getPendingTutors(params).pipe(
          map(({ pendingTutors, rejectedTutors, tutorsCounts }) =>
            tutorActions.loadPendingTutorsSuccess({
              tutorsCounts,
              pendingTutors,
              rejectedTutors
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadPendingTutorsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadSuspendedTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadSuspendedTutors),
      mergeMap(({ params }) =>
        this._tutorService.getSuspendedTutors(params).pipe(
          map(({ tutorsCounts, suspendedTutors }) =>
            tutorActions.loadSuspendedTutorsSuccess({
              tutorsCounts,
              suspendedTutors
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadSuspendedTutorsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutor),
      mergeMap(({ id }) =>
        this._tutorService.getTutorById(id).pipe(
          map(tutor =>
            tutorActions.loadTutorSuccess({
              tutor
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadTutorFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadAdminTutor$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadAdminTutor),
      mergeMap(({ id }) =>
        this._tutorService.getAdminTutorById(id).pipe(
          map(tutor =>
            tutorActions.loadAdminTutorSuccess({
              tutor
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadAdminTutorFailure({
                error: error?.error?.message || error?.error?.errors
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
      mergeMap(() =>
        this._tutorService.getProfileTutor().pipe(
          map(tutor =>
            tutorActions.loadProfileTutorSuccess({
              tutor
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadProfileTutorFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  exploreTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.exploreTutors),
      mergeMap(action =>
        this._tutorService
          .exploreTutors(
            action.filters.program!,
            omitBy({ ...action.filters, program: null }, isNil)
          )
          .pipe(
            map(response =>
              tutorActions.exploreTutorsSuccess({
                tutors: response?.teachers,
                tutorsCount: response?.total,
                fieldsOfStudy: response?.fieldsOfStudy
              })
            ),
            catchError(error =>
              of(
                tutorActions.exploreTutorsFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          )
      )
    )
  );

  changeTutorStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.changeTutorStatus),
      mergeMap(action =>
        this._tutorService
          .changeTutorStatus(action.tutorId, action.status, action.reason)
          .pipe(
            map(response =>
              tutorActions.changeTutorStatusSuccess({
                message: response.message,
                tutorId: action.tutorId,
                status: action.status
              })
            ),
            catchError(error =>
              of(
                tutorActions.changeTutorStatusFailure({
                  error: error?.error?.message || error?.error?.errors
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
      mergeMap(action =>
        this._tutorService
          .tutorSubmitInterview(action.submitInterviewInput)
          .pipe(
            map(response =>
              tutorActions.submitInterviewSuccess({
                message: response.message,
                interviewRequest: new IInterview(
                  false,
                  response.interview_request
                )
              })
            ),
            catchError(error =>
              of(
                tutorActions.submitInterviewFailure({
                  error: error?.error?.message || error?.error?.errors
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
            map(dashboard =>
              tutorActions.loadTutorDashboardSuccess({
                dashboard: camelcaseKeys(dashboard, { deep: true })
              })
            ),
            catchError(error =>
              of(
                tutorActions.loadTutorDashboardFailure({
                  error: error?.error?.message || error?.error?.errors
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
          map(response => {
            if (response && response?.class_url) {
              window.open(response.class_url, '_blank');
            }

            return tutorActions.tutorLaunchClassSuccess();
          }),
          catchError(error =>
            of(
              tutorActions.tutorLaunchClassFailure({
                error: error?.error?.message || error?.error?.errors
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
          map(attendance =>
            tutorActions.loadTutorAttendanceSuccess({
              attendance: camelcaseKeys(attendance, { deep: true })
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadTutorAttendanceFailure({
                error: error?.error?.message || error?.error?.errors
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
          map(feedbackOptions =>
            tutorActions.loadTutorFeedbackOptionsSuccess({
              feedbackOptions: camelcaseKeys(feedbackOptions, { deep: true })
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadTutorFeedbackOptionsFailure({
                error: error?.error?.message || error?.error?.errors
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
          map(feedbackOptions =>
            tutorActions.loadTutorFeedbackPlatformOptionsSuccess({
              feedbackOptions: camelcaseKeys(feedbackOptions, { deep: true })
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadTutorFeedbackPlatformOptionsFailure({
                error: error?.error?.message || error?.error?.errors
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
              cancelCourse: body?.cancelCourse,
              message: 'FEEDBACK_SUBMITTED_SUCCESSFULLY'
            })
          ),
          catchError(error =>
            of(
              tutorActions.tutorSubmitFeedbackFailure({
                error: error?.error?.message || error?.error?.errors
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
              message: 'FEEDBACK_SUBMITTED_SUCCESSFULLY'
            })
          ),
          catchError(error =>
            of(
              tutorActions.tutorSubmitPlatformFeedbackFailure({
                error: error?.error?.message || error?.error?.errors
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
          map(attendance =>
            tutorActions.tutorRescheduleClassSuccess({
              body,
              message: 'CLASS_RESCHEDULED_SUCCESSFULLY'
            })
          ),
          catchError(error =>
            of(
              tutorActions.tutorRescheduleClassFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadFeaturedTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadFeaturedTutors),
      withLatestFrom(this._store.select(selectFeaturedTutors)),
      mergeMap(([_, _countries]) => {
        if (!_countries || !_countries.length) {
          return this._tutorService.loadFeaturedTutors().pipe(
            map(tutors =>
              tutorActions.loadFeaturedTutorsSuccess({
                tutors
              })
            ),
            catchError(error =>
              of(
                tutorActions.loadFeaturedTutorsFailure({
                  error: error?.error?.message || error?.error?.errors
                })
              )
            )
          );
        } else {
          return of(tutorActions.loadFeaturedTutorsEnded());
        }
      })
    )
  );

  loadSubjectFeaturedTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadSubjectFeaturedTutors),
      mergeMap(action =>
        this._tutorService.loadSubjectFeaturedTutors(action.id).pipe(
          map(tutors =>
            tutorActions.loadSubjectFeaturedTutorsSuccess({
              tutors
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadSubjectFeaturedTutorsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  loadTutorKudosPoints$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorKudosPoints),
      mergeMap(() =>
        this._tutorService.loadKudosPoints().pipe(
          map(kudosPoints =>
            tutorActions.loadTutorKudosPointsSuccess({
              kudosPoints: camelcaseKeys(kudosPoints, { deep: true })
            })
          ),
          catchError(error =>
            of(
              tutorActions.loadTutorKudosPointsFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  tutorAddSignature$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorAddSignature),
      mergeMap(({ payload }) =>
        this._tutorService.tutorAddSignature(payload).pipe(
          map(attendance =>
            tutorActions.tutorAddSignatureSuccess({
              signature: payload.url,
              message: 'SIGNATURE_ADDED_SUCCESSFULLY'
            })
          ),
          catchError(error =>
            of(
              tutorActions.tutorAddSignatureFailure({
                error: error?.error?.message || error?.error?.errors
              })
            )
          )
        )
      )
    )
  );

  tutorSubmitFeedbackSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorSubmitFeedbackSuccess),
      map(({ cancelCourse }) => {
        if (cancelCourse) {
          return fromTutorAction.openTutorCancelCourseModal();
        } else {
          return fromTutorAction.closeTutorSendFeedbackModal();
        }
      })
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            tutorActions.submitInterviewSuccess,
            tutorActions.tutorAddSignatureSuccess,
            tutorActions.changeTutorStatusSuccess,
            tutorActions.updateTutorProfileSuccess,
            tutorActions.tutorSubmitFeedbackSuccess,
            tutorActions.tutorRescheduleClassSuccess,
            tutorActions.updateTutorPreferencesSuccess,
            tutorActions.updateTutorProfileRatesSuccess,
            tutorActions.tutorSubmitPlatformFeedbackSuccess
          ]
        ),
        map(({ message }) => this._alertNotificationService.success(message))
      ),
    {
      dispatch: false
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            tutorActions.submitInterviewFailure,
            tutorActions.tutorLaunchClassFailure,
            tutorActions.tutorAddSignatureFailure,
            tutorActions.changeTutorStatusFailure,
            tutorActions.updateTutorProfileFailure,
            tutorActions.tutorSubmitFeedbackFailure,
            tutorActions.completeTutorProfileFailure,
            tutorActions.tutorRescheduleClassFailure,
            tutorActions.updateTutorPreferencesFailure,
            tutorActions.updateTutorProfileRatesFailure,
            tutorActions.tutorSubmitPlatformFeedbackFailure
          ]
        ),
        map(action => {
          if (action.error) {
            return this._alertNotificationService.error(action.error);
          } else {
            return this._alertNotificationService.error('SOMETHING_WENT_WRONG');
          }
        })
      ),
    {
      dispatch: false
    }
  );

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _tutorService: TutorsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
