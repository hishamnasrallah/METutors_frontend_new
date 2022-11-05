import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import * as fromCore from '@metutor/core/state';
import * as requestActions from '../actions/request.actions';
import { AlertNotificationService } from '@metutor/core/components';
import { AdminService, CoursesService, TutorsService } from '@services';

@Injectable()
export class RequestEffects {
  calculateEstimatedPrice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.calculateEstimatedPrice),
      mergeMap(({ subjectId }) =>
        this._coursesService.calculateEstimatedPrice(subjectId).pipe(
          map((estimatedPrice) =>
            requestActions.calculateEstimatedPriceSuccess({
              estimatedPrice,
            })
          ),
          catchError((error) =>
            of(
              requestActions.calculateEstimatedPriceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  generateTutors$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.generateTutors),
      mergeMap(({ data }) =>
        this._tutorService.generateTutors(data).pipe(
          map((response) =>
            requestActions.generateTutorsSuccess({
              suggestedTutors: response.suggestedTutors,
              availableTutors: response.availableTutors,
            })
          ),
          catchError((error) =>
            of(
              requestActions.generateTutorsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  createClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.createClass),
      mergeMap(({ data }) =>
        of(requestActions.createClassLocalStorage({ classroom: data }))
      )
    )
  );

  createClassSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(
          requestActions.createClassSuccess,
          requestActions.createClassLocalStorage
        ),
        withLatestFrom(this._store.select(fromCore.selectCreatedClass)),
        map(([_, classroom]) => {
          if (classroom && classroom.id) {
            this._router.navigateByUrl(
              `requests/invoice-details/${classroom.id.toString()}`
            );
          } else {
            this._router.navigate(['requests/invoice-details']);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  calculateFinalInvoice$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.calculateFinalInvoice),
      withLatestFrom(this._store.select(fromCore.selectCreatedClass)),
      mergeMap(([{ classes }, _createdClass]) =>
        this._coursesService.calculateFinalInvoice(classes, _createdClass).pipe(
          map((invoiceDetails) =>
            requestActions.calculateFinalInvoiceSuccess({
              invoiceDetails,
            })
          ),
          catchError((error) =>
            of(
              requestActions.calculateFinalInvoiceFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  applyCoupon$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.applyCoupon),
      mergeMap(({ body }) =>
        this._coursesService.applyCoupon(body).pipe(
          map(({ message, invoiceDetails }) =>
            requestActions.applyCouponSuccess({
              message,
              invoiceDetails,
            })
          ),
          catchError((error) =>
            of(
              requestActions.applyCouponFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.createCourse),
      mergeMap(({ data }) =>
        this._coursesService.createCourse(data).pipe(
          map((paymentInfo) =>
            requestActions.createCourseSuccess({
              paymentInfo,
            })
          ),
          catchError((error) =>
            of(
              requestActions.createCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  createFreeCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.createFreeCourse),
      mergeMap(({ data }) =>
        this._coursesService.createFreeCourse(data).pipe(
          map((paymentInfo) =>
            requestActions.createFreeCourseSuccess({
              paymentInfo,
            })
          ),
          catchError((error) =>
            of(
              requestActions.createFreeCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  createFreeCourseSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(requestActions.createFreeCourseSuccess),
        map(() => {
          this._router.navigate(['/student/classrooms']);
        })
      ),
    {
      dispatch: false,
    }
  );

  loadRequestedCourses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.loadRequestedCourses),
      mergeMap(({ params }) =>
        this._adminService.loadRequestedCourses(params).pipe(
          map((response) =>
            requestActions.loadRequestedCoursesSuccess({
              requestedCourses: response.requestedCourses,
              completedCourses: response.completedCourses,
              requestedCoursesCounts: response.requestedCoursesCounts,
            })
          ),
          catchError((error) =>
            of(
              requestActions.loadRequestedCoursesFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  requestCourse$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.requestCourse),
      mergeMap((action) =>
        this._coursesService.requestCourse(action.data).pipe(
          map((response) =>
            requestActions.requestCourseSuccess({
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              requestActions.requestCourseFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  changeRequestStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.changeRequestStatus),
      mergeMap((action) =>
        this._adminService.changeCourseStatus(action.id, action.status).pipe(
          map((response) =>
            requestActions.changeRequestStatusSuccess({
              id: action.id,
              status: action.status,
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              requestActions.changeRequestStatusFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  getInvoiceEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.getInvoiceEmail),
      mergeMap((action) =>
        this._coursesService.getInvoiceEmail(action.info).pipe(
          map((response) =>
            requestActions.getInvoiceEmailSuccess({
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              requestActions.getInvoiceEmailFailure({
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
            requestActions.applyCouponSuccess,
            requestActions.requestCourseSuccess,
            requestActions.getInvoiceEmailSuccess,
            requestActions.changeRequestStatusSuccess,
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
            requestActions.applyCouponFailure,
            requestActions.createClassFailure,
            requestActions.createCourseFailure,
            requestActions.requestCourseFailure,
            requestActions.generateTutorsFailure,
            requestActions.getInvoiceEmailFailure,
            requestActions.createFreeCourseFailure,
            requestActions.changeRequestStatusFailure,
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
    private _adminService: AdminService,
    private _tutorService: TutorsService,
    private _coursesService: CoursesService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
