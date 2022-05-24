import { createAction, props } from '@ngrx/store';

import { ITicket, ITicketComment } from '@models';

export const loadTickets = createAction('[Ticket] Load Tickets');

export const loadAdminTickets = createAction('[Ticket] Load Admin Tickets');

export const loadTicketsSuccess = createAction(
  '[Ticket] Load Tickets Success',
  props<{ tickets: ITicket[]; ticketsCounts: any }>()
);

export const loadTicketsFailure = createAction(
  '[Ticket] Load Tickets Failure',
  props<{ error: any }>()
);

export const loadTicketsEnded = createAction('[Ticket] Load Tickets Ended');

export const loadTicket = createAction(
  '[Ticket] Load Ticket',
  props<{ id: string }>()
);

export const loadTicketSuccess = createAction(
  '[Ticket] Load Ticket Success',
  props<{ ticket: ITicket }>()
);

export const loadTicketFailure = createAction(
  '[Ticket] Load Ticket Failure',
  props<{ error: any }>()
);

export const loadTicketEnded = createAction('[Ticket] Load Ticket Ended');

export const createTicket = createAction(
  '[Ticket] Create Ticket',
  props<{ ticket: any }>()
);

export const createTicketSuccess = createAction(
  '[Ticket] Create Ticket Success',
  props<{ ticket: ITicket }>()
);

export const createTicketFailure = createAction(
  '[Ticket] Create Ticket Failure',
  props<{ error: any }>()
);

export const submitTicketComment = createAction(
  '[Ticket] Submit Ticket Comment',
  props<{ comment: string }>()
);

export const submitTicketCommentSuccess = createAction(
  '[Ticket] Submit Ticket Comment Success',
  props<{ comment: ITicketComment }>()
);

export const submitTicketCommentFailure = createAction(
  '[Ticket] Submit Ticket Comment Failure',
  props<{ error: any }>()
);

export const changeTicketStatus = createAction(
  '[Ticket] Change Ticket Status',
  props<{ status: string; ticketId: string }>()
);

export const changeTicketStatusSuccess = createAction(
  '[Ticket] Change Ticket Status Success',
  props<{ message: string; status: string; ticketId: string }>()
);

export const changeTicketStatusFailure = createAction(
  '[Ticket] Change Ticket Status Failure',
  props<{ error: any }>()
);
