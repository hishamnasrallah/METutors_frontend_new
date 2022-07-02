import { createAction } from '@ngrx/store';

export const openTeacherAvailabilityModal = createAction(
  '[Profile Modal] Open Teacher Availability Modal'
);

export const closeTeacherAvailabilityModal = createAction(
  '[Profile Modal] Close Teacher Availability Modal'
);