import { createReducer, on } from '@ngrx/store';
import * as profileModalActions from '../actions/profile-modal.actions';

export interface State {
  showViewDocumentModal: boolean;
  showTeacherAvailabilityModal: boolean;
}

export const initialState: State = {
  showViewDocumentModal: false,
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
  })),

  on(profileModalActions.openViewDocumentModal, (state) => ({
    ...state,
    showViewDocumentModal: true,
  })),

  on(profileModalActions.closeViewDocumentModal, (state) => ({
    ...state,
    showViewDocumentModal: false,
  }))
);

// Profile modal selectors

export const selectIsShowTeacherAvailabilityModal = (state: State): boolean =>
  state.showTeacherAvailabilityModal;

export const selectShowViewDocumentModal = (state: State): boolean =>
  state.showViewDocumentModal;
