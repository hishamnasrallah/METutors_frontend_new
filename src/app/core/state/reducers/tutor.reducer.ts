import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as tutorActions from '../actions/tutor.actions';
import * as courseActions from '../actions/course.actions';

export interface State {
  dashboard: any;
  attendance: any;
  tutor: ITutor | null;
  tutors: ITutor[] | null;
  isLoadingTutor: boolean;
  isLoadingTutors: boolean;
  isLaunchingClass: boolean;
  isLoadingDashboard: boolean;
  loadingTutorFailure: string;
  loadingTutorsFailure: string;
  isLoadingTutorAttendance: boolean;

  // Complete Tutor Profile
  isCompleteTutorProfile: boolean;
  completeTutorProfileFailure: string;
}

export const initialState: State = {
  tutor: null,
  tutors: null,
  dashboard: null,
  attendance: null,
  isLoadingTutor: false,
  isLoadingTutors: false,
  isLaunchingClass: false,
  loadingTutorFailure: '',
  loadingTutorsFailure: '',
  isLoadingDashboard: false,
  isCompleteTutorProfile: false,
  isLoadingTutorAttendance: false,
  completeTutorProfileFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutor, (state) => ({
    ...state,
    isLoadingTutor: true,
  })),

  on(tutorActions.loadTutorSuccess, (state, { tutor }) => ({
    ...state,
    tutor,
    isLoadingTutor: false,
  })),

  on(tutorActions.loadTutorFailure, (state, { error }) => ({
    ...state,
    isLoadingTutor: false,
    loadingTutorFailure: error,
  })),

  on(tutorActions.loadTutors, (state) => ({
    ...state,
    isLoadingTutors: true,
  })),

  on(tutorActions.loadTutorsSuccess, (state, { tutors }) => ({
    ...state,
    tutors,
    isLoadingTutors: false,
  })),

  on(tutorActions.loadTutorsFailure, (state, { error }) => ({
    ...state,
    isLoadingTutors: false,
    loadingTutorsFailure: error,
  })),

  on(tutorActions.loadTutorsEnded, (state) => ({
    ...state,
    isLoadingTutors: false,
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
  })),

  on(tutorActions.loadTutorAttendance, (state) => ({
    ...state,
    isLoadingTutorAttendance: true,
  })),

  on(tutorActions.loadTutorAttendanceSuccess, (state, { attendance }) => ({
    ...state,
    attendance,
    isLoadingTutorAttendance: false,
  })),

  on(tutorActions.loadTutorAttendanceFailure, (state) => ({
    ...state,
    isLoadingTutorAttendance: false,
  })),

  on(tutorActions.loadTutorAttendanceEnded, (state) => ({
    ...state,
    isLoadingTutorAttendance: false,
  }))
);

export const selectTutor = (state: State): ITutor | null => state.tutor;

export const selectTutorDashboard = (state: State): boolean => state.dashboard;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutor;

export const selectTutors = (state: State): ITutor[] | null => state.tutors;

export const selectIsLoadingTutors = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsLoadingTutorDashboard = (state: State): boolean =>
  state.isLoadingDashboard;

export const selectIsCompleteTutorProfile = (state: State): boolean =>
  state.isCompleteTutorProfile;

export const selectIsLaunchingClass = (state: State): boolean =>
  state.isLaunchingClass;

export const selectTutorAttendance = (state: State): any => state.attendance;

export const selectIsLoadingTutorAttendance = (state: State): boolean =>
  state.isLoadingTutorAttendance;

export const selectFilteredTutors = (
  state: State,
  props?: any
): ITutor[] | null => {
  let tutors: ITutor[] = [];

  if (state.tutors && state.tutors.length && props) {
    tutors = getFilteredTutors(state.tutors, props);
  }

  return tutors;
};

const getFilteredTutors = (tutors: ITutor[], props: any) => {
  if (props?.name) {
    tutors = tutors?.filter((tutor) =>
      tutor?.name?.toLowerCase()?.includes(props.name.toLowerCase())
    );
  }

  return tutors;
};
