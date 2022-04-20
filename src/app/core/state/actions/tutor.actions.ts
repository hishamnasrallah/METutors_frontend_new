import { createAction, props } from '@ngrx/store';

import { ITutor, IUser, SubmitInterviewInput } from '@models';

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

// Change tutor cover
export const changeTutorCover = createAction(
  '[Tutor] Change Tutor Cover',
  props<{ file: File }>()
);

export const changeTutorCoverSuccess = createAction(
  '[Tutor] Change Tutor Cover Success',
  props<{ cover: string }>()
);

export const changeTutorCoverFailure = createAction(
  '[Tutor] Change Tutor Cover Failure',
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

// Load Profile Tutor
export const loadProfileTutor = createAction('[Tutor] Load profile Tutor');

export const loadProfileTutorSuccess = createAction(
  '[Tutor] Load profile Tutor Success',
  props<{ tutor: ITutor }>()
);

export const loadProfileTutorFailure = createAction(
  '[Tutor] Load profile Tutor Failure',
  props<{ error: any }>()
);

export const loadProfileTutorEnded = createAction(
  '[Tutor] Load profile Tutor Ended'
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

export const loadTutorFeedbackPlatformOptions = createAction(
  '[Tutor] Load Tutor Feedback Platform Options'
);

export const loadTutorFeedbackPlatformOptionsSuccess = createAction(
  '[Tutor] Load Tutor Feedback Platform Options Success',
  props<{ feedbackOptions: any }>()
);

export const loadTutorFeedbackPlatformOptionsFailure = createAction(
  '[Tutor] Load Tutor Feedback Platform Options Failure',
  props<{ error: any }>()
);

// Submit Feedback
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

// Submit Platform Feedback
export const tutorSubmitPlatformFeedback = createAction(
  '[Tutor] Tutor Submit Platform Feedback',
  props<{ body: any }>()
);

export const tutorSubmitPlatformFeedbackSuccess = createAction(
  '[Tutor] Tutor Submit Platform Feedback Success',
  props<{ message: string }>()
);

export const tutorSubmitPlatformFeedbackFailure = createAction(
  '[Tutor] Tutor Submit Platform Feedback Failure',
  props<{ error: any }>()
);

// Submit Interview
export const submitInterview = createAction(
  '[Tutor] Submit Interview',
  props<{ submitInterviewInput: SubmitInterviewInput }>()
);

export const submitInterviewSuccess = createAction(
  '[Tutor] Submit Interview Success',
  props<{ message: string }>()
);

export const submitInterviewFailure = createAction(
  '[Tutor] Submit Interview Failure',
  props<{ error: any }>()
);
