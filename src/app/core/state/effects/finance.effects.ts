import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import camelcaseKeys from 'camelcase-keys';
import { FinanceService } from '@services';
import * as financeActions from '../actions/finance.actions';
import { AlertNotificationService } from '@metutor/core/components';
import { loadRefundOrders } from '../actions/finance.actions';

@Injectable()
export class FinanceEffects {
  loadOrders = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.loadOrders),
      mergeMap(() =>
        this._financeService.loadOrders().pipe(
          map((orders) =>
            financeActions.loadOrdersSuccess({
              orders: camelcaseKeys(orders, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              financeActions.loadOrdersFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadRefundOrders = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.loadRefundOrders),
      mergeMap(() =>
        this._financeService.loadRefundOrders().pipe(
          map((orders) =>
            financeActions.loadRefundOrdersSuccess({
              orders: camelcaseKeys(orders, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              financeActions.loadRefundOrdersFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );
  /*
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
              'Information updated successfully!'
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
            return this._alertNotificationService.error(
              'Something went wrong!'
            );
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
    private _financeService: FinanceService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
