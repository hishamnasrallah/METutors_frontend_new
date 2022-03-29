import { createAction, props } from '@ngrx/store';

import { ITutor, IUser } from '@models';

export const completeTutorProfile = createAction(
  '[Tutor] Complete Tutor Profile',
  props<{ data: any; nextStep: number }>()
);

export const completeTutorProfileSuccess = createAction(
  '[Tutor] Complete Tutor Profile Success',
  props<{ nextStep: number; token: string; user: IUser }>()
);

export const completeTutorProfileFailure = createAction(
  '[Tutor] Complete Tutor Profile Failure',
  props<{ error: any }>()
);

// Load tutor
export const loadTutor = createAction(
  '[Tutor] Load Tutor',
  props<{ id: number }>()
);

export const loadTutorSuccess = createAction(
  '[Tutor] Load Tutor Success',
  props<{ tutor: ITutor }>()
);

export const loadTutorFailure = createAction(
  '[Tutor] Load Tutor Failure',
  props<{ error: any }>()
);

// Tutor Dashboard
export const loadTutorDashboard = createAction(
  '[Tutor] Load Tutor Dashboard',
  props<{ params: any; load: boolean }>()
);

export const loadTutorDashboardSuccess = createAction(
  '[Tutor] Load Tutor Dashboard Success',
  props<{ dashboard: any }>()
);

export const loadTutorDashboardFailure = createAction(
  '[Tutor] Load Tutor Dashboard Failure',
  props<{ error: any }>()
);

export const loadTutorDashboardEnded = createAction(
  '[Tutor] Load Tutor Dashboard Ended'
);

// Tutor syllabus & topics
export const loadTutorSyllabus = createAction('[Tutor] Load Tutor Syllabus');

export const loadTutorSyllabusSuccess = createAction(
  '[Tutor] Load Tutor Syllabus Success',
  props<{ syllabus: any }>()
);

export const loadTutorSyllabusFailure = createAction(
  '[Tutor] Load Tutor Syllabus Failure',
  props<{ error: any }>()
);

export const tutorAddSyllabusTopic = createAction(
  '[Tutor] Load Tutor Add Syllabus Topic',
  props<{ body: any }>()
);

export const tutorAddSyllabusTopicSuccess = createAction(
  '[Tutor] Load Tutor Add Syllabus Topic Success',
  props<{ syllabus: any; message: string }>()
);

export const tutorAddSyllabusTopicFailure = createAction(
  '[Tutor] Load Tutor Add Syllabus Topic Failure',
  props<{ error: any }>()
);

export const tutorEditSyllabusTopic = createAction(
  '[Tutor] Load Tutor Edit Syllabus Topic',
  props<{ body: any }>()
);

export const tutorEditSyllabusTopicSuccess = createAction(
  '[Tutor] Load Tutor Edit Syllabus Topic Success',
  props<{ syllabus: any; message: string }>()
);

export const tutorEditSyllabusTopicFailure = createAction(
  '[Tutor] Load Tutor Edit Syllabus Topic Failure',
  props<{ error: any }>()
);

export const tutorDeleteSyllabusTopic = createAction(
  '[Tutor] Load Tutor Delete Syllabus Topic',
  props<{ id: number }>()
);

export const tutorDeleteSyllabusTopicSuccess = createAction(
  '[Tutor] Load Tutor Delete Syllabus Topic Success',
  props<{ data: any; message: string }>()
);

export const tutorDeleteSyllabusTopicFailure = createAction(
  '[Tutor] Load Tutor Delete Syllabus Topic Failure',
  props<{ error: any }>()
);

export const tutorEditSubjectTitle = createAction(
  '[Tutor] Load Tutor Edit Subject Title',
  props<{ classId: number; title: string }>()
);

export const tutorEditSubjectTitleSuccess = createAction(
  '[Tutor] Load Tutor Edit Subject Title Success',
  props<{ classId: number; title: string; message: string }>()
);

export const tutorEditSubjectTitleFailure = createAction(
  '[Tutor] Load Tutor A Edit Subject Title Failure',
  props<{ error: any }>()
);

// Tutor launch class
export const tutorLaunchClass = createAction(
  '[Tutor] Load Tutor Launch Class',
  props<{ classId: number }>()
);

export const tutorLaunchClassSuccess = createAction(
  '[Tutor] Load Tutor Launch Class Success'
);

export const tutorLaunchClassFailure = createAction(
  '[Tutor] Load Tutor Launch Class Failure',
  props<{ error: any }>()
);

// Tutor resources
export const loadTutorResources = createAction('[Tutor] Load Tutor Resources');

export const loadTutorResourcesSuccess = createAction(
  '[Tutor] Load Tutor Resources Success',
  props<{ resources: any }>()
);

export const loadTutorResourcesFailure = createAction(
  '[Tutor] Load Tutor Resources Failure',
  props<{ error: any }>()
);

export const loadTutorResource = createAction(
  '[Tutor] Load Tutor Resource',
  props<{ id: number }>()
);

export const loadTutorResourceSuccess = createAction(
  '[Tutor] Load Tutor Resource Success',
  props<{ resource: any }>()
);

export const loadTutorResourceFailure = createAction(
  '[Tutor] Load Tutor Resource Failure',
  props<{ error: any }>()
);

export const addTutorResource = createAction(
  '[Tutor] Add Tutor Resource',
  props<{ body: any }>()
);

export const addTutorResourceSuccess = createAction(
  '[Tutor] Add Tutor Resource Success',
  props<{ resource: any; message: string }>()
);

export const addTutorResourceFailure = createAction(
  '[Tutor] Add Tutor Resource Failure',
  props<{ error: any }>()
);

export const editTutorResource = createAction(
  '[Tutor] Edit Tutor Resource',
  props<{ body: any }>()
);

export const editTutorResourceSuccess = createAction(
  '[Tutor] Edit Tutor Resource Success',
  props<{ resource: any; message: string }>()
);

export const editTutorResourceFailure = createAction(
  '[Tutor] Edit Tutor Resource Failure',
  props<{ error: any }>()
);

export const deleteTutorResource = createAction(
  '[Tutor] Delete Tutor Resource',
  props<{ id: number }>()
);

export const deleteTutorResourceSuccess = createAction(
  '[Tutor] Delete Tutor Resource Success',
  props<{ id: number; message: string }>()
);

export const deleteTutorResourceFailure = createAction(
  '[Tutor] Delete Tutor Resource Failure',
  props<{ error: any }>()
);

// Tutor assignments
export const loadTutorAssignments = createAction(
  '[Tutor] Load Tutor Assignments'
);

export const loadTutorAssignmentsSuccess = createAction(
  '[Tutor] Load Tutor Assignments Success',
  props<{ assignments: any }>()
);

export const loadTutorAssignmentsFailure = createAction(
  '[Tutor] Load Tutor Assignments Failure',
  props<{ error: any }>()
);

export const loadTutorAssignment = createAction(
  '[Tutor] Load Tutor Assignment',
  props<{ id: number }>()
);

export const loadTutorAssignmentSuccess = createAction(
  '[Tutor] Load Tutor Assignment Success',
  props<{ assignment: any }>()
);

export const loadTutorAssignmentFailure = createAction(
  '[Tutor] Load Tutor Assignment Failure',
  props<{ error: any }>()
);

export const tutorAddAssignment = createAction(
  '[Tutor] Tutor Add Assignment',
  props<{ body: any }>()
);

export const tutorAddAssignmentSuccess = createAction(
  '[Tutor] Tutor Add Assignment Success',
  props<{ assignment: any; message: string }>()
);

export const tutorAddAssignmentFailure = createAction(
  '[Tutor] Tutor Add Assignment Failure',
  props<{ error: any }>()
);
