import { createAction, props } from '@ngrx/store';

import {
  IUser,
  ITutor,
  IField,
  IInterview,
  SubmitInterviewInput,
  IExploreTutorsFilters
} from '@models';

// Complete tutor profile
export const completeTutorProfile = createAction(
  '[Tutor] Complete Tutor Profile',
  props<{ data: any; nextStep: number }>()
);

export const completeTutorProfileSuccess = createAction(
  '[Tutor] Complete Tutor Profile Success',
  props<{
    nextStep: number;
    token: string;
    user: IUser;
    profileTutor: ITutor;
  }>()
);

export const completeTutorProfileFailure = createAction(
  '[Tutor] Complete Tutor Profile Failure',
  props<{ error: any }>()
);

export const changeTutorProfileStep = createAction(
  '[Tutor] Change Tutor Profile Step',
  props<{ step: number }>()
);

// Update tutor profile
export const updateTutorProfile = createAction(
  '[Tutor] Update Tutor Profile',
  props<{ data: any }>()
);

export const updateTutorProfileSuccess = createAction(
  '[Tutor] Update Tutor Profile Success',
  props<{ message: string; profileTutor: ITutor }>()
);

export const updateTutorProfileFailure = createAction(
  '[Tutor] Update Tutor Profile Failure',
  props<{ error: any }>()
);

export const updateTutorPreferences = createAction(
  '[Tutor] Update Tutor Preferences',
  props<{ data: any }>()
);

export const updateTutorPreferencesSuccess = createAction(
  '[Tutor] Update Tutor Preferences Success',
  props<{ message: string; preferences: any }>()
);

export const updateTutorPreferencesFailure = createAction(
  '[Tutor] Update Tutor Preferences Failure',
  props<{ error: any }>()
);

export const updateTutorProfileRates = createAction(
  '[Tutor] Update Tutor Profile Rates',
  props<{ data: any }>()
);

export const updateTutorProfileRatesSuccess = createAction(
  '[Tutor] Update Tutor Profile Rates Success',
  props<{ message: string; profileTutor: ITutor }>()
);

export const updateTutorProfileRatesFailure = createAction(
  '[Tutor] Update Tutor Profile Rates Failure',
  props<{ error: any }>()
);

// Explore tutors
export const exploreTutors = createAction(
  '[Tutor] Explore Tutors',
  props<{ filters: IExploreTutorsFilters }>()
);

export const exploreTutorsSuccess = createAction(
  '[Tutor] Explore Tutors Success',
  props<{ tutors: ITutor[]; tutorsCount: number; fieldsOfStudy: IField[] }>()
);

export const exploreTutorsFailure = createAction(
  '[Tutor] Explore Tutors Failure',
  props<{ error: any }>()
);

// Change tutor status
export const changeTutorStatus = createAction(
  '[Tutor] Change Tutor Status',
  props<{ status: string; tutorId: number; reason: string }>()
);

export const changeTutorStatusSuccess = createAction(
  '[Tutor] Change Tutor Status Success',
  props<{ message: string; status: string; tutorId: number }>()
);

export const changeTutorStatusFailure = createAction(
  '[Tutor] Change Tutor Status Failure',
  props<{ error: any }>()
);

// Load available tutors
export const loadAvailableTutors = createAction(
  '[Tutor] Load Available Tutors',
  props<{ id?: number }>()
);

export const loadAvailableTutorsSuccess = createAction(
  '[Tutor] Load Available Tutors Success',
  props<{ availableTutors: ITutor[] }>()
);

export const loadAvailableTutorsFailure = createAction(
  '[Tutor] Load Available Tutors Failure',
  props<{ error: any }>()
);

// Load all tutors
export const loadTutors = createAction(
  '[Tutor] Load Tutors',
  props<{ page: number; search: string }>()
);

export const loadTutorsSuccess = createAction(
  '[Tutor] Load Tutors Success',
  props<{ tutors: ITutor[]; tutorsCounts: any }>()
);

export const loadTutorsFailure = createAction(
  '[Tutor] Load Tutors Failure',
  props<{ error: any }>()
);

// Load current tutors
export const loadCurrentTutors = createAction(
  '[Tutor] Load Current Tutors',
  props<{ params: { page: number; status: string; search?: string } }>()
);

export const loadCurrentTutorsSuccess = createAction(
  '[Tutor] Load Current Tutors Success',
  props<{ currentTutors: ITutor[]; tutorsCounts: any }>()
);

export const loadCurrentTutorsFailure = createAction(
  '[Tutor] Load Current Tutors Failure',
  props<{ error: any }>()
);

// Load pending tutors
export const loadPendingTutors = createAction(
  '[Tutor] Load Pending Tutors',
  props<{ params: { page: number; search?: string } }>()
);

export const loadPendingTutorsSuccess = createAction(
  '[Tutor] Load Pending Tutors Success',
  props<{
    pendingTutors: ITutor[];
    rejectedTutors: ITutor[];
    tutorsCounts: any;
  }>()
);

export const loadPendingTutorsFailure = createAction(
  '[Tutor] Load Pending Tutors Failure',
  props<{ error: any }>()
);

// Load suspended tutors
export const loadSuspendedTutors = createAction(
  '[Tutor] Load Suspended Tutors',
  props<{ params: { page: number; search?: string } }>()
);

export const loadSuspendedTutorsSuccess = createAction(
  '[Tutor] Load Suspended Tutors Success',
  props<{ tutorsCounts: any; suspendedTutors: ITutor[] }>()
);

export const loadSuspendedTutorsFailure = createAction(
  '[Tutor] Load Suspended Tutors Failure',
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

// Load admin tutor
export const loadAdminTutor = createAction(
  '[Tutor] Load Admin Tutor',
  props<{ id: number }>()
);

export const loadAdminTutorSuccess = createAction(
  '[Tutor] Load Admin Tutor Success',
  props<{ tutor: ITutor }>()
);

export const loadAdminTutorFailure = createAction(
  '[Tutor] Load Admin Tutor Failure',
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
  props<{ message: string; cancelCourse?: boolean }>()
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
  props<{ message: string; interviewRequest: IInterview }>()
);

export const submitInterviewFailure = createAction(
  '[Tutor] Submit Interview Failure',
  props<{ error: any }>()
);

// Reschedule class
export const tutorRescheduleClass = createAction(
  '[Tutor] Tutor Reschedule Class',
  props<{ body: any }>()
);

export const tutorRescheduleClassSuccess = createAction(
  '[Tutor] Tutor Reschedule Class Success',
  props<{ message: string; body: any }>()
);

export const tutorRescheduleClassFailure = createAction(
  '[Tutor] Tutor Reschedule Class Failure',
  props<{ error: any }>()
);

// Load Featured Tutors
export const loadFeaturedTutors = createAction('[Tutor] Load Featured Tutors');

export const loadFeaturedTutorsSuccess = createAction(
  '[Tutor] Load Featured Tutors Success',
  props<{ tutors: ITutor[] }>()
);

export const loadFeaturedTutorsFailure = createAction(
  '[Tutor] Load Featured Tutors Failure',
  props<{ error: any }>()
);

export const loadFeaturedTutorsEnded = createAction(
  '[Tutor] Load Featured Tutors Ended'
);

export const loadSubjectFeaturedTutors = createAction(
  '[Tutor] Load Subject Featured Tutors',
  props<{ id: number }>()
);

export const loadSubjectFeaturedTutorsSuccess = createAction(
  '[Tutor] Load Subject Featured Tutors Success',
  props<{ tutors: ITutor[] }>()
);

export const loadSubjectFeaturedTutorsFailure = createAction(
  '[Tutor] Load Subject Featured Tutors Failure',
  props<{ error: any }>()
);

export const loadTutorKudosPoints = createAction(
  '[Tutor] Load Tutor Kudos Points'
);

export const loadTutorKudosPointsSuccess = createAction(
  '[Tutor] Load Tutor Kudos Points Success',
  props<{ kudosPoints: any }>()
);

export const loadTutorKudosPointsFailure = createAction(
  '[Tutor] Load Tutor Kudos Points Failure',
  props<{ error: any }>()
);

export const tutorAddSignature = createAction(
  '[Tutor] Tutor Add Signature',
  props<{ payload: { url: string; document: string } }>()
);

export const tutorAddSignatureSuccess = createAction(
  '[Tutor] Tutor Add Signature Success',
  props<{ signature: string; message: string }>()
);

export const tutorAddSignatureFailure = createAction(
  '[Tutor] Tutor Add Signature Failure',
  props<{ error: any }>()
);

export const tutorSetSignature = createAction(
  '[Tutor] Tutor Set Signature',
  props<{ signature: any }>()
);
