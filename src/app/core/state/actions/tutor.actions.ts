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
