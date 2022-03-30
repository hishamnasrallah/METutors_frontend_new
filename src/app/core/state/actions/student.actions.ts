import { IStudent } from '@metutor/core/models';
import { createAction, props } from '@ngrx/store';

// Load all students
export const loadStudents = createAction('[Student] Load Students');

export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ students: IStudent[] }>()
);

export const loadStudentsFailure = createAction(
  '[Student] Load Students Failure',
  props<{ error: any }>()
);

export const loadStudentsEnded = createAction('[Student] Load Students Ended');

export const loadStudentDashboard = createAction(
  '[Student] Load Student Dashboard',
  props<{ params: any; load: boolean }>()
);

export const loadStudentDashboardSuccess = createAction(
  '[Student] Load Student Dashboard Success',
  props<{ dashboard: any }>()
);

export const loadStudentDashboardFailure = createAction(
  '[Student] Load Student Dashboard Failure',
  props<{ error: any }>()
);

export const loadStudentDashboardEnded = createAction(
  '[Student] Load Student Dashboard Ended'
);

export const loadStudentClassesDashboard = createAction(
  '[Student] Load Student Classes Dashboard'
);

export const loadStudentClassesDashboardSuccess = createAction(
  '[Student] Load Student Classes Dashboard Success',
  props<{ classesDashboard: any }>()
);

export const loadStudentClassesDashboardFailure = createAction(
  '[Student] Load Student Classes Dashboard Failure',
  props<{ error: any }>()
);

export const loadStudentClassroom = createAction(
  '[Student] Load Student Classroom',
  props<{ params?: any }>()
);

export const loadStudentClassroomSuccess = createAction(
  '[Student] Load Student Classroom Success',
  props<{ classroom: any }>()
);

export const loadStudentClassroomFailure = createAction(
  '[Student] Load Student Classroom Failure',
  props<{ error: any }>()
);

export const loadStudentSyllabus = createAction(
  '[Student] Load Student Syllabus Dashboard'
);

export const loadStudentSyllabusSuccess = createAction(
  '[Student] Load Student Syllabus Success',
  props<{ syllabus: any }>()
);

export const loadStudentSyllabusFailure = createAction(
  '[Student] Load Student Syllabus Failure',
  props<{ error: any }>()
);

// Resources
export const loadStudentResources = createAction(
  '[Student] Load Student Resources'
);

export const loadStudentResourcesSuccess = createAction(
  '[Student] Load Student Resources Success',
  props<{ resources: any }>()
);

export const loadStudentResourcesFailure = createAction(
  '[Student] Load Student Resources Failure',
  props<{ error: any }>()
);

export const loadStudentResource = createAction(
  '[Student] Load Student Resource',
  props<{ id: number }>()
);

export const loadStudentResourceSuccess = createAction(
  '[Student] Load Student Resource Success',
  props<{ resource: any }>()
);

export const loadStudentResourceFailure = createAction(
  '[Student] Load Student Resource Failure',
  props<{ error: any }>()
);

export const studentJoinClass = createAction(
  '[Student] Student Join Class',
  props<{ id: number }>()
);

export const studentJoinClassSuccess = createAction(
  '[Student] Student Join Class Success'
);

export const studentJoinClassFailure = createAction(
  '[Student] Student Join Class Failure',
  props<{ error: any }>()
);
