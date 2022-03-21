import { createAction } from '@ngrx/store';

export const openTutorRejectCourseModal = createAction(
  '[Tutor Modal] Open Tutor Reject Course Modal'
);

export const closeTutorRejectCourseModal = createAction(
  '[Tutor Modal] Close Tutor Reject Course Modal'
);

export const openTutorAddTopicModal = createAction(
  '[Tutor Modal] Open Tutor Add Topic Modal'
);

export const closeTutorAddTopicModal = createAction(
  '[Tutor Modal] Close Tutor Add Topic Modal'
);
