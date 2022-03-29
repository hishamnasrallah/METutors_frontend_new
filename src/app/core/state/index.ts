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
import * as fromTutorReducer from './reducers/tutor.reducer';
import * as fromCourseReducer from './reducers/course.reducer';
import * as fromTicketReducer from './reducers/ticket.reducer';
import * as fromUploadReducer from './reducers/upload.reducer';
import * as fromRequestReducer from './reducers/request.reducer';
import * as fromLookupsReducer from './reducers/lookups.reducer';
import * as fromStudentReducer from './reducers/student.reducer';
import * as fromInterviewReducer from './reducers/interview.reducer';

export interface CoreState {
  [featureKeys.userFeatureKey]: fromUserReducer.State;
  [featureKeys.tutorFeatureKey]: fromTutorReducer.State;
  [featureKeys.courseFeatureKey]: fromCourseReducer.State;
  [featureKeys.ticketFeatureKey]: fromTicketReducer.State;
  [featureKeys.uploadFeatureKey]: fromUploadReducer.State;
  [featureKeys.requestFeatureKey]: fromRequestReducer.State;
  [featureKeys.lookupsFeatureKey]: fromLookupsReducer.State;
  [featureKeys.studentFeatureKey]: fromStudentReducer.State;
  [featureKeys.interviewFeatureKey]: fromInterviewReducer.State;
}

export function reducers(state: CoreState, action: Action) {
  return combineReducers({
    [featureKeys.userFeatureKey]: fromUserReducer.reducer,
    [featureKeys.tutorFeatureKey]: fromTutorReducer.reducer,
    [featureKeys.courseFeatureKey]: fromCourseReducer.reducer,
    [featureKeys.ticketFeatureKey]: fromTicketReducer.reducer,
    [featureKeys.uploadFeatureKey]: fromUploadReducer.reducer,
    [featureKeys.requestFeatureKey]: fromRequestReducer.reducer,
    [featureKeys.lookupsFeatureKey]: fromLookupsReducer.reducer,
    [featureKeys.studentFeatureKey]: fromStudentReducer.reducer,
    [featureKeys.interviewFeatureKey]: fromInterviewReducer.reducer,
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

// Tutor
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

export const selectIsLoadingTutorDashboard = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorDashboard
);

export const selectIsCompleteTutorProfile = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsCompleteTutorProfile
);

export const selectTutorSyllabus = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorSyllabus
);

export const selectIsLoadingTutorSyllabus = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorSyllabus
);

export const selectIsAddingSyllabusTopic = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsAddingSyllabusTopic
);

export const selectIsSavingSubjectTitle = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsSavingSubjectTitle
);

export const selectIsDeletingTopic = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsDeletingTopic
);

export const selectIsLaunchingClass = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLaunchingClass
);

export const selectSubjectTitleEditedSuccess = createSelector(
  selectTutorState,
  fromTutorReducer.selectSubjectTitleEditedSuccess
);

export const selectTutorResource = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorResource
);

export const selectIsLoadingTutorResource = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorResource
);

export const selectTutorResources = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorResources
);

export const selectIsLoadingTutorResources = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorResources
);

export const selectIsAddingTutorResources = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsAddingTutorResources
);

export const selectIsDeletingResource = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsDeletingResource
);

export const selectTutorAssignment = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorAssignment
);

export const selectTutorActiveAssignments = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorActiveAssignments
);

export const selectTutorCompletedAssignments = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorCompletedAssignments
);

export const selectIsLoadingTutorAssignment = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorAssignment
);

export const selectTutorAssignments = createSelector(
  selectTutorState,
  fromTutorReducer.selectTutorAssignments
);

export const selectIsLoadingTutorAssignments = createSelector(
  selectTutorState,
  fromTutorReducer.selectIsLoadingTutorAssignments
);

// Student
export const selectStudentDashboard = createSelector(
  selectStudentState,
  fromStudentReducer.selectStudentDashboard
);

export const selectIsLoadingStudentDashboard = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingStudentDashboard
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

// Course
export const selectCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectCourses
);

export const selectCourseById = createSelector(
  selectCourseState,
  fromCourseReducer.selectCourseById
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
