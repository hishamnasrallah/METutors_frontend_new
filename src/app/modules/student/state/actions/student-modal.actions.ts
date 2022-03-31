import { createAction, props } from '@ngrx/store';

export const openStudentSendFeedbackModal = createAction(
  '[Student Modal] Open Student Send Feedback Modal'
);

export const closeStudentSendFeedbackModal = createAction(
  '[Student Modal] Close Student Send Feedback Modal'
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
