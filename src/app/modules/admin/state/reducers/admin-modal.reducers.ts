import { createReducer, on } from '@ngrx/store';
import * as adminModalActions from '../actions/admin-modal.actions';

export interface State {
  showSendMeetingLinkModal: boolean;
}

export const initialState: State = {
  showSendMeetingLinkModal: false,
};

export const reducer = createReducer(
  initialState,

  on(adminModalActions.openAdminSendMeetingLinkModal, (state) => ({
    ...state,
    showSendMeetingLinkModal: true,
  })),

  on(adminModalActions.closeAdminSendMeetingLinkModal, (state) => ({
    ...state,
    showSendMeetingLinkModal: false,
  }))
);

// Admin modal selectors
export const selectIsSendMeetingLinkModal = (state: State): boolean =>
  state.showSendMeetingLinkModal;
