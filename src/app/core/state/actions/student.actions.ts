import { createAction, props } from '@ngrx/store';

import { ITicket } from '@models';

export const loadTickets = createAction(
  '[Student] Load Tickets',
  props<{ id: number }>()
);

export const loadTicketsSuccess = createAction(
  '[Student] Load Tickets Success',
  props<{ tickets: ITicket[] }>()
);

export const loadTicketsFailure = createAction(
  '[Student] Load Tickets Failure',
  props<{ error: any }>()
);
