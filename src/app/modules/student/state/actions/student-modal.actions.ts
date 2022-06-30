import { createAction, props } from '@ngrx/store';

export const setStudentStateParams = createAction(
  '[Student Modal] Set Student State Params',
  props<{ params: any }>()
);

export const openStudentSendFeedbackModal = createAction(
  '[Student Modal] Open Student Send Feedback Modal'
);

export const closeStudentSendFeedbackModal = createAction(
  '[Student Modal] Close Student Send Feedback Modal'
);

export const openStudentSendPlatformFeedbackModal = createAction(
  '[Student Modal] Open Student Send Platform Feedback Modal'
);

export const closeStudentSendPlatformFeedbackModal = createAction(
  '[Student Modal] Close Student Send Platform Feedback Modal'
);

export const openStudentAttendanceModal = createAction(
  '[Student Modal] Open Student Attendance Modal'
);

export const closeStudentAttendanceModal = createAction(
  '[Student Modal] Close Student Attendance Modal'
);

export const openStudentViewResourceModal = createAction(
  '[Student Modal] Open Student View Resource Modal',
  props<{ id: number }>()
);

export const closeStudentViewResourceModal = createAction(
  '[Student Modal] Close Student View Resource Modal'
);

export const openStudentViewAssignmentModal = createAction(
  '[Student Modal] Open Student View Assignment Modal',
  props<{ id: number }>()
);

export const closeStudentViewAssignmentModal = createAction(
  '[Student Modal] Close Student View Assignment Modal'
);

export const openSubmitAssignmentModal = createAction(
  '[Student Modal] Open Submit Assignment Modal'
);

export const closeSubmitAssignmentModal = createAction(
  '[Student Modal] Close Submit Assignment Modal'
);

export const openViewSubmittedAssignmentModal = createAction(
  '[Student Modal] Open View Submitted Assignment Modal',
  props<{ id: number }>()
);

export const closeViewSubmittedAssignmentModal = createAction(
  '[Student Modal] Close View Submitted Assignment Modal'
);

export const openCancelCourseModal = createAction(
  '[Student Modal] Open Cancel Course Modal'
);

export const closeCancelCourseModal = createAction(
  '[Student Modal] Close Cancel Course Modal'
);

export const openAddCourseModal = createAction(
  '[Student Modal] Open Add Course Modal',
  props<{ subjectId: string }>()
);

export const closeAddCourseModal = createAction(
  '[Student Modal] Close Add Course Modal'
);

export const openMakeupClassModal = createAction(
  '[Student Modal] Open Makeup Class Modal'
);

export const closeMakeupClassModal = createAction(
  '[Student Modal] Close Makeup Class Modal'
);

export const openCancelCourseSuccessModal = createAction(
  '[Student Modal] Open Cancel Course Success Modal'
);

export const closeCancelCourseSuccessModal = createAction(
  '[Student Modal] Close Cancel Course Success Modal'
);

export const openTutorReAssignmentModal = createAction(
  '[Student Modal] Open Tutor Re-Assignment Modal'
);

export const closeTutorReAssignmentModal = createAction(
  '[Student Modal] Close Tutor Re-Assignment Modal'
);

export const openPaymentModal = createAction(
  '[Student Modal] Open Payment Modal'
);
