import { createAction } from '@ngrx/store';

export const openStudentSendFeedbackModal = createAction(
  '[Tutor Modal] Open Student Send Feedback Modal'
);

export const closeStudentSendFeedbackModal = createAction(
  '[Tutor Modal] Close Student Send Feedback Modal'
);

export const openStudentAttendanceModal = createAction(
  '[Tutor Modal] Open Student Attendance Modal'
);

export const closeStudentAttendanceModal = createAction(
  '[Tutor Modal] Close Student Attendance Modal'
);
