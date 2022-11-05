import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';

export * from './actions';
import * as fromRoot from '@metutor/state';
import * as featureKeys from './feature-keys';

import * as fromUserReducer from './reducers/user.reducer';
import * as fromMoneyReducer from './reducers/money.reducer';
import * as fromAdminReducer from './reducers/admin.reducer';
import * as fromTutorReducer from './reducers/tutor.reducer';
import * as fromCourseReducer from './reducers/course.reducer';
import * as fromTicketReducer from './reducers/ticket.reducer';
import * as fromUploadReducer from './reducers/upload.reducer';
import * as fromRequestReducer from './reducers/request.reducer';
import * as fromLookupsReducer from './reducers/lookups.reducer';
import * as fromFinanceReducer from './reducers/finance.reducer';
import * as fromStudentReducer from './reducers/student.reducer';
import * as fromInterviewReducer from './reducers/interview.reducer';
import * as fromTutorSyllabusReducer from './reducers/tutor-syllabus.reducer';
import * as fromTutorResourceReducer from './reducers/tutor-resource.reducer';
import * as fromTutorAssignmentReducer from './reducers/tutor-assignment.reducer';

export interface CoreState {
  [featureKeys.userFeatureKey]: fromUserReducer.State;
  [featureKeys.moneyFeatureKey]: fromMoneyReducer.State;
  [featureKeys.tutorFeatureKey]: fromTutorReducer.State;
  [featureKeys.adminFeatureKey]: fromAdminReducer.State;
  [featureKeys.courseFeatureKey]: fromCourseReducer.State;
  [featureKeys.ticketFeatureKey]: fromTicketReducer.State;
  [featureKeys.uploadFeatureKey]: fromUploadReducer.State;
  [featureKeys.financeFeatureKey]: fromFinanceReducer.State;
  [featureKeys.requestFeatureKey]: fromRequestReducer.State;
  [featureKeys.lookupsFeatureKey]: fromLookupsReducer.State;
  [featureKeys.studentFeatureKey]: fromStudentReducer.State;
  [featureKeys.interviewFeatureKey]: fromInterviewReducer.State;
  [featureKeys.tutorResourceFeatureKey]: fromTutorResourceReducer.State;
  [featureKeys.tutorSyllabusFeatureKey]: fromTutorSyllabusReducer.State;
  [featureKeys.tutorAssignmentFeatureKey]: fromTutorAssignmentReducer.State;
}

export function reducers(state: CoreState, action: Action) {
  return combineReducers({
    [featureKeys.userFeatureKey]: fromUserReducer.reducer,
    [featureKeys.moneyFeatureKey]: fromMoneyReducer.reducer,
    [featureKeys.tutorFeatureKey]: fromTutorReducer.reducer,
    [featureKeys.adminFeatureKey]: fromAdminReducer.reducer,
    [featureKeys.courseFeatureKey]: fromCourseReducer.reducer,
    [featureKeys.ticketFeatureKey]: fromTicketReducer.reducer,
    [featureKeys.uploadFeatureKey]: fromUploadReducer.reducer,
    [featureKeys.requestFeatureKey]: fromRequestReducer.reducer,
    [featureKeys.lookupsFeatureKey]: fromLookupsReducer.reducer,
    [featureKeys.studentFeatureKey]: fromStudentReducer.reducer,
    [featureKeys.financeFeatureKey]: fromFinanceReducer.reducer,
    [featureKeys.interviewFeatureKey]: fromInterviewReducer.reducer,
    [featureKeys.tutorSyllabusFeatureKey]: fromTutorSyllabusReducer.reducer,
    [featureKeys.tutorResourceFeatureKey]: fromTutorResourceReducer.reducer,
    [featureKeys.tutorAssignmentFeatureKey]: fromTutorAssignmentReducer.reducer,
  })(state, action);
}

// Core selectors
export const selectCoreState = createFeatureSelector<fromRoot.State, CoreState>(
  featureKeys.coreFeatureKey
);

export const selectTutorState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.tutorFeatureKey]
);

export const selectTutorAssignmentState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.tutorAssignmentFeatureKey]
);

export const selectTutorResourceState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.tutorResourceFeatureKey]
);

export const selectTutorSyllabusState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.tutorSyllabusFeatureKey]
);

export const selectLookupsState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.lookupsFeatureKey]
);

export const selectUserState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.userFeatureKey]
);

export const selectRequestState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.requestFeatureKey]
);

export const selectCourseState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.courseFeatureKey]
);

export const selectStudentState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.studentFeatureKey]
);

export const selectTicketState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.ticketFeatureKey]
);

export const selectInterviewState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.interviewFeatureKey]
);

export const selectUploadState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.uploadFeatureKey]
);

export const selectAdminState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.adminFeatureKey]
);
export const selectFinanceState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.financeFeatureKey]
);

export const selectMoneyState = createSelector(
  selectCoreState,
  (state) => state[featureKeys.moneyFeatureKey]
);

// User
export const selectIsSignUp = createSelector(
  selectUserState,
  fromUserReducer.selectIsSignUp
);

export const selectRegisterStep = createSelector(
  selectUserState,
  fromUserReducer.selectRegisterStep
);

export const selectRegisterEmail = createSelector(
  selectUserState,
  fromUserReducer.selectRegisterEmail
);

export const selectRegisterUserType = createSelector(
  selectUserState,
  fromUserReducer.selectRegisterUserType
);

export const selectIsSignIn = createSelector(
  selectUserState,
  fromUserReducer.selectIsSignIn
);

export const selectIsSocialSignIn = createSelector(
  selectUserState,
  fromUserReducer.selectIsSocialSignIn
);

export const selectToken = createSelector(
  selectUserState,
  fromUserReducer.selectToken
);

export const selectTempToken = createSelector(
  selectUserState,
  fromUserReducer.selectTempToken
);

export const selectSignInFailure = createSelector(
  selectUserState,
  fromUserReducer.selectSignInFailure
);

export const selectIsSubmitOTPAdmin = createSelector(
  selectUserState,
  fromUserReducer.selectIsSubmitOTPAdmin
);

export const selectIsResendOTPAdmin = createSelector(
  selectUserState,
  fromUserReducer.selectIsResendOTPAdmin
);

export const selectProfileStep = createSelector(
  selectUserState,
  fromUserReducer.selectProfileStep
);

export const selectStudentIsDemo = createSelector(
  selectUserState,
  fromUserReducer.selectStudentIsDemo
);

export const selectUser = createSelector(
  selectUserState,
  fromUserReducer.selectUser
);

export const selectIsChangingPassword = createSelector(
  selectUserState,
  fromUserReducer.selectIsChangingPassword
);

export const selectChangePasswordSuccess = createSelector(
  selectUserState,
  fromUserReducer.selectChangePasswordSuccess
);

export const selectIsVerifyEmail = createSelector(
  selectUserState,
  fromUserReducer.selectIsVerifyEmail
);

export const selectIsResendEmailConfirm = createSelector(
  selectUserState,
  fromUserReducer.selectIsResendEmailConfirm
);

/**
 * ========================== TUTOR ==============================
 */
export const selectTutor = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutor
);

export const selectTutorDashboard = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorDashboard
);

export const selectIsLoadingTutor = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutor
);

export const selectProfileTutor = createSelector(
  selectTutorState,
  fromTutorReducer.selectProfileTutor
);

export const selectIsLoadingProfileTutor = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingProfileTutor
);

export const selectTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutors
);

export const selectExploreTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectExploreTutors
);

export const selectIsLoadingExploreTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingExploreTutors
);

export const selectExploreTutorsCount = createSelector(
  selectTutorState,
  fromTutorReducer.selectExploreTutorsCount
);

export const selectexploreTutorsFieldsOfStudy = createSelector(
  selectTutorState,
  fromTutorReducer.selectexploreTutorsFieldsOfStudy
);

export const selectAvailableTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectAvailableTutors
);

export const selectIsLoadingAvailableTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingAvailableTutors
);

export const selectCurrentTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectCurrentTutors
);

export const selectPendingTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectPendingTutors
);

export const selectRejectedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectRejectedTutors
);

export const selectSuspendedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectSuspendedTutors
);

export const selectIsLoadingTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutors
);

export const selectIsLoadingCurrentTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingCurrentTutors
);

export const selectIsLoadingPendingTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingPendingTutors
);

export const selectIsLoadingSuspendedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingSuspendedTutors
);

export const selectTutorsCounts = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorsCounts
);

export const selectIsLoadingTutorDashboard = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorDashboard
);

export const selectIsCompleteTutorProfile = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsCompleteTutorProfile
);

export const selectIsUpdateTutorProfile = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsUpdateTutorProfile
);

export const selectIsChangeTutorStatus = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsChangeTutorStatus
);

export const selectIsSubmittingInterview = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsSubmittingInterview
);

export const selectTutorAttendance = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorAttendance
);

export const selectIsLoadingTutorAttendance = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorAttendance
);

export const selectIsSubmittingTutorFeedback = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsSubmittingTutorFeedback
);

export const selectTutorFeedbackOptions = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorFeedbackOptions
);

export const selectIsLoadingTutorFeedbackOptions = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorFeedbackOptions
);

export const selectIsReschedulingTutorClass = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsReschedulingTutorClass
);

export const selectFeaturedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectFeaturedTutors
);

export const selectIsLoadingFeaturedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingFeaturedTutors
);

export const selectSubjectFeaturedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectSubjectFeaturedTutors
);

export const selectIsLoadingSubjectFeaturedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingSubjectFeaturedTutors
);

export const selectTutorKudosPoints = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorKudosPoints
);

export const selectIsLoadingTutorKudosPoints = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorKudosPoints
);

export const selectTutorLoading = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorLoading
);

export const selectTutorSignature = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorSignature
);

// Tutor syllabus
export const selectTutorSyllabus = createSelector(
  selectTutorSyllabusState,
  fromTutorSyllabusReducer.selectTutorSyllabus
);

export const selectIsLoadingTutorSyllabus = createSelector(
  selectTutorSyllabusState,
  fromTutorSyllabusReducer.selectIsLoadingTutorSyllabus
);

export const selectIsAddingSyllabusTopic = createSelector(
  selectTutorSyllabusState,
  fromTutorSyllabusReducer.selectIsAddingSyllabusTopic
);

export const selectIsSavingSubjectTitle = createSelector(
  selectTutorSyllabusState,
  fromTutorSyllabusReducer.selectIsSavingSubjectTitle
);

export const selectIsDeletingTopic = createSelector(
  selectTutorSyllabusState,
  fromTutorSyllabusReducer.selectIsDeletingTopic
);

export const selectSubjectTitleEditedSuccess = createSelector(
  selectTutorSyllabusState,
  fromTutorSyllabusReducer.selectSubjectTitleEditedSuccess
);

export const selectIsLaunchingClass = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLaunchingClass
);

// Tutor resource
export const selectTutorResource = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectTutorResource
);

export const selectIsLoadingTutorResource = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectIsLoadingTutorResource
);

export const selectTutorResources = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectTutorResources
);

export const selectIsLoadingTutorResources = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectIsLoadingTutorResources
);

export const selectIsAddingTutorResources = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectIsAddingTutorResources
);

export const selectIsDeletingResource = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectIsDeletingResource
);
export const selectUploadingResourceDoc = createSelector(
  selectTutorResourceState,
  fromTutorResourceReducer.selectUploadingResourceDoc
);

// Tutor assignment
export const selectTutorAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectTutorAssignment
);

export const selectTutorFilteredAssignments = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectTutorFilteredAssignments
);

export const selectIsLoadingTutorAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsLoadingTutorAssignment
);

export const selectTutorAssignments = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectTutorAssignments
);

export const selectIsLoadingTutorAssignments = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsLoadingTutorAssignments
);

export const selectIsAddingAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsAddingAssignment
);

export const selectIsLoadingAssignees = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsLoadingAssignees
);

export const selectTutorAssignmentAssignees = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectTutorAssignmentAssignees
);

export const selectIsDeletingTutorAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsDeletingTutorAssignment
);

export const selectTutorViewStudentAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectTutorStudentAssignment
);

export const selectIsLoadingTutorViewStudentAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsLoadingTutorStudentAssignment
);

export const selectIsAcceptRejectAssignment = createSelector(
  selectTutorAssignmentState,
  fromTutorAssignmentReducer.selectIsAcceptRejectAssignment
);

/**
 * ========================== STUDENT ==============================
 */
export const selectStudent = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudent
);

export const selectStudents = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudents
);

export const selectFilteredStudents = createSelector(
  selectStudentState,
  fromStudentReducer.selectFilteredStudents
);

export const selectIsLoadingStudents = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudents
);

export const selectStudentDashboard = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentDashboard
);

export const selectIsLoadingStudentDashboard = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentDashboard
);

export const selectIsCreatingNewClass = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsCreatingNewClass
);

export const selectClassroomLastActivityCourse = createSelector(
  selectStudentState,
  fromStudentReducer.selectClassroomLastActivityCourse
);

export const selectActiveClassroomCourses = createSelector(
  selectStudentState,
  fromStudentReducer.selectActiveClassroomCourses
);

export const selectCompletedClassroomCourses = createSelector(
  selectStudentState,
  fromStudentReducer.selectCompletedClassroomCourses
);

export const selectCancelledClassroomCourses = createSelector(
  selectStudentState,
  fromStudentReducer.selectCancelledClassroomCourses
);

export const selectClassroomCoursePrograms = createSelector(
  selectStudentState,
  fromStudentReducer.selectClassroomCoursePrograms
);

export const selectClassroomCourseFieldOfStudies = createSelector(
  selectStudentState,
  fromStudentReducer.selectClassroomCourseFieldOfStudies
);

export const selectIsLoadingStudentClassroom = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentClassroom
);

export const selectStudentClassesDashboard = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentClassesDashboard
);

export const selectIsLoadingStudentClassesDashboard = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentClassesDashboard
);

export const selectStudentSyllabus = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentSyllabus
);

export const selectIsLoadingStudentSyllabus = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentSyllabus
);

export const selectStudentResources = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentResources
);

export const selectIsLoadingStudentResources = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentResources
);

export const selectStudentResource = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentResource
);

export const selectIsLoadingStudentResource = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentResource
);

export const selectIsJoiningClass = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsJoiningClass
);

export const selectStudentAssignments = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentAssignments
);

export const selectStudentFilteredAssignments = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentFilteredAssignments
);

export const selectIsLoadingStudentAssignments = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentAssignments
);

export const selectStudentAssignment = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentAssignment
);

export const selectIsLoadingStudentAssignment = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentAssignment
);

export const selectIsSubmittingAssignment = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsSubmittingAssignment
);

export const selectStudentSubmittedAssignment = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentSubmittedAssignment
);

export const selectIsLoadingStudentSubmittedAssignment = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentSubmittedAssignment
);

export const selectStudentAttendance = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentAttendance
);

export const selectIsLoadingStudentAttendance = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentAttendance
);

export const selectStudentFeedbackOptions = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentFeedbackOptions
);

export const selectIsLoadingStudentFeedbackOptions = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentFeedbackOptions
);

export const selectIsSubmittingStudentFeedback = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsSubmittingFeedback
);

export const selectIsUpdatingStudentProfile = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsUpdatingStudentProfile
);

export const selectStudentPreferences = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentPreferences
);

export const selectIsLoadingStudentPreferences = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentPreferences
);

export const selectStudentTimeSlots = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentTimeSlots
);

export const selectStudentCertificate = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentCertificate
);

export const selectStudentCertificates = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentCertificates
);

export const selectIsLoadingTimeSlots = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingTimeSlots
);

export const selectIsStudentMakeupClass = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsStudentMakeupClass
);

export const selectTutorAvailability = createSelector(
  selectStudentState,
  fromStudentReducer.selectTutorAvailability
);

export const selectIsLoadingTutorAvailability = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingTutorAvailability
);

export const selectStudentLoading = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentLoading
);

export const selectStudentPagination = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentPagination
);

// Ticket
export const selectTickets = createSelector(
  selectTicketState,
  fromTicketReducer.selectTickets
);

export const selectIsLoadingTickets = createSelector(
  selectTicketState,
  fromTicketReducer.selectIsLoadingTickets
);

export const selectTicket = createSelector(
  selectTicketState,
  fromTicketReducer.selectTicket
);

export const selectTicketCounts = createSelector(
  selectTicketState,
  fromTicketReducer.selectTicketCounts
);

export const selectIsLoadingTicket = createSelector(
  selectTicketState,
  fromTicketReducer.selectIsLoadingTicket
);

export const selectIsCreatingTicket = createSelector(
  selectTicketState,
  fromTicketReducer.selectIsCreatingTicket
);

export const selectIsSubmitTicketComment = createSelector(
  selectTicketState,
  fromTicketReducer.selectIsSubmitTicketComment
);

export const selectIsChangeTicketStatus = createSelector(
  selectTicketState,
  fromTicketReducer.selectIsChangeTicketStatus
);

// Interview Requests
export const selectInterviews = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectInterviews
);

export const selectIsLoadingInterviews = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectIsLoadingInterviews
);

export const selectInterview = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectInterview
);

export const selectIsLoadingInterview = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectIsLoadingInterview
);

export const selectIsAcceptingInterview = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectIsAcceptingInterview
);

export const selectIsDeclineInterview = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectIsDeclineInterview
);

export const selectIsSchedulingInterview = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectIsSchedulingInterview
);

export const selectIsJoiningInterview = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectIsJoiningInterview
);

export const selectInterviewPagination = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectInterviewPagination
);

// Requests
export const selectEstimatedPrice = createSelector(
  selectRequestState,
  fromRequestReducer.selectEstimatedPrice
);

export const selectIsLoadingEstimatedPrice = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsLoadingEstimatedPrice
);

export const selectGeneratingAvailableTutors = createSelector(
  selectRequestState,
  fromRequestReducer.selectGeneratingAvailableTutors
);

export const selectGeneratingSuggestedTutors = createSelector(
  selectRequestState,
  fromRequestReducer.selectGeneratingSuggestedTutors
);

export const selectFilteredGeneratingAvailableTutors = createSelector(
  selectRequestState,
  fromRequestReducer.selectFilteredGeneratingAvailableTutors
);

export const selectFilteredGeneratingSuggestedTutors = createSelector(
  selectRequestState,
  fromRequestReducer.selectFilteredGeneratingSuggestedTutors
);

export const selectIsGeneratingTutors = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsGeneratingTutors
);

export const selectIsCreateClass = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsCreateClass
);

export const selectCreatedClass = createSelector(
  selectRequestState,
  fromRequestReducer.selectCreatedClass
);

export const selectIsCalculateFinalInvoice = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsCalculateFinalInvoice
);

export const selectInvoiceDetails = createSelector(
  selectRequestState,
  fromRequestReducer.selectInvoiceDetails
);

export const selectIsLoadingRequestedCourses = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsLoadingRequestedCourses
);

export const selectRequestedCourses = createSelector(
  selectRequestState,
  fromRequestReducer.selectRequestedCourses
);

export const selectIsRequestCourse = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsRequestCourse
);

export const selectCompletedRequestedCourses = createSelector(
  selectRequestState,
  fromRequestReducer.selectCompletedRequestedCourses
);

export const selectRequestedCoursesCount = createSelector(
  selectRequestState,
  fromRequestReducer.selectRequestedCoursesCount
);

export const selectRequestPaymentInfo = createSelector(
  selectRequestState,
  fromRequestReducer.selectRequestPaymentInfo
);

export const selectRequestedIsCreatingCourse = createSelector(
  selectRequestState,
  fromRequestReducer.selectRequestedIsCreatingCourse
);

export const selectIsGetInvoiceEmail = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsGetInvoiceEmail
);

// Lookups
export const selectIsLoadingUserTypes = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingUserTypes
);

export const selectUserTypes = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectUserTypes
);

export const selectIsLoadingLanguages = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingLanguages
);

export const selectLanguages = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectLanguages
);

export const selectLevels = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectLevels
);

export const selectIsLoadingCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingCountries
);

export const selectCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectCountries
);

export const selectIsLoadingProgramCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingProgramCountries
);

export const selectProgramCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectProgramCountries
);

export const selectFlagCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFlagCountries
);

export const selectCities = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectCities
);

export const selectPrograms = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectPrograms
);

export const selectIsLoadingPrograms = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingPrograms
);

export const selectFilteredPrograms = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFilteredPrograms
);

export const selectSubjects = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectSubjects
);

export const selectIsLoadingSubjects = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingSubjects
);

export const selectFields = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFields
);

export const selectIsLoadingFields = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingFields
);

export const selectTopics = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectTopics
);

export const selectIsLoadingTopics = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingTopics
);

export const selectFAQs = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFAQs
);

export const selectIsLoadingFAQs = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingFAQs
);

export const selectFilteredFAQs = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFilteredFAQs
);

export const selectTicketCategories = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectTicketCategories
);

export const selectIsLoadingTicketCategories = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingTicketCategories
);

export const selectTicketPriorities = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectTicketPriorities
);

export const selectIsLoadingTicketPriorities = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingTicketPriorities
);

export const selectIsAddingEditingProgram = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsAddingEditingProgram
);

export const selectIsDeletingProgram = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsDeletingProgram
);

export const selectIsAddingEditingField = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsAddingEditingField
);

export const selectIsDeletingField = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsDeletingField
);

export const selectIsAddingEditingSubject = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsAddingEditingSubject
);

export const selectIsDeletingSubject = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsDeletingSubject
);

export const selectIsAddingEditingProgramCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsAddingEditingProgramCountries
);

export const selectIsDeletingProgramCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsDeletingProgramCountries
);

export const selectLookUpsPagination = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectLookUpsPagination
);

// Course
export const selectCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectCourses
);

export const selectCourseById = createSelector(
  selectCourseState,
  fromCourseReducer.selectCourseById
);

export const selectStudentCourseRefund = createSelector(
  selectCourseState,
  fromCourseReducer.selectStudentCourseRefund
);

export const selectIsLoadingRefundCourse = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsLoadingRefundCourse
);

export const selectExploredCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectExploredCourses
);

export const selectIsLoadingExploredCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsLoadingExploredCourses
);

export const selectFilteredExploredCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectFilteredExploredCourses
);

export const selectIsLoadingCourseById = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsLoadingCourseById
);

export const selectNewCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectNewCourses
);

export const selectActiveCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectActiveCourses
);

export const selectCoursePrograms = createSelector(
  selectCourseState,
  fromCourseReducer.selectCoursePrograms
);

export const selectCourseFieldOfStudies = createSelector(
  selectCourseState,
  fromCourseReducer.selectCourseFieldOfStudies
);

export const selectCompletedCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectCompletedCourses
);

export const selectCancelledCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectCancelledCourses
);

export const selectIsLoadingCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsLoadingCourses
);

export const selectIsRejectingCourse = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsRejectingCourse
);

export const selectIsAcceptingCourse = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsAcceptingCourse
);

export const selectIsCancelingCourse = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsCancelingCourse
);

export const selectIsReassigningTutor = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsReassigningTutor
);

// Upload files
export const selectUploadedFiles = createSelector(
  selectUploadState,
  fromUploadReducer.selectUploadedFiles
);

export const selectIsUploadingFile = createSelector(
  selectUploadState,
  fromUploadReducer.selectIsUploadingFile
);

export const selectFileUploadingProgress = createSelector(
  selectUploadState,
  fromUploadReducer.selectFileUploadingProgress
);

export const selectIsDeletingFile = createSelector(
  selectUploadState,
  fromUploadReducer.selectIsDeletingFile
);

export const selectIsUploadingAvatar = createSelector(
  selectUploadState,
  fromUploadReducer.selectIsUploadingAvatar
);

export const selectIsUploadingCover = createSelector(
  selectUploadState,
  fromUploadReducer.selectIsUploadingCover
);

export const selectIsUploadingVideo = createSelector(
  selectUploadState,
  fromUploadReducer.selectIsUploadingVideo
);

// Admin selectors
export const selectAdminDocuments = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminDocuments
);

export const selectIsLoadingAdminDocuments = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminDocs
);

export const selectAdminTutors = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminTutors
);

export const selectIsLoadingAdminTutors = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminTutors
);

export const selectIsRejectingAdminDocs = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsRejectingAdminDocs
);

export const selectIsApprovingAdminDocs = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsApprovingAdminDocs
);

export const selectIsLoadingWorkforceCapacity = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingWorkforceCapacity
);

export const selectWorkforceCapacity = createSelector(
  selectAdminState,
  fromAdminReducer.selectWorkforceCapacity
);

export const selectIsLoadingCourseBooking = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingCourseBooking
);

export const selectCourseBooking = createSelector(
  selectAdminState,
  fromAdminReducer.selectCourseBooking
);

export const selectIsLoadingBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingBookings
);

export const selectBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectBookings
);

export const selectIsLoadingCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingCancelledBookings
);

export const selectCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectCancelledBookings
);

export const selectStudentCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectStudentCancelledBookings
);

export const selectAdminCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminCancelledBookings
);

export const selectTeacherCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectTeacherCancelledBookings
);

export const selectBookingCounts = createSelector(
  selectAdminState,
  fromAdminReducer.selectBookingCounts
);

export const selectAdminBookingDetail = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminBookingDetail
);

export const selectIsLoadingAdminBookingDetail = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminBookingDetail
);

export const selectAdminCoursePreviousTutors = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminCoursePreviousTutors
);

export const selectIsLoadingPreviousTutors = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingPreviousTutors
);

export const selectAdminStudentsFeedback = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminStudentsFeedback
);

export const selectIsLoadingAdminStudentsFeedback = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminStudentsFeedback
);

export const selectAdminStudentProfile = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminStudentProfile
);

export const selectIsLoadingAdminStudentProfile = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminStudentProfile
);

export const selectAdminStudentTotalBooking = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminStudentTotalBooking
);

export const selectAdminStudentAssignmentSummary = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminStudentAssignmentSummary
);

export const selectIsLoadingStudentAssignmentSummary = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingStudentAssignmentSummary
);

export const selectAdminViewFeedback = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminViewFeedback
);

export const selectIsLoadingViewFeedback = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingViewFeedback
);

export const selectIsLoadingBookingPerCourse = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingBookingPerCourse
);

export const selectBookingPerCourse = createSelector(
  selectAdminState,
  fromAdminReducer.selectBookingPerCourse
);

export const selectAdminTutorReAssignment = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminTutorReAssignment
);

export const selectIsLoadingAdminTutorReAssignment = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminTutorReAssignment
);

export const selectAdminTestimonials = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminTestimonials
);

export const selectIsLoadingAdmin = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdmin
);

export const selectIsLoadingAdminTestimonials = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAdminTestimonials
);

export const selectAdminTestimonialFeedbackOptions = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminTestimonialFeedbackOptions
);

export const selectIsEditingAdminTestimonialFeedback = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsEditingAdminTestimonialFeedback
);

export const selectAdminTutorApprovalRequest = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminTutorApprovalRequest
);

export const selectAdminTutorSchedule = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminTutorSchedule
);

export const selectIsLoadingTutorSchedule = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingTutorSchedule
);

export const selectAdminPagination = createSelector(
  selectAdminState,
  fromAdminReducer.selectAdminPagination
);

/**
 *  FINANCE SELECTORS
 */

export const selectFinanceOrders = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinanceOrders
);

export const selectFinanceCoupons = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinanceCoupons
);

export const selectFinanceCourses = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinanceCourses
);

export const selectIsLoadingFinance = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectIsLoadingFinance
);

export const selectFinanceRefundDetail = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinanceRefundDetail
);

export const selectIsLoadingFinanceRefundDetail = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectIsLoadingFinanceRefundDetail
);

export const selectIsLoadingFinanceAddCoupon = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectIsLoadingFinanceAddCoupon
);

export const selectFinanceIsRefundingCourse = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinanceIsRefundingCourse
);

export const selectFinanceCoursePaymentStatus = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinanceCoursePaymentStatus
);

export const selectFinancePaymentInfo = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectFinancePaymentInfo
);

export const selectIsRetryingPayment = createSelector(
  selectFinanceState,
  fromFinanceReducer.selectIsRetryingPayment
);

// Money Selectors

export const selectIsLoadingCurrencyRates = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectIsLoadingCurrencyRates
);

export const selectCurrencyRates = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectCurrencyRates
);

export const selectBaseCurrency = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectBaseCurrency
);

export const selectCurrentCurrency = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectCurrentCurrency
);

export const selectLoadingRatesErrorMessage = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectLoadingRatesErrorMessage
);

export const selectCurrenciesNames = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectCurrencies
);

export const selectIsLoadingCurrenciesNames = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectIsLoadingCurrencies
);

export const selectLoadingCurrenciesNamesError = createSelector(
  selectMoneyState,
  fromMoneyReducer.selectLoadingCurrenciesErrorMessage
);
