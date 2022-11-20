import { createAction, props } from '@ngrx/store';

export const loadTutorPayments = createAction(
  '[Tutor] Load Tutor Payments',
  props<{ status: string }>()
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
  '[Tutor] Tutor Create Dispute Success',
  props<{ message: string }>()
);

export const tutorCreateDisputeFailure = createAction(
  '[Tutor] Tutor Create Dispute Failure',
  props<{ error: any }>()
);
