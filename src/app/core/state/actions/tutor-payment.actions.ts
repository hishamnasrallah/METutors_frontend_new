import { createAction, props } from '@ngrx/store';

export const loadTutorPayments = createAction(
  '[Tutor] Load Tutor Payments',
  props<{ params: { page: number; search: string; payment: string } }>()
);

export const loadTutorPaymentsSuccess = createAction(
  '[Tutor] Load Tutor Payments Success',
  props<{ payments: any }>()
);

export const loadTutorPaymentsFailure = createAction(
  '[Tutor] Load Tutor Payments Failure',
  props<{ error: any }>()
);

export const loadTutorPaymentDetails = createAction(
  '[Tutor] Load Tutor Payment Details',
  props<{ id: string }>()
);

export const loadTutorPaymentDetailsSuccess = createAction(
  '[Tutor] Load Tutor Payment Details Success',
  props<{ paymentDetails: any }>()
);

export const loadTutorPaymentDetailsFailure = createAction(
  '[Tutor] Load Tutor Payment Details Failure',
  props<{ error: any }>()
);

export const tutorCreateDispute = createAction(
  '[Tutor] Tutor Create Dispute',
  props<{ payload: any }>()
);

export const tutorCreateDisputeSuccess = createAction(
  '[Tutor] Tutor Create Dispute Success'
);

export const tutorCreateDisputeFailure = createAction(
  '[Tutor] Tutor Create Dispute Failure',
  props<{ error: any }>()
);

export const tutorRequestPayment = createAction(
  '[Tutor] Tutor Request Payment',
  props<{ id: string }>()
);

export const tutorRequestPaymentSuccess = createAction(
  '[Tutor] Tutor Request Payment'
);

export const tutorRequestPaymentFailure = createAction(
  '[Tutor] Tutor Request Payment Failure',
  props<{ error: any }>()
);

export const loadTutorDisputeDetails = createAction(
  '[Tutor] Load Tutor Dispute Details',
  props<{ id: string }>()
);

export const loadTutorDisputeDetailsSuccess = createAction(
  '[Tutor] Load Tutor Dispute Details Success',
  props<{ disputeDetails: any }>()
);

export const loadTutorDisputeDetailsFailure = createAction(
  '[Tutor] Load Tutor Dispute Details Failure',
  props<{ error: any }>()
);

export const tutorAddDisputeComment = createAction(
  '[Tutor] Tutor Add Dispute Comment',
  props<{ body: any }>()
);

export const tutorAddDisputeCommentSuccess = createAction(
  '[Tutor] Tutor Add Dispute Comment Success',
  props<{ disputeComment: any }>()
);

export const tutorAddDisputeCommentFailure = createAction(
  '[Tutor] Tutor Add Dispute Comment Failure',
  props<{ error: any }>()
);
