import { createAction, props } from '@ngrx/store';

export const openRequestCourseModal = createAction(
  '[Public Modal] Open Request Course Modal'
);

export const closeRequestCourseModal = createAction(
  '[Public Modal] Close Request Course Modal'
);
