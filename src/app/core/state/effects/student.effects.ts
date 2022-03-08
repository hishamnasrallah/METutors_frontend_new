import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { StudentsService } from '@services';
import * as fromCore from '@metutor/core/state';
import * as studentActions from '../actions/student.actions';
import { AlertNotificationService } from '@metutor/core/components';
import { Router } from '@angular/router';
import { ITicketComment } from '@metutor/core/models';

@Injectable()
export class StudentEffects {
  loadTickets$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadTickets),
      withLatestFrom(this._store.select(fromCore.selectTickets)),
      mergeMap(([_, _tickets]) => {
        if (!_tickets || !_tickets.length) {
          return this._studentService.loadTickets().pipe(
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
          );
        } else {
          return of(studentActions.loadTicketsEnded());
        }
      })
    )
  );

  loadTicket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.loadTicket),
      withLatestFrom(this._store.select(fromCore.selectTicket)),
      mergeMap(([action, _ticket]) => {
        if (_ticket && _ticket.ticketId === action.id) {
          return of(studentActions.loadTicketEnded());
        } else {
          return this._studentService.loadTicket(action.id).pipe(
            map((ticket) =>
              studentActions.loadTicketSuccess({
                ticket,
              })
            ),
            catchError((error) =>
              of(
                studentActions.loadTicketFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        }
      })
    )
  );

  createTicket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.createTicket),
      mergeMap((action) =>
        this._studentService.createTicket(action.ticket).pipe(
          map((ticket) =>
            studentActions.createTicketSuccess({
              ticket,
            })
          ),
          catchError((error) =>
            of(
              studentActions.createTicketFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  createTicketSuccess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(studentActions.createTicketSuccess),
        map((_) => {
          this._router.navigate(['/student/help/support-ticket']);
        })
      ),
    {
      dispatch: false,
    }
  );

  submitTicketComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(studentActions.submitTicketComment),
      withLatestFrom(
        this._store.select(fromCore.selectTicket),
        this._store.select(fromCore.selectUser)
      ),
      mergeMap(([action, _ticket, _user]) =>
        this._studentService
          .submitTicketComment(action.comment, _ticket?.id)
          .pipe(
            map(() => {
              const comment: ITicketComment = {
                id: 0,
                comment: action.comment,
                user: _user ? _user : undefined,
                createdDate: new Date(),
              };

              return studentActions.submitTicketCommentSuccess({
                comment,
              });
            }),
            catchError((error) =>
              of(
                studentActions.submitTicketCommentFailure({
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
            studentActions.loadTicketsFailure,
            studentActions.submitTicketCommentFailure,
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
    private _studentService: StudentsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
