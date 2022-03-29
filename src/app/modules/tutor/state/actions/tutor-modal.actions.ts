import { createAction, props } from '@ngrx/store';

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

export const openTutorAddClassResourceModal = createAction(
  '[Tutor Modal] Open Tutor Add Class Resource Modal'
);

export const closeTutorAddClassResourceModal = createAction(
  '[Tutor Modal] Close Tutor Add Class Resource Modal'
);

export const openTutorEditClassResourceModal = createAction(
  '[Tutor Modal] Open Tutor Edit Class Resource Modal',
  props<{ id: number }>()
);

export const closeTutorEditClassResourceModal = createAction(
  '[Tutor Modal] Close Tutor Edit Class Resource Modal'
);

export const openTutorAddAssignmentModal = createAction(
  '[Tutor Modal] Open Tutor Add Assignment Modal'
);

export const closeTutorAddAssignmentModal = createAction(
  '[Tutor Modal] Close Tutor Add Assignment Modal'
);

export const openTutorEditAssignmentModal = createAction(
  '[Tutor Modal] Open Tutor Edit Assignment Modal',
  props<{ id: number }>()
);

export const closeTutorEditAssignmentModal = createAction(
  '[Tutor Modal] Close Tutor Edit Assignment Modal'
);

export const openTutorAssignmentDetailsModal = createAction(
  '[Tutor Modal] Open Tutor Assignment Details Modal',
  props<{ id: number }>()
);

export const closeTutorAssignmentDetailsModal = createAction(
  '[Tutor Modal] Close Tutor Assignment Details Modal'
);
