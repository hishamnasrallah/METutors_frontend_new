import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import camelcaseKeys from 'camelcase-keys';
import { FinanceService } from '@services';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as financeActions from '../actions/finance.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertNotificationService } from '@metutor/core/components';

@Injectable()
export class FinanceEffects {
  loadOrders$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.loadOrders),
      mergeMap(({ params }) =>
        this._financeService.loadOrders(params).pipe(
          map((result) =>
            financeActions.loadOrdersSuccess({
              orders: camelcaseKeys(result, { deep: true }),
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

  loadAdminCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.loadAdminCourses),
      mergeMap(({ params }) =>
        this._financeService.loadAdminCourses(params).pipe(
          map((result) =>
            financeActions.loadAdminCoursesSuccess({
              courses: camelcaseKeys(result, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              financeActions.loadAdminCoursesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadRefundOrders$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.loadRefundOrders),
      mergeMap(({ params }) =>
        this._financeService.loadRefundOrders(params).pipe(
          map((result) =>
            financeActions.loadRefundOrdersSuccess({
              orders: camelcaseKeys(result, { deep: true }),
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

  loadRefundDetail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.loadRefundDetail),
      mergeMap(({ courseId }) =>
        this._financeService.loadRefundDetail(courseId).pipe(
          map((result) =>
            financeActions.loadRefundDetailSuccess({
              refundDetail: camelcaseKeys(result, { deep: true }),
            })
          ),
          catchError((error) =>
            of(
              financeActions.loadRefundDetailFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  refundCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.refundCourse),
      mergeMap(({ courseId }) =>
        this._financeService.refundCourse(courseId).pipe(
          map((result) => financeActions.refundCourseSuccess()),
          catchError((error) =>
            of(
              financeActions.refundCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  verifyCoursePayment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.verifyCoursePayment),
      mergeMap(({ id, courseId, resourcePath }) =>
        this._financeService
          .verifyCoursePayment(id, courseId, resourcePath)
          .pipe(
            map((paymentInfo) =>
              financeActions.verifyCoursePaymentSuccess({ paymentInfo })
            ),
            catchError((error) =>
              of(
                financeActions.verifyCoursePaymentFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  reTryPayment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(financeActions.reTryPayment),
      mergeMap(({ courseId, redirectUrl }) =>
        this._financeService.reTryPayment(courseId, redirectUrl).pipe(
          map((paymentInfo) =>
            financeActions.reTryPaymentSuccess({ paymentInfo })
          ),
          catchError((error) =>
            of(
              financeActions.reTryPaymentFailure({
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
        ofType(
          ...[
            financeActions.reTryPaymentFailure,
            financeActions.refundCourseFailure,
          ]
        ),
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
  );

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _financeService: FinanceService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
