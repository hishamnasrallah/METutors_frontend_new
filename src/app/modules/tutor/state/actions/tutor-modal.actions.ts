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

export const openTutorSendPlatformFeedbackModal = createAction(
  '[Tutor Modal] Open Tutor Send Platform Feedback Modal'
);

export const closeTutorSendPlatformFeedbackModal = createAction(
  '[Tutor Modal] Close Tutor Send Platform Feedback Modal'
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

export const openTutorViewStudentAssignmentModal = createAction(
  '[Tutor Modal] Open Tutor View Assignment Modal',
  props<{ id: number; userId: number }>()
);

export const closeTutorViewStudentAssignmentModal = createAction(
  '[Tutor Modal] Close Tutor View Assignment Modal'
);

export const openAcceptRejectAssignmentModal = createAction(
  '[Tutor Modal] Open Accept Reject Assignment Modal'
);

export const closeAcceptRejectAssignmentModal = createAction(
  '[Tutor Modal] Close Accept Reject Assignment Modal'
);

export const setTutorStateParams = createAction(
  '[Tutor Modal] Set Tutor State Params',
  props<{ params: any }>()
);

export const openTutorSubmitInterviewModal = createAction(
  '[Tutor Modal] Open Tutor Submit Interview Modal'
);

export const closeTutorSubmitInterviewModal = createAction(
  '[Tutor Modal] Close Tutor Submit Interview Modal'
);

export const openTutorRescheduleClassModal = createAction(
  '[Tutor Modal] Open Tutor Reschedule Class Modal'
);

export const closeTutorRescheduleClassModal = createAction(
  '[Tutor Modal] Close Tutor Reschedule Class Modal'
);
