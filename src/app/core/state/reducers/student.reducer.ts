import { createReducer, on } from '@ngrx/store';

import * as tutorActions from '../actions/student.actions';

export interface State {
  dashboard: any;
  isLoadingStudentDashboard: boolean;
}

export const initialState: State = {
  dashboard: null,
  isLoadingStudentDashboard: false,
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
  }))
);

export const selectStudentDashboard = (state: State): boolean =>
  state.dashboard;

export const selectIsLoadingStudentDashboard = (state: State): boolean =>
  state.isLoadingStudentDashboard;
