import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as publicModalActions from '../actions/public-modal.actions';

export interface State {
  showRequestCourseModal: boolean;
  showViewSubjectDetailsModal: boolean;
}

export const initialState: State = {
  showRequestCourseModal: false,
  showViewSubjectDetailsModal: false,
};

export const reducer = createReducer(
  initialState,

  on(publicModalActions.openRequestCourseModal, (state) => ({
    ...state,
    showRequestCourseModal: true,
  })),

  on(
    fromCore.requestCourseSuccess,
    publicModalActions.closeRequestCourseModal,
    (state) => ({
      ...state,
      showRequestCourseModal: false,
    })
  ),

  on(publicModalActions.openViewSubjectDetailsModal, (state) => ({
    ...state,
    showViewSubjectDetailsModal: true,
  })),

  on(publicModalActions.closeViewSubjectDetailsModal, (state) => ({
    ...state,
    showViewSubjectDetailsModal: false,
  }))
);

// Public modal selectors
export const selectShowRequestCourseModal = (state: State): boolean =>
  state.showRequestCourseModal;

export const selectShowViewSubjectDetailsModal = (state: State): boolean =>
  state.showViewSubjectDetailsModal;
