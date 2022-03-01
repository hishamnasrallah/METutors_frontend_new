import { createReducer, on } from '@ngrx/store';

import * as tutorActions from '../actions/tutor.actions';

export interface State {
  tutors: [],
  isLoadingTutors: boolean,
  loadingTutorFailure: string,
}

export const initialState: State = {
  tutors: [],
  isLoadingTutors: false,
  loadingTutorFailure: '',
};

export const reducer = createReducer(
  initialState,
  on(tutorActions.loadTutors, state => ({
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
    loadingTutorFailure: error.message,
  })),

);

export const selectTutors = (state: State): any[] =>
  state.tutors;

export const selectIsLoadingTutors = (state: State): boolean =>
  state.isLoadingTutors;
