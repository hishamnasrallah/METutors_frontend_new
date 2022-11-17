import { createReducer, on } from '@ngrx/store';

import * as tutorPaymentActions from '../actions/tutor-payment.actions';

export interface State {
  payments: any;
  isLoading: boolean;
  paymentDetails: any;
  isLoadingPaymentDetails: boolean;
}

export const initialState: State = {
  payments: null,
  isLoading: false,
  paymentDetails: null,
  isLoadingPaymentDetails: false,
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
  })),

  on(tutorPaymentActions.loadTutorPaymentDetails, (state) => ({
    ...state,
    isLoadingPaymentDetails: true,
  })),

  on(
    tutorPaymentActions.loadTutorPaymentDetailsSuccess,
    (state, { paymentDetails }) => ({
      ...state,
      paymentDetails,
      isLoadingPaymentDetails: false,
    })
  ),

  on(tutorPaymentActions.loadTutorPaymentDetailsFailure, (state) => ({
    ...state,
    isLoadingPaymentDetails: false,
  }))
);

export const selectTutorPayments = (state: State): any => state.payments;

export const selectTutorPaymentDetails = (state: State): any =>
  state.paymentDetails;

export const selectIsLoadingTutorPayments = (state: State): boolean =>
  state.isLoading;

export const selectIsLoadingTutorPaymentDetails = (state: State): boolean =>
  state.isLoadingPaymentDetails;
