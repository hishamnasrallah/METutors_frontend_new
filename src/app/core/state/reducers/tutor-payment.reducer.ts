import { createReducer, on } from '@ngrx/store';

import * as tutorPaymentActions from '../actions/tutor-payment.actions';

export interface State {
  payments: any;
  isLoading: boolean;
}

export const initialState: State = {
  payments: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,

  on(tutorPaymentActions.loadTutorPayments, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(tutorPaymentActions.loadTutorPaymentsSuccess, (state, { payments }) => ({
    ...state,
    payments,
    isLoading: false,
  })),

  on(tutorPaymentActions.loadTutorPaymentsFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export const selectTutorPayments = (state: State): any => state.payments;

export const selectIsLoadingTutorPayments = (state: State): boolean =>
  state.isLoading;
