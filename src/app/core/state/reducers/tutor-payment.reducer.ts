import { createReducer, on } from '@ngrx/store';

import * as tutorPaymentActions from '../actions/tutor-payment.actions';

export interface State {
  payments: any;
  isLoading: boolean;
  paymentDetails: any;
  disputeDetails: any;
  isLoadingPayments: boolean;
  isAddingDisputeComment: boolean;
  isLoadingPaymentDetails: boolean;
}

export const initialState: State = {
  payments: null,
  isLoading: false,
  paymentDetails: null,
  disputeDetails: null,
  isLoadingPayments: false,
  isAddingDisputeComment: false,
  isLoadingPaymentDetails: false,
};

export const reducer = createReducer(
  initialState,

  // General loading
  on(
    tutorPaymentActions.tutorCreateDispute,
    tutorPaymentActions.tutorRequestPayment,
    tutorPaymentActions.loadTutorDisputeDetails,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),

  on(
    tutorPaymentActions.tutorCreateDisputeFailure,
    tutorPaymentActions.tutorRequestPaymentFailure,
    tutorPaymentActions.loadTutorDisputeDetailsFailure,
    (state) => ({
      ...state,
      isLoading: false,
    })
  ),

  on(tutorPaymentActions.tutorCreateDisputeSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(tutorPaymentActions.tutorRequestPaymentSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isLoading: false,
    };

    let payments = finalState.payments;
    const data = payments.data.filter((res: any) => res.id !== id);

    payments = {
      ...finalState.payments,
      data,
    };

    return {
      ...finalState,
      payments,
    };
  }),

  on(
    tutorPaymentActions.loadTutorDisputeDetailsSuccess,
    (state, { disputeDetails }) => ({
      ...state,
      disputeDetails,
      isLoading: false,
    })
  ),

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
  })),

  on(tutorPaymentActions.tutorAddDisputeComment, (state) => ({
    ...state,
    isAddingDisputeComment: true,
  })),

  on(
    tutorPaymentActions.tutorAddDisputeCommentSuccess,
    (state, { disputeComment }) => {
      const finalState = {
        ...state,
        isAddingDisputeComment: false,
      };

      let disputeDetails = finalState.disputeDetails;

      const disputeComments = [
        ...disputeDetails.disputeComments,
        ...[disputeComment],
      ];

      disputeDetails = {
        ...finalState.disputeDetails,
        disputeComments,
      };

      return {
        ...finalState,
        disputeDetails,
      };
    }
  ),

  on(tutorPaymentActions.tutorAddDisputeCommentFailure, (state) => ({
    ...state,
    isAddingDisputeComment: false,
  }))
);

export const selectTutorPayments = (state: State): any => state.payments;

export const selectTutorPaymentDetails = (state: State): any =>
  state.paymentDetails;

export const selectTutorDisputeDetails = (state: State): any =>
  state.disputeDetails;

export const selectIsLoadingTutorPayments = (state: State): boolean =>
  state.isLoadingPayments;

export const selectIsLoadingTutorPaymentDetails = (state: State): boolean =>
  state.isLoadingPaymentDetails;

export const selectTutorPaymentLoading = (state: State): boolean =>
  state.isLoading;

export const selectTutorIsAddingDisputeComment = (state: State): boolean =>
  state.isAddingDisputeComment;
