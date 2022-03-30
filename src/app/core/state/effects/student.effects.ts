import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { StudentsService } from '@services';
import * as fromRouterStore from '@metutor/state';
import { AlertNotificationService } from '@metutor/core/components';
import { selectStudentDashboard, selectStudents } from '@metutor/core/state';
import * as studentActions from '@metutor/core/state/actions/student.actions';

@Injectable()
export class StudentEffects {
  loadStudents$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudents),
      withLatestFrom(this._store.select(selectStudents)),
      mergeMap(([_, _students]) => {
        if (!_students || !_students?.length) {
          return this._studentService.getStudents().pipe(
            map((students) =>
              studentActions.loadStudentsSuccess({
                students,
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadStudentsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(studentActions.loadStudentsEnded());
        }
      })
    )
  );

  loadStudentDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentDashboard),
      withLatestFrom(this._store.select(selectStudentDashboard)),
      mergeMap(([{ params, load }, _dashboard]) => {
        if (!_dashboard || load) {
          return this._studentService.getStudentDashboard(params).pipe(
            map((dashboard) =>
              studentActions.loadStudentDashboardSuccess({
                dashboard: camelcaseKeys(dashboard, { deep: true }),
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadStudentDashboardFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(studentActions.loadStudentDashboardEnded());
        }
      })
    )
  );

  loadStudentClassesDashboard$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentClassesDashboard),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentClassDashboard(id).pipe(
          map((classesDashboard) =>
            studentActions.loadStudentClassesDashboardSuccess({
              classesDashboard: camelcaseKeys(classesDashboard, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentClassesDashboardFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentClassroom$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentClassroom),
      mergeMap(({ params }) =>
        this._studentService.getStudentClassroom(params).pipe(
          map((classroom) =>
            studentActions.loadStudentClassroomSuccess({
              classroom: camelcaseKeys(classroom, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentClassroomFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentSyllabus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentSyllabus),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentSyllabus(id).pipe(
          map((syllabus) =>
            studentActions.loadStudentSyllabusSuccess({
              syllabus: camelcaseKeys(syllabus, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentSyllabusFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentResources$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentResources),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentResources(id).pipe(
          map((resources) =>
            studentActions.loadStudentResourcesSuccess({
              resources: camelcaseKeys(resources, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentResourcesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentResource$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentResource),
      mergeMap(({ id }) =>
        this._studentService.getStudentResource(id).pipe(
          map((resource) =>
            studentActions.loadStudentResourceSuccess({
              resource: camelcaseKeys(resource, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentResourceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentJoinClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentJoinClass),
      mergeMap(({ id }) =>
        this._studentService.studentJoinClass(id).pipe(
          map((response) => {
            if (response && response?.class_url) {
              window.open(response.class_url, '_blank');
            }

            return studentActions.studentJoinClassSuccess();
          }),
          catchError((error) =>
            of(
              studentActions.studentJoinClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  // Assignments
  loadStudentAssignments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentAssignments),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._studentService.getStudentAssignments(id).pipe(
          map((assignments) =>
            studentActions.loadStudentAssignmentsSuccess({
              assignments: camelcaseKeys(assignments, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentAssignmentsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadStudentAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadStudentAssignment),
      mergeMap(({ id }) =>
        this._studentService.getStudentAssignment(id).pipe(
          map((assignment) =>
            studentActions.loadStudentAssignmentSuccess({
              assignment: camelcaseKeys(assignment, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadStudentAssignmentFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  studentSubmitAssignment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.studentSubmitAssignment),
      mergeMap(({ body }) =>
        this._studentService.studentSubmitAssignment(body).pipe(
          map(() =>
            studentActions.studentSubmitAssignmentSuccess({
              message: 'Assignment successfully submitted',
            })
          ),
          catchError((error) =>
            of(
              studentActions.studentSubmitAssignmentFailure({
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
        ofType(...[studentActions.studentSubmitAssignmentSuccess]),
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
            studentActions.studentJoinClassFailure,
            studentActions.studentSubmitAssignmentFailure,
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
    private _studentService: StudentsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
