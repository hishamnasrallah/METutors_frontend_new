import { createAction } from '@ngrx/store';

export const openRequestsConfirmPaymentModal = createAction(
  '[Requests Modal] Open Requests Confirm Payment Modal'
);

export const closeRequestsConfirmPaymentModal = createAction(
  '[Requests Modal] Close Requests Confirm Payment Modal'
);

export const openTeacherAvailabilityModal = createAction(
  '[Requests Modal] Open Teacher Availability Modal'
);

export const closeTeacherAvailabilityModal = createAction(
  '[Requests Modal] Close Teacher Availability Modal'
);
