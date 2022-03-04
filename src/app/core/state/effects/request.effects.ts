import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CoursesService, TutorsService } from '@services';
import * as requestActions from '../actions/request.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class RequestEffects {
  generateTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.generateTutors),
      mergeMap(({ data }) =>
        this._tutorService.generateTutors(data).pipe(
          map((tutors) =>
            requestActions.generateTutorsSuccess({
              tutors,
            })
          ),
          catchError((error) =>
            of(requestActions.generateTutorsFailure({ error: error?.error?.message }))
          )
        )
      )
    )
  );

  createClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.createClass),
      mergeMap(({ data }) =>
        this._coursesService.createCourse(data).pipe(
          map((response) => {
            console.log(response);

            return requestActions.createClassSuccess({});
          }),
          catchError((error) =>
            of(requestActions.createClassFailure({ error: error?.error?.message }))
          )
        )
      )
    )
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          ...[
            requestActions.generateTutorsFailure,
            requestActions.createClassFailure,
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
    private _coursesService: CoursesService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
