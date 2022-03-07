import { createAction, props } from '@ngrx/store';

import { ITicket } from '@models';

export const loadTickets = createAction('[Student] Load Tickets');

export const loadTicketsSuccess = createAction(
  '[Student] Load Tickets Success',
  props<{ tickets: ITicket[] }>()
);

export const loadTicketsFailure = createAction(
  '[Student] Load Tickets Failure',
  props<{ error: any }>()
);

export const loadTicketsEnded = createAction('[Student] Load Tickets Ended');

export const loadTicket = createAction(
  '[Student] Load Ticket',
  props<{ id: string }>()
);

export const loadTicketSuccess = createAction(
  '[Student] Load Ticket Success',
  props<{ ticket: ITicket }>()
);

export const loadTicketFailure = createAction(
  '[Student] Load Ticket Failure',
  props<{ error: any }>()
);

export const loadTicketEnded = createAction('[Student] Load Ticket Ended');

export const createTicket = createAction(
  '[Student] Create Ticket',
  props<{ ticket: any }>()
);

export const createTicketSuccess = createAction(
  '[Student] Create Ticket Success',
  props<{ ticket: ITicket }>()
);

export const createTicketFailure = createAction(
  '[Student] Create Ticket Failure',
  props<{ error: any }>()
);
