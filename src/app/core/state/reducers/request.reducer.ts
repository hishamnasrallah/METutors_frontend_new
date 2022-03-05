import { createReducer, on } from '@ngrx/store';

import { ITutor } from '@models';
import * as requestActions from '../actions/request.actions';

export interface State {
  // Estimated price
  estimatedPrice: number | null;
  isLoadingEstimatedPrice: boolean;
  loadingEstimatedPriceFailure?: string;

  // Generate tutors
  tutors: ITutor[] | null;
  isGeneratingTutors: boolean;
  loadingTutorFailure: string;

  // Create Class
  isCreateClass: boolean;
  createClassFailure: string;
}

export const initialState: State = {
  tutors: null,
  isCreateClass: false,
  estimatedPrice: null,
  createClassFailure: '',
  loadingTutorFailure: '',
  isGeneratingTutors: false,
  isLoadingEstimatedPrice: false,
};

export const reducer = createReducer(
  initialState,
  on(requestActions.calculateEstimatedPrice, (state) => ({
    ...state,
    isLoadingEstimatedPrice: true,
  })),

  on(
    requestActions.calculateEstimatedPriceSuccess,
    (state, { estimatedPrice }) => ({
      ...state,
      estimatedPrice,
      isLoadingEstimatedPrice: false,
    })
  ),

  on(requestActions.calculateEstimatedPriceFailure, (state, { error }) => ({
    ...state,
    isLoadingEstimatedPrice: false,
    loadingEstimatedPriceFailure: error.message,
  })),

  on(requestActions.generateTutors, (state) => ({
    ...state,
    isGeneratingTutors: true,
  })),

  on(requestActions.generateTutorsSuccess, (state, { tutors }) => ({
    ...state,
    tutors,
    isGeneratingTutors: false,
  })),

  on(requestActions.generateTutorsFailure, (state, { error }) => ({
    ...state,
    isGeneratingTutors: false,
    loadingTutorFailure: error.message,
  })),

  on(requestActions.createClass, (state) => ({
    ...state,
    isCreateClass: true,
  })),

  on(requestActions.createClassSuccess, (state) => ({
    ...state,
    isCreateClass: false,
  })),

  on(requestActions.createClassFailure, (state, { error }) => ({
    ...state,
    isCreateClass: false,
    createClassFailure: error.message,
  }))
);

export const selectGeneratingTutors = (state: State): ITutor[] | null =>
  state.tutors;

export const selectIsGeneratingTutors = (state: State): boolean =>
  state.isGeneratingTutors;

export const selectEstimatedPrice = (state: State): number | null =>
  state.estimatedPrice;

export const selectIsLoadingEstimatedPrice = (state: State): boolean =>
  state.isLoadingEstimatedPrice;

export const selectIsCreateClass = (state: State): boolean =>
  state.isCreateClass;
