import { createReducer, on } from '@ngrx/store';
import { ITicket } from '@models';
import * as ticketActions from '../actions/ticket.actions';

export interface State {
  // Loading Tickets
  ticketCounts: any;
  isLoadingTickets: boolean;
  tickets: ITicket[] | null;
  loadingTicketsFailure: string;

  // Loading Ticket
  ticket: ITicket | null;
  isLoadingTicket: boolean;
  loadingTicketFailure: string;

  // Create Ticket
  isCreatingTicket: boolean;
  createTicketFailure: string;

  // Submit Ticket Comment
  isSubmitTicketComment: boolean;
  submitTicketCommentFailure: string;

  // Change Ticket Status
  isChangeTicketStatus: boolean;
  changeTicketStatusFailure?: string;
}

export const initialState: State = {
  ticket: null,
  tickets: null,
  ticketCounts: {},
  isLoadingTicket: false,
  isLoadingTickets: false,
  isCreatingTicket: false,
  createTicketFailure: '',
  loadingTicketFailure: '',
  loadingTicketsFailure: '',
  isChangeTicketStatus: false,
  isSubmitTicketComment: false,
  submitTicketCommentFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(ticketActions.loadTickets, ticketActions.loadAdminTickets, (state) => ({
    ...state,
    isLoadingTickets: true,
  })),

  on(
    ticketActions.loadTicketsSuccess,
    ticketActions.loadAdminTicketsSuccess,
    (state, { tickets, ticketCounts }) => ({
      ...state,
      tickets,
      ticketCounts: {
        ...state.ticketCounts,
        ...ticketCounts,
      },
      isLoadingTickets: false,
    })
  ),

  on(
    ticketActions.loadTicketsFailure,
    ticketActions.loadAdminTicketsFailure,
    (state, { error }) => ({
      ...state,
      isLoadingTickets: false,
      loadingTicketsFailure: error,
    })
  ),

  on(ticketActions.loadTicketsEnded, (state) => ({
    ...state,
    isLoadingTickets: false,
  })),

  on(ticketActions.loadTicket, (state) => ({
    ...state,
    isLoadingTicket: true,
  })),

  on(ticketActions.loadTicketSuccess, (state, { ticket }) => ({
    ...state,
    ticket,
    isLoadingTicket: false,
  })),

  on(ticketActions.loadTicketFailure, (state, { error }) => ({
    ...state,
    isLoadingTicket: false,
    loadingTicketFailure: error,
  })),

  on(ticketActions.loadTicketEnded, (state) => ({
    ...state,
    isLoadingTicket: false,
  })),

  on(ticketActions.createTicket, (state) => ({
    ...state,
    isCreatingTicket: true,
  })),

  on(ticketActions.createTicketSuccess, (state, { ticket }) => ({
    ...state,
    isCreatingTicket: false,
    tickets:
      state.tickets && state.tickets.length
        ? [ticket, ...state.tickets]
        : [ticket],
  })),

  on(ticketActions.createTicketFailure, (state, { error }) => ({
    ...state,
    isCreatingTicket: false,
    createTicketFailure: error,
  })),

  on(ticketActions.submitTicketComment, (state) => ({
    ...state,
    isSubmitTicketComment: true,
  })),

  on(ticketActions.submitTicketCommentSuccess, (state, { comment }) => ({
    ...state,
    isSubmitTicketComment: false,
    ticket: state.ticket
      ? {
          ...state.ticket,
          lastReply: 'Now',
          comments: [...state.ticket.comments, comment],
        }
      : null,
  })),

  on(ticketActions.submitTicketCommentFailure, (state, { error }) => ({
    ...state,
    isSubmitTicketComment: false,
    submitTicketCommentFailure: error,
  })),

  on(ticketActions.changeTicketStatus, (state) => ({
    ...state,
    isChangeTicketStatus: true,
  })),

  on(
    ticketActions.changeTicketStatusSuccess,
    (state, { status, ticketId }) => ({
      ...state,
      isChangeTicketStatus: false,
      tickets:
        state.tickets && state.tickets.length
          ? state.tickets?.map((ticket) =>
              ticket.ticketId === ticketId
                ? { ...ticket, status }
                : { ...ticket }
            )
          : [],
      ticket: state.ticket
        ? {
            ...state.ticket,
            status,
          }
        : null,
    })
  ),

  on(ticketActions.changeTicketStatusFailure, (state, { error }) => ({
    ...state,
    isChangeTicketStatus: false,
    changeTicketStatusFailure: error,
  }))
);

export const selectTickets = (state: State): ITicket[] | null => state.tickets;

export const selectIsLoadingTickets = (state: State): boolean =>
  state.isLoadingTickets;

export const selectTicket = (state: State): ITicket | null => state.ticket;

export const selectTicketCounts = (state: State): any => state.ticketCounts;

export const selectIsLoadingTicket = (state: State): boolean =>
  state.isLoadingTicket;

export const selectIsCreatingTicket = (state: State): boolean =>
  state.isCreatingTicket;

export const selectIsSubmitTicketComment = (state: State): boolean =>
  state.isSubmitTicketComment;

export const selectIsChangeTicketStatus = (state: State): boolean =>
  state.isChangeTicketStatus;
