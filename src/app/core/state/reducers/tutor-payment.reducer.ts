import { createReducer, on } from '@ngrx/store';

import * as tutorPaymentActions from '../actions/tutor-payment.actions';

export interface State {
  payments: any;
  isLoading: boolean;
  paymentDetails: any;
  isLoadingPayments: boolean;
  isLoadingPaymentDetails: boolean;
}

export const initialState: State = {
  payments: null,
  isLoading: false,
  paymentDetails: null,
  isLoadingPayments: false,
  isLoadingPaymentDetails: false,
};

export const reducer = createReducer(
  initialState,

  // General loading
  on(tutorPaymentActions.tutorCreateDispute, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(tutorPaymentActions.tutorCreateDisputeFailure, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(tutorPaymentActions.tutorCreateDisputeSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(tutorPaymentActions.loadTutorPayments, (state) => ({
    ...state,
    isLoadingPayments: true,
  })),

  on(tutorPaymentActions.loadTutorPaymentsSuccess, (state, { payments }) => ({
    ...state,
    payments,
    isLoadingPayments: false,
  })),

  on(tutorPaymentActions.loadTutorPaymentsFailure, (state) => ({
    ...state,
    isLoadingPayments: false,
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
  state.isLoadingPayments;

export const selectIsLoadingTutorPaymentDetails = (state: State): boolean =>
  state.isLoadingPaymentDetails;

export const selectTutorPaymentLoading = (state: State): boolean =>
  state.isLoading;
