import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { CoursesService, TutorsService } from '@services';
import * as requestActions from '../actions/request.actions';
import * as fromCore from '@metutor/core/state';
import { AlertNotificationService } from '@metutor/core/components';
import { Router } from '@angular/router';

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
          map((tutors) =>
            requestActions.generateTutorsSuccess({
              tutors,
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

  enterRequestTutor$ = createEffect(
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
      mergeMap(([_, _createdClass]) => {
        if (_createdClass) {
          return this._coursesService.calculateFinalInvoice(_createdClass).pipe(
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
          );
        } else {
          return of(requestActions.calculateFinalInvoiceEnded());
        }
      })
    )
  );

  createPaidClass$ = createEffect(() =>
    this._actions$.pipe(
      ofType(requestActions.createPaidClass),
      mergeMap((action) =>
        this._coursesService.createCourse(action.data).pipe(
          map((response) =>
            requestActions.createPaidClassSuccess({
              classroom: response.classroom,
              message: response.message,
            })
          ),
          catchError((error) =>
            of(
              requestActions.createPaidClassFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  createPaidClassSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(requestActions.createPaidClassSuccess),
        map((_) => {
          this._router.navigate(['/student/classrooms']);
        })
      ),
    {
      dispatch: false,
    }
  );

  successMessages$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(...[requestActions.createPaidClassSuccess]),
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
    private _router: Router,
    private _store: Store<any>,
    private _actions$: Actions,
    private _tutorService: TutorsService,
    private _coursesService: CoursesService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
