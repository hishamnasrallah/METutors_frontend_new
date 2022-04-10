import { createAction, props } from '@ngrx/store';

import { ITutor, IUser } from '@models';

// Complete tutor profile
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

// Load all tutors
export const loadTutors = createAction('[Tutor] Load Tutors');

export const loadTutorsSuccess = createAction(
  '[Tutor] Load Tutors Success',
  props<{ tutors: ITutor[] }>()
);

export const loadTutorsFailure = createAction(
  '[Tutor] Load Tutors Failure',
  props<{ error: any }>()
);

export const loadTutorsEnded = createAction('[Tutor] Load Tutors Ended');

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

// Tutor dashboard
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

// Tutor attendance
export const loadTutorAttendance = createAction(
  '[Tutor] Load Tutor Attendance'
);

export const loadTutorAttendanceSuccess = createAction(
  '[Tutor] Load Tutor Attendance Success',
  props<{ attendance: any }>()
);

export const loadTutorAttendanceFailure = createAction(
  '[Tutor] Load Tutor Attendance Failure',
  props<{ error: any }>()
);

export const loadTutorAttendanceEnded = createAction(
  '[Tutor] Load Tutor Attendance Ended'
);

// Tutor feedback
export const loadTutorFeedbackOptions = createAction(
  '[Tutor] Load Tutor Feedback Options'
);

export const loadTutorFeedbackOptionsSuccess = createAction(
  '[Tutor] Load Tutor Feedback Options Success',
  props<{ feedbackOptions: any }>()
);

export const loadTutorFeedbackOptionsFailure = createAction(
  '[Tutor] Load Tutor Feedback Options Failure',
  props<{ error: any }>()
);

export const tutorSubmitFeedback = createAction(
  '[Tutor] Tutor Submit Feedback',
  props<{ body: any }>()
);

export const tutorSubmitFeedbackSuccess = createAction(
  '[Tutor] Tutor Submit Feedback Success',
  props<{ message: string }>()
);

export const tutorSubmitFeedbackFailure = createAction(
  '[Tutor] Tutor Submit Feedback Failure',
  props<{ error: any }>()
);
