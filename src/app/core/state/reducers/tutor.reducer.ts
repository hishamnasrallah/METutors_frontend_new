import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as tutorActions from '../actions/tutor.actions';

export interface State {
  tutor: ITutor | null;
  isLoadingTutors: boolean;
  loadingTutorFailure: string;
}

export const initialState: State = {
  tutor: null,
  isLoadingTutors: false,
  loadingTutorFailure: '',
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
    loadingTutorFailure: error.message,
  }))
);

export const selectTutor = (state: State): ITutor | null => state.tutor;

export const selectIsLoadingTutor = (state: State): boolean =>
  state.isLoadingTutors;
