import { createReducer, on } from '@ngrx/store';

import * as tutorActions from '../actions/student.actions';

export interface State {
  dashboard: any;
  classroom: any;
  isLoadingStudentDashboard: boolean;
  isLoadingStudentClassroom: boolean;
}

export const initialState: State = {
  dashboard: null,
  classroom: null,
  isLoadingStudentDashboard: false,
  isLoadingStudentClassroom: false,
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadStudentDashboard, (state) => ({
    ...state,
    isLoadingStudentDashboard: true,
  })),

  on(tutorActions.loadStudentDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    dashboard,
    isLoadingStudentDashboard: false,
  })),

  on(tutorActions.loadStudentDashboardFailure, (state) => ({
    ...state,
    isLoadingStudentDashboard: false,
  })),

  on(tutorActions.loadStudentDashboardEnded, (state) => ({
    ...state,
    isLoadingStudentDashboard: false,
  })),

  on(tutorActions.loadStudentClassroom, (state) => ({
    ...state,
    isLoadingStudentClassroom: true,
  })),

  on(tutorActions.loadStudentClassroomSuccess, (state, { classroom }) => ({
    ...state,
    classroom,
    isLoadingStudentClassroom: false,
  })),

  on(tutorActions.loadStudentClassroomFailure, (state) => ({
    ...state,
    isLoadingStudentClassroom: false,
  }))
);

export const selectStudentDashboard = (state: State): boolean =>
  state.dashboard;

export const selectIsLoadingStudentDashboard = (state: State): boolean =>
  state.isLoadingStudentDashboard;

export const selectActiveClassroomCourses = (state: State): any =>
  state.classroom?.activeCourses;

export const selectClassroomLastActivityCourse = (state: State): any =>
  state.classroom?.lastActivityCourse;

export const selectCompletedClassroomCourses = (state: State): any =>
  state?.classroom?.completedCourses;

export const selectClassroomCoursePrograms = (state: State): any =>
  state?.classroom?.programs;

export const selectClassroomCourseFieldOfStudies = (state: State): any =>
  state?.classroom?.fieldOfStudies;

export const selectIsLoadingStudentClassroom = (state: State): boolean =>
  state.isLoadingStudentClassroom;
