import { createAction } from '@ngrx/store';

export const openTeacherAvailabilityModal = createAction(
  '[Profile Modal] Open Teacher Availability Modal'
);

export const closeTeacherAvailabilityModal = createAction(
  '[Profile Modal] Close Teacher Availability Modal'
);

export const openViewDocumentModal = createAction(
  '[Profile Modal] Open View Document Modal'
);

export const closeViewDocumentModal = createAction(
  '[Profile Modal] Close View Document Modal'
);
