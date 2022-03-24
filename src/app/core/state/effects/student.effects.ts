import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { selectStudentDashboard } from '@metutor/core/state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { StudentsService } from '@services';
import { AlertNotificationService } from '@metutor/core/components';
import * as studentActions from '@metutor/core/state/actions/student.actions';

@Injectable()
export class StudentEffects {
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

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _studentService: StudentsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
