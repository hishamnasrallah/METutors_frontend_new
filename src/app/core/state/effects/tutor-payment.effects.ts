import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TutorsService } from '@services';
import { AlertNotificationService } from '@metutor/core/components';
import * as tutorPaymentActions from '../actions/tutor-payment.actions';

@Injectable()
export class TutorPaymentEffects {
  loadTutorPayments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tutorPaymentActions.loadTutorPayments),
      mergeMap(({ status }) =>
        this._tutorService.getTutorPayment(status).pipe(
          map((payments) =>
            tutorPaymentActions.loadTutorPaymentsSuccess({
              payments,
            })
          ),
          catchError((error) =>
            of(
              tutorPaymentActions.loadTutorPaymentsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  /*  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[]),
        map(({ message }) => this._alertNotificationService.success(message))
      ),
    {
      dispatch: false,
    }
  );

failureMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[]),
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
  );*/

  constructor(
    private _store: Store<any>,
    private _actions$: Actions,
    private _tutorService: TutorsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
