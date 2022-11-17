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
