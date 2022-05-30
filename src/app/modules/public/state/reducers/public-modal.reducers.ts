import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as publicModalActions from '../actions/public-modal.actions';

export interface State {
  showRequestCourseModal: boolean;
}

export const initialState: State = {
  showRequestCourseModal: false,
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
  )
);

// public modal selectors
export const selectShowRequestCourseModal = (state: State): boolean =>
  state.showRequestCourseModal;
