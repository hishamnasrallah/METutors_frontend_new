import { createAction } from '@ngrx/store';

export const openRequestsConfirmPaymentModal = createAction(
  '[Requests Modal] Open Requests Confirm Payment Modal'
);

export const closeRequestsConfirmPaymentModal = createAction(
  '[Requests Modal] Close Requests Confirm Payment Modal'
);
