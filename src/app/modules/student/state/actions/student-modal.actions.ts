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
