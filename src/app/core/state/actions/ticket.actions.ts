import { createAction, props } from '@ngrx/store';

import { ITicket, ITicketComment } from '@models';

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

export const submitTicketComment = createAction(
  '[Student] Submit Ticket Comment',
  props<{ comment: string }>()
);

export const submitTicketCommentSuccess = createAction(
  '[Student] Submit Ticket Comment Success',
  props<{ comment: ITicketComment }>()
);

export const submitTicketCommentFailure = createAction(
  '[Student] Submit Ticket Comment Failure',
  props<{ error: any }>()
);

export const changeTicketStatus = createAction(
  '[Student] Change Ticket Status',
  props<{ status: string; ticketId: number }>()
);

export const changeTicketStatusSuccess = createAction(
  '[Student] Change Ticket Status Success',
  props<{ message: string }>()
);

export const changeTicketStatusFailure = createAction(
  '[Student] Change Ticket Status Failure',
  props<{ error: any }>()
);
