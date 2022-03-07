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
import * as fromRequestReducer from './reducers/request.reducer';
import * as fromLookupsReducer from './reducers/lookups.reducer';
import * as fromStudentReducer from './reducers/student.reducer';

export interface CoreState {
  [featureKeys.userFeatureKey]: fromUserReducer.State;
  [featureKeys.tutorFeatureKey]: fromTutorReducer.State;
  [featureKeys.courseFeatureKey]: fromCourseReducer.State;
  [featureKeys.requestFeatureKey]: fromRequestReducer.State;
  [featureKeys.lookupsFeatureKey]: fromLookupsReducer.State;
  [featureKeys.studentFeatureKey]: fromStudentReducer.State;
}

export function reducers(state: CoreState, action: Action) {
  return combineReducers({
    [featureKeys.userFeatureKey]: fromUserReducer.reducer,
    [featureKeys.tutorFeatureKey]: fromTutorReducer.reducer,
    [featureKeys.courseFeatureKey]: fromCourseReducer.reducer,
    [featureKeys.requestFeatureKey]: fromRequestReducer.reducer,
    [featureKeys.lookupsFeatureKey]: fromLookupsReducer.reducer,
    [featureKeys.studentFeatureKey]: fromStudentReducer.reducer,
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

// User
export const selectIsSignIn = createSelector(
  selectUserState,
  fromUserReducer.selectIsSignIn
);

export const selectToken = createSelector(
  selectUserState,
  fromUserReducer.selectToken
);

export const selectProfileStep = createSelector(
  selectUserState,
  fromUserReducer.selectProfileStep
);

export const selectUser = createSelector(
  selectUserState,
  fromUserReducer.selectUser
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

// Student
export const selectTickets = createSelector(
  selectStudentState,
  fromStudentReducer.selectTickets
);

export const selectIsLoadingTickets = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingTickets
);

export const selectTicket = createSelector(
  selectStudentState,
  fromStudentReducer.selectTicket
);

export const selectIsLoadingTicket = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsLoadingTicket
);

export const selectIsCreatingTicket = createSelector(
  selectStudentState,
  fromStudentReducer.selectIsCreatingTicket
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

export const selectCompletedCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectCompletedCourses
);

export const selectIsLoadingCourses = createSelector(
  selectCourseState,
  fromCourseReducer.selectIsLoadingCourses
);
