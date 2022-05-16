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
import * as fromAdminReducer from './reducers/admin.reducer';
import * as fromTutorReducer from './reducers/tutor.reducer';
import * as fromCourseReducer from './reducers/course.reducer';
import * as fromTicketReducer from './reducers/ticket.reducer';
import * as fromUploadReducer from './reducers/upload.reducer';
import * as fromRequestReducer from './reducers/request.reducer';
import * as fromLookupsReducer from './reducers/lookups.reducer';
import * as fromStudentReducer from './reducers/student.reducer';
import * as fromInterviewReducer from './reducers/interview.reducer';
import * as fromTutorSyllabusReducer from './reducers/tutor-syllabus.reducer';
import * as fromTutorResourceReducer from './reducers/tutor-resource.reducer';
import * as fromTutorAssignmentReducer from './reducers/tutor-assignment.reducer';

export interface CoreState {
  [featureKeys.userFeatureKey]: fromUserReducer.State;
  [featureKeys.tutorFeatureKey]: fromTutorReducer.State;
  [featureKeys.adminFeatureKey]: fromAdminReducer.State;
  [featureKeys.courseFeatureKey]: fromCourseReducer.State;
  [featureKeys.ticketFeatureKey]: fromTicketReducer.State;
  [featureKeys.uploadFeatureKey]: fromUploadReducer.State;
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
    [featureKeys.tutorFeatureKey]: fromTutorReducer.reducer,
    [featureKeys.adminFeatureKey]: fromAdminReducer.reducer,
    [featureKeys.courseFeatureKey]: fromCourseReducer.reducer,
    [featureKeys.ticketFeatureKey]: fromTicketReducer.reducer,
    [featureKeys.uploadFeatureKey]: fromUploadReducer.reducer,
    [featureKeys.requestFeatureKey]: fromRequestReducer.reducer,
    [featureKeys.lookupsFeatureKey]: fromLookupsReducer.reducer,
    [featureKeys.studentFeatureKey]: fromStudentReducer.reducer,
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

// User
export const selectIsSignIn = createSelector(
  selectUserState,
  fromUserReducer.selectIsSignIn
);

export const selectToken = createSelector(
  selectUserState,
  fromUserReducer.selectToken
);

export const selectTempToken = createSelector(
  selectUserState,
  fromUserReducer.selectTempToken
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

export const selectSuspendedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectSuspendedTutors
);

export const selectFilteredTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectFilteredTutors
);

export const selectFilteredCurrentTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectFilteredCurrentTutors
);

export const selectFilteredPendingTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectFilteredPendingTutors
);

export const selectFilteredSuspendedTutors = createSelector(
  selectTutorState,
  fromTutorReducer.selectFilteredSuspendedTutors
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

export const selectIsChangeTutorCover = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsChangeTutorCover
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

// Ticket
export const selectTickets = createSelector(
  selectTicketState,
  fromTicketReducer.selectTickets
);

export const selectFilteredTickets = createSelector(
  selectTicketState,
  fromTicketReducer.selectFilteredTickets
);

export const selectIsLoadingTickets = createSelector(
  selectTicketState,
  fromTicketReducer.selectIsLoadingTickets
);

export const selectTicket = createSelector(
  selectTicketState,
  fromTicketReducer.selectTicket
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

export const selectFilteredInterviews = createSelector(
  selectInterviewState,
  fromInterviewReducer.selectFilteredInterviews
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

// Requests
export const selectEstimatedPrice = createSelector(
  selectRequestState,
  fromRequestReducer.selectEstimatedPrice
);

export const selectIsLoadingEstimatedPrice = createSelector(
  selectRequestState,
  fromRequestReducer.selectIsLoadingEstimatedPrice
);

export const selectGeneratingTutors = createSelector(
  selectRequestState,
  fromRequestReducer.selectGeneratingTutors
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

// Lookups
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

export const selectFilteredProgramCountries = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFilteredProgramCountries
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

export const selectFilteredSubjects = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFilteredSubjects
);

export const selectFields = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFields
);

export const selectIsLoadingFields = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectIsLoadingFields
);

export const selectFilteredFields = createSelector(
  selectLookupsState,
  fromLookupsReducer.selectFilteredFields
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

export const selectFilteredWorkforceCapacity = createSelector(
  selectAdminState,
  fromAdminReducer.selectFilteredWorkforceCapacity
);

export const selectIsLoadingAllBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingAllBookings
);

export const selectAllBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectAllBookings
);

export const selectIsLoadingCompletedBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingCompletedBookings
);

export const selectCompletedBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectCompletedBookings
);

export const selectIsLoadingCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingCancelledBookings
);

export const selectCancelledBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectCancelledBookings
);

export const selectIsLoadingRunningBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectIsLoadingRunningBookings
);

export const selectRunningBookings = createSelector(
  selectAdminState,
  fromAdminReducer.selectRunningBookings
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
