import { createReducer, on } from '@ngrx/store';
import * as profileModalActions from '../actions/profile-modal.actions';

export interface State {
  showTeacherAvailabilityModal: boolean;
}

export const initialState: State = {
  showTeacherAvailabilityModal: false,
};

export const reducer = createReducer(
  initialState,

  on(profileModalActions.openTeacherAvailabilityModal, (state) => ({
    ...state,
    showTeacherAvailabilityModal: true,
  })),

  on(profileModalActions.closeTeacherAvailabilityModal, (state) => ({
    ...state,
    showTeacherAvailabilityModal: false,
  }))
);

// Profile modal selectors

export const selectIsShowTeacherAvailabilityModal = (state: State): boolean =>
  state.showTeacherAvailabilityModal;
