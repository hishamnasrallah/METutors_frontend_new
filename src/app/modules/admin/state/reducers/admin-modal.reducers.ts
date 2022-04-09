import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as adminModalActions from '../actions/admin-modal.actions';

export interface State {
  showAddNewFieldModal: boolean;
  showAddNewProgramModal: boolean;
  showSendMeetingLinkModal: boolean;
  showInterviewAttachmentModal: boolean;
  showHourlyRatePerSubjectModal: boolean;
}

export const initialState: State = {
  showAddNewFieldModal: false,
  showAddNewProgramModal: false,
  showSendMeetingLinkModal: false,
  showInterviewAttachmentModal: false,
  showHourlyRatePerSubjectModal: false,
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
  })),

  on(adminModalActions.openAdminHourlyRatePerSubjectModal, (state) => ({
    ...state,
    showHourlyRatePerSubjectModal: true,
  })),

  on(adminModalActions.closeAdminHourlyRatePerSubjectModal, (state) => ({
    ...state,
    showHourlyRatePerSubjectModal: false,
  })),

  on(adminModalActions.openAdminInterviewAttachmentModal, (state) => ({
    ...state,
    showInterviewAttachmentModal: true,
  })),

  on(adminModalActions.closeAdminInterviewAttachmentModal, (state) => ({
    ...state,
    showInterviewAttachmentModal: false,
  })),

  on(adminModalActions.openAdminAddNewProgramModal, (state) => ({
    ...state,
    showAddNewProgramModal: true,
  })),

  on(
    fromCore.addEditProgramSuccess,
    adminModalActions.closeAdminAddNewProgramModal,
    (state) => ({
      ...state,
      showAddNewProgramModal: false,
    })
  ),

  on(adminModalActions.openAdminAddNewFieldModal, (state) => ({
    ...state,
    showAddNewFieldModal: true,
  })),

  on(
    fromCore.addEditFieldSuccess,
    adminModalActions.closeAdminAddNewFieldModal,
    (state) => ({
      ...state,
      showAddNewFieldModal: false,
    })
  )
);

// Admin modal selectors
export const selectIsSendMeetingLinkModal = (state: State): boolean =>
  state.showSendMeetingLinkModal;

export const selectIsHourlyRatePerSubjectModal = (state: State): boolean =>
  state.showHourlyRatePerSubjectModal;

export const selectIsInterviewAttachmentModal = (state: State): boolean =>
  state.showInterviewAttachmentModal;

export const selectAddNewProgramModal = (state: State): boolean =>
  state.showAddNewProgramModal;

export const selectAddNewFieldModal = (state: State): boolean =>
  state.showAddNewFieldModal;
