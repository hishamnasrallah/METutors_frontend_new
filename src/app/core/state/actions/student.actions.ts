import { createAction, props } from '@ngrx/store';

export const loadStudentDashboard = createAction(
  '[Tutor] Load Student Dashboard',
  props<{ params: any; load: boolean }>()
);

export const loadStudentDashboardSuccess = createAction(
  '[Tutor] Load Student Dashboard Success',
  props<{ dashboard: any }>()
);

export const loadStudentDashboardFailure = createAction(
  '[Tutor] Load Student Dashboard Failure',
  props<{ error: any }>()
);

export const loadStudentDashboardEnded = createAction(
  '[Tutor] Load Student Dashboard Ended'
);
