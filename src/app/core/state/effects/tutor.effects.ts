import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { TutorsService } from '@services';
import { environment } from '@environment';
import * as fromRouterStore from '@metutor/state';
import * as tutorActions from '../actions/tutor.actions';
import { selectTutorDashboard, selectTutorSyllabus } from '..';
import { AlertNotificationService } from '@metutor/core/components';

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

  // Tutor syllabus
  loadTutorSyllabus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorSyllabus),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorSyllabus(id).pipe(
          map((syllabus) =>
            tutorActions.loadTutorSyllabusSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorSyllabusFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorAddSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorAddSyllabusTopic),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([{ body }, { id }]) =>
        this._tutorService.addSyllabusTopic(body, id).pipe(
          map((syllabus) =>
            tutorActions.tutorAddSyllabusTopicSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
              message: 'Topic has been successfully added',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorAddSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorEditSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorEditSyllabusTopic),
      mergeMap(({ body }) =>
        this._tutorService.editSyllabusTopic(body).pipe(
          map((syllabus) =>
            tutorActions.tutorEditSyllabusTopicSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
              message: 'Topic has been successfully updated',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorEditSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorDeleteSyllabusTopic$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorDeleteSyllabusTopic),
      mergeMap(({ id }) =>
        this._tutorService.deleteSyllabusTopic(id).pipe(
          map((data) =>
            tutorActions.tutorDeleteSyllabusTopicSuccess({
              data: camelcaseKeys(data, { deep: true }),
              message: 'Topic has been successfully deleted',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorDeleteSyllabusTopicFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorEditSubjectTitle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorEditSubjectTitle),
      mergeMap(({ title, classId }) =>
        this._tutorService.editSubjectTitle(title, classId).pipe(
          map(() =>
            tutorActions.tutorEditSubjectTitleSuccess({
              title,
              classId,
              message: 'Class subject has been successfully updated',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorEditSubjectTitleFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
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

  loadTutorResources$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorResources),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorResources(id).pipe(
          map((resources) =>
            tutorActions.loadTutorResourcesSuccess({
              resources: camelcaseKeys(resources, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorResourcesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorResource),
      mergeMap(({ id }) =>
        this._tutorService.getTutorResource(id).pipe(
          map((resource) =>
            tutorActions.loadTutorResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  addTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.addTutorResource),
      mergeMap(({ body }) =>
        this._tutorService.addTutorResource(body).pipe(
          map((resource) =>
            tutorActions.addTutorResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
              message: 'Resource successfully added',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.addTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  editTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.editTutorResource),
      mergeMap(({ body }) =>
        this._tutorService.editTutorResource(body).pipe(
          map((resource) =>
            tutorActions.editTutorResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
              message: 'Resource successfully edited',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.editTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  deleteTutorResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.deleteTutorResource),
      mergeMap(({ id }) =>
        this._tutorService.deleteTutorResource(id).pipe(
          map((resource) =>
            tutorActions.deleteTutorResourceSuccess({
              id,
              message: 'Resource successfully deleted',
            })
          ),
          catchError((error) =>
            of(
              tutorActions.deleteTutorResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  // Tutor assignments
  loadTutorAssignments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorAssignments),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorAssignments(id).pipe(
          map((assignments) =>
            tutorActions.loadTutorAssignmentsSuccess({
              assignments: camelcaseKeys(assignments, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorAssignmentsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTutorAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.loadTutorAssignment),
      mergeMap(({ id }) =>
        this._tutorService.getTutorAssignment(id).pipe(
          map((assignment) =>
            tutorActions.loadTutorAssignmentSuccess({
              assignment: camelcaseKeys(assignment, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.loadTutorAssignmentFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  tutorAddAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorActions.tutorAddAssignment),
      mergeMap(({ body }) =>
        this._tutorService.tutorAddAssignment(body).pipe(
          map((assignment) =>
            tutorActions.tutorAddAssignmentSuccess({
              message: 'Assignment successfully added',
              assignment: camelcaseKeys(assignment, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorActions.tutorAddAssignmentFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            tutorActions.addTutorResourceSuccess,
            tutorActions.editTutorResourceSuccess,
            tutorActions.tutorAddAssignmentSuccess,
            tutorActions.deleteTutorResourceSuccess,
            tutorActions.tutorAddSyllabusTopicSuccess,
            tutorActions.tutorEditSubjectTitleSuccess,
            tutorActions.tutorEditSyllabusTopicSuccess,
            tutorActions.tutorDeleteSyllabusTopicSuccess,
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
            tutorActions.tutorLaunchClassFailure,
            tutorActions.addTutorResourceFailure,
            tutorActions.editTutorResourceFailure,
            tutorActions.tutorAddAssignmentFailure,
            tutorActions.deleteTutorResourceFailure,
            tutorActions.completeTutorProfileFailure,
            tutorActions.tutorAddSyllabusTopicFailure,
            tutorActions.tutorEditSubjectTitleFailure,
            tutorActions.tutorEditSyllabusTopicFailure,
            tutorActions.tutorDeleteSyllabusTopicFailure,
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
    private _store: Store<any>,
    private _actions$: Actions,
    private _tutorService: TutorsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
