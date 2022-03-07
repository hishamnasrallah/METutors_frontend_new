import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StudentsService } from '@services';
import * as studentActions from '../actions/student.actions';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class StudentEffects {
  loadTickets$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadTickets),
      mergeMap((_) =>
        this._studentService.loadTickets().pipe(
          map((tickets) =>
            studentActions.loadTicketsSuccess({
              tickets,
            })
          ),
          catchError((error) =>
            of(
              studentActions.loadTicketsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[studentActions.loadTicketsFailure]),
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
