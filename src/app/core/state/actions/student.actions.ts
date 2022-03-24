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

export const loadStudentClassesDashboard = createAction(
  '[Tutor] Load Student Classes Dashboard'
);

export const loadStudentClassesDashboardSuccess = createAction(
  '[Tutor] Load Student Classes Dashboard Success',
  props<{ classesDashboard: any }>()
);

export const loadStudentClassesDashboardFailure = createAction(
  '[Tutor] Load Student Classes Dashboard Failure',
  props<{ error: any }>()
);

export const loadStudentClassroom = createAction(
  '[Tutor] Load Student Classroom',
  props<{ params?: any }>()
);

export const loadStudentClassroomSuccess = createAction(
  '[Tutor] Load Student Classroom Success',
  props<{ classroom: any }>()
);

export const loadStudentClassroomFailure = createAction(
  '[Tutor] Load Student Classroom Failure',
  props<{ error: any }>()
);

export const loadStudentSyllabus = createAction(
  '[Tutor] Load Student Syllabus Dashboard'
);

export const loadStudentSyllabusSuccess = createAction(
  '[Tutor] Load Student Syllabus Success',
  props<{ syllabus: any }>()
);

export const loadStudentSyllabusFailure = createAction(
  '[Tutor] Load Student Syllabus Failure',
  props<{ error: any }>()
);
