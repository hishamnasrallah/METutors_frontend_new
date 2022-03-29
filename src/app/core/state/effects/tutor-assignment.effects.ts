import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { TutorsService } from '@services';
import * as fromRouterStore from '@metutor/state';
import { AlertNotificationService } from '@metutor/core/components';
import * as tutorAssignmentActions from '../actions/tutor-assignment.actions';

@Injectable()
export class TutorAssignmentEffects {
  loadTutorAssignments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorAssignmentActions.loadTutorAssignments),
      withLatestFrom(this._store.select(fromRouterStore.selectRouteParams)),
      mergeMap(([_, { id }]) =>
        this._tutorService.getTutorAssignments(id).pipe(
          map((assignments) =>
            tutorAssignmentActions.loadTutorAssignmentsSuccess({
              assignments: camelcaseKeys(assignments, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorAssignmentActions.loadTutorAssignmentsFailure({
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
      ofType(tutorAssignmentActions.loadTutorAssignment),
      mergeMap(({ id }) =>
        this._tutorService.getTutorAssignment(id).pipe(
          map((assignment) =>
            tutorAssignmentActions.loadTutorAssignmentSuccess({
              assignment: camelcaseKeys(assignment, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorAssignmentActions.loadTutorAssignmentFailure({
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
      ofType(tutorAssignmentActions.tutorAddAssignment),
      mergeMap(({ body }) =>
        this._tutorService.tutorAddAssignment(body).pipe(
          map((assignment) =>
            tutorAssignmentActions.tutorAddAssignmentSuccess({
              message: 'Assignment successfully added',
              assignment: camelcaseKeys(assignment, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              tutorAssignmentActions.tutorAddAssignmentFailure({
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
        ofType(...[tutorAssignmentActions.tutorAddAssignmentSuccess]),
        map(({ message }) => this._alertNotificationService.success(message))
      ),
    {
      dispatch: false,
    }
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[tutorAssignmentActions.tutorAddAssignmentFailure]),
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
