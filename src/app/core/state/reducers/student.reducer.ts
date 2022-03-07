import { createReducer, on } from '@ngrx/store';
import { ITicket } from '@models';
import * as studentActions from '../actions/student.actions';

export interface State {
  // Loading Tickets
  isLoadingTickets: boolean;
  tickets: ITicket[] | null;
  loadingTicketsFailure: string;
}

export const initialState: State = {
  tickets: null,
  isLoadingTickets: false,
  loadingTicketsFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(studentActions.loadTickets, (state) => ({
    ...state,
    isLoadingTickets: true,
  })),

  on(studentActions.loadTicketsSuccess, (state, { tickets }) => ({
    ...state,
    tickets,
    isLoadingTickets: false,
  })),

  on(studentActions.loadTicketsFailure, (state, { error }) => ({
    ...state,
    isLoadingTickets: false,
    loadingTicketsFailure: error.message,
  }))
);

export const selectTickets = (state: State): ITicket[] | null => state.tickets;

export const selectIsLoadingTickets = (state: State): boolean =>
  state.isLoadingTickets;
