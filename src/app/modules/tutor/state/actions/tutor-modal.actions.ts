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

export const openTutorCancelCourseModal = createAction(
  '[Tutor Modal] Open Tutor Cancel Course Modal'
);

export const closeTutorCancelCourseModal = createAction(
  '[Tutor Modal] Close Tutor Cancel Course Modal'
);

export const openTutorSendFeedbackModal = createAction(
  '[Tutor Modal] Open Tutor Send Feedback Modal'
);

export const closeTutorSendFeedbackModal = createAction(
  '[Tutor Modal] Close Tutor Send Feedback Modal'
);

export const openTutorCourseAttendanceModal = createAction(
  '[Tutor Modal] Open Tutor Course Attendance Modal'
);

export const closeTutorCourseAttendanceModal = createAction(
  '[Tutor Modal] Close Tutor Course Attendance Modal'
);
