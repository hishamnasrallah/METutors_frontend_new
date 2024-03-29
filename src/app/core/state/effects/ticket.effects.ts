import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TicketsService } from '@services';
import { UserRole } from '@metutor/config';
import * as fromCore from '@metutor/core/state';
import { ITicketComment } from '@metutor/core/models';
import * as ticketActions from '../actions/ticket.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertNotificationService } from '@metutor/core/components';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class TicketEffects {
  loadTickets$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ticketActions.loadTickets),
      withLatestFrom(this._store.select(fromCore.selectTickets)),
      mergeMap(([_, _tickets]) => {
        if (!_tickets || !_tickets.length) {
          return this._ticketService.loadTickets().pipe(
            map((tickets) =>
              ticketActions.loadTicketsSuccess({
                tickets,
                ticketCounts: {},
              })
            ),
            catchError((error) =>
              of(
                ticketActions.loadTicketsFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          );
        } else {
          return of(ticketActions.loadTicketsEnded());
        }
      })
    )
  );

  loadAdminTickets$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ticketActions.loadAdminTickets),
      mergeMap(({ params }) =>
        this._ticketService.loadAdminTickets(params).pipe(
          map(({ tickets, ticketCounts }) =>
            ticketActions.loadAdminTicketsSuccess({
              tickets,
              ticketCounts,
            })
          ),
          catchError((error) =>
            of(
              ticketActions.loadAdminTicketsFailure({
                error: error?.error?.message || error?.error?.errors,
              })
            )
          )
        )
      )
    )
  );

  loadTicket$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ticketActions.loadTicket),
      withLatestFrom(this._store.select(fromCore.selectTicket)),
      mergeMap(([action, _ticket]) => {
        if (_ticket && _ticket.ticketId === action.id) {
          return of(ticketActions.loadTicketEnded());
        } else {
          return this._ticketService.loadTicket(action.id).pipe(
            map((ticket) =>
              ticketActions.loadTicketSuccess({
                ticket,
              })
            ),
            catchError((error) =>
              of(
                ticketActions.loadTicketFailure({
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
      ofType(ticketActions.createTicket),
      mergeMap((action) =>
        this._ticketService.createTicket(action.ticket).pipe(
          map((ticket) =>
            ticketActions.createTicketSuccess({
              ticket,
            })
          ),
          catchError((error) =>
            of(
              ticketActions.createTicketFailure({
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
        ofType(ticketActions.createTicketSuccess),
        withLatestFrom(this._store.select(fromCore.selectUser)),
        map(([_, _user]) => {
          if (_user?.roleId?.toString() === UserRole.student.toString()) {
            this._router.navigate(['/student/help/support-ticket']);
          } else {
            this._router.navigate(['/tutor/help/support-ticket']);
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  submitTicketComment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ticketActions.submitTicketComment),
      withLatestFrom(
        this._store.select(fromCore.selectTicket),
        this._store.select(fromCore.selectUser)
      ),
      mergeMap(([action, _ticket, _user]) =>
        this._ticketService
          .submitTicketComment(action.comment, _ticket?.id)
          .pipe(
            map(() => {
              const comment: ITicketComment = {
                id: 0,
                comment: action.comment,
                user: _user ? _user : undefined,
                createdDate: new Date(),
              };

              return ticketActions.submitTicketCommentSuccess({
                comment,
              });
            }),
            catchError((error) =>
              of(
                ticketActions.submitTicketCommentFailure({
                  error: error?.error?.message || error?.error?.errors,
                })
              )
            )
          )
      )
    )
  );

  changeTicketStatus$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ticketActions.changeTicketStatus),
      mergeMap((action) =>
        this._ticketService
          .changeTicketStatus(action.status, action.ticketId)
          .pipe(
            map((response) =>
              ticketActions.changeTicketStatusSuccess({
                message: response.message,
                status: action.status,
                ticketId: action.ticketId,
              })
            ),
            catchError((error) =>
              of(
                ticketActions.changeTicketStatusFailure({
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
        ofType(...[ticketActions.changeTicketStatusSuccess]),
        map((action) => {
          if (action.message) {
            return this._alertNotificationService.success(action.message);
          } else {
            return this._alertNotificationService.success(
              'INFORMATION_UPDATED_SUCCESSFULLY'
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
            ticketActions.loadTicketsFailure,
            ticketActions.submitTicketCommentFailure,
            ticketActions.changeTicketStatusFailure,
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
    private _ticketService: TicketsService,
    private _alertNotificationService: AlertNotificationService
  ) {}
}
