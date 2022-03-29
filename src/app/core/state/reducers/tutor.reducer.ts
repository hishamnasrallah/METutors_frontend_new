import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as tutorActions from '../actions/tutor.actions';
import * as courseActions from '../actions/course.actions';

export interface State {
  dashboard: any;
  tutor: ITutor | null;
  isLoadingTutors: boolean;
  isLaunchingClass: boolean;
  isLoadingDashboard: boolean;
  loadingTutorFailure: string;

  // Complete Tutor Profile
  isCompleteTutorProfile: boolean;
  completeTutorProfileFailure: string;
}

export const initialState: State = {
  tutor: null,
  dashboard: null,
  isLoadingTutors: false,
  isLaunchingClass: false,
  loadingTutorFailure: '',
  isLoadingDashboard: false,
  isCompleteTutorProfile: false,
  completeTutorProfileFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutor, (state) => ({
    ...state,
    isLoadingTutors: true,
  })),

  on(tutorActions.loadTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutors: false,
  })),

  on(tutorActions.loadTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutors: false,
    loadingTutorFailure: error,
  })),

  on(tutorActions.loadTutorDashboard, (state) => ({
    ...state,
    isLoadingDashboard: true,
  })),

  on(tutorActions.loadTutorDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingDashboard: false,
  })),

  on(tutorActions.loadTutorDashboardFailure, (state, { error }) => ({
    ...state,
    isLoadingDashboard: false,
  })),

  on(tutorActions.loadTutorDashboardEnded, (state) => ({
    ...state,
    isLoadingDashboard: false,
  })),

  on(tutorActions.completeTutorProfile, (state) => ({
    ...state,
    isCompleteTutorProfile: true,
  })),

  on(tutorActions.completeTutorProfileSuccess, (state) => ({
    ...state,
    isCompleteTutorProfile: false,
  })),

  on(tutorActions.completeTutorProfileFailure, (state, { error }) => ({
    ...state,
    isCompleteTutorProfile: false,
    completeTutorProfileFailure: error,
  })),

  // On accept/reject course filter out rejected course
  on(
    courseActions.tutorAcceptCourseSuccess,
    courseActions.tutorRejectCourseSuccess,
    (state, { courseId }) => {
      let finalState = {
        ...state,
      };

      if (finalState?.dashboard?.newlyAssignedCourses) {
        const dashboard = {
          ...finalState.dashboard,
          newlyAssignedCourses:
            finalState.dashboard.newlyAssignedCourses.filter(
              (course: any) => course.id !== courseId
            ),
        };

        finalState = {
          ...finalState,
          dashboard,
        };
      }

      return finalState;
    }
  ),

  on(tutorActions.tutorLaunchClass, (state) => ({
    ...state,
    isLaunchingClass: true,
  })),

  on(tutorActions.tutorLaunchClassSuccess, (state) => ({
    ...state,
    isLaunchingClass: false,
  })),

  on(tutorActions.tutorLaunchClassFailure, (state) => ({
    ...state,
    isLaunchingClass: false,
  }))
);

export const selectTutor = (state: State): ITutor | null => state.tutor;

export const selectTutorDashboard = (state: State): boolean => state.dashboard;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsLoadingTutorDashboard = (state: State): boolean =>
  state.isLoadingDashboard;

export const selectIsCompleteTutorProfile = (state: State): boolean =>
  state.isCompleteTutorProfile;

export const selectIsLaunchingClass = (state: State): boolean =>
  state.isLaunchingClass;
