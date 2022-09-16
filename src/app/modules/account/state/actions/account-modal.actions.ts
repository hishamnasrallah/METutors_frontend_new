import { createAction, props } from '@ngrx/store';

export const openAccountEmailVerificationModal = createAction(
  '[Account Modal] Open Account Email Verification Modal'
);

export const closeAccountEmailVerificationModal = createAction(
  '[Account Modal] Close Account Email Verification Modal'
);
