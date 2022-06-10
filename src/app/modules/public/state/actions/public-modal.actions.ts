import { createAction, props } from '@ngrx/store';

export const openRequestCourseModal = createAction(
  '[Public Modal] Open Request Course Modal'
);

export const closeRequestCourseModal = createAction(
  '[Public Modal] Close Request Course Modal'
);

export const openViewSubjectDetailsModal = createAction(
  '[Public Modal] Open View Subject Details Modal'
);

export const closeViewSubjectDetailsModal = createAction(
  '[Public Modal] Close View Subject Details Modal'
);
