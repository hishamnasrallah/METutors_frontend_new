import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as adminModalActions from '../actions/admin-modal.actions';

export interface State {
  showAddNewFieldModal: boolean;
  showAddNewSubjectModal: boolean;
  showAddNewProgramModal: boolean;
  showAddNewCountryModal: boolean;
  showSendMeetingLinkModal: boolean;
  showDeclineInterviewModal: boolean;
  showScheduleInterviewModal: boolean;
  showInterviewAttachmentModal: boolean;
  showHourlyRatePerSubjectModal: boolean;
}

export const initialState: State = {
  showAddNewFieldModal: false,
  showAddNewSubjectModal: false,
  showAddNewProgramModal: false,
  showAddNewCountryModal: false,
  showSendMeetingLinkModal: false,
  showDeclineInterviewModal: false,
  showScheduleInterviewModal: false,
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

  on(
    fromCore.acceptInterviewRequestSuccess,
    adminModalActions.closeAdminHourlyRatePerSubjectModal,
    (state) => ({
      ...state,
      showHourlyRatePerSubjectModal: false,
    })
  ),

  on(adminModalActions.openAdminDeclineInterviewModal, (state) => ({
    ...state,
    showDeclineInterviewModal: true,
  })),

  on(
    fromCore.declineInterviewRequestSuccess,
    adminModalActions.closeAdminDeclineInterviewModal,
    (state) => ({
      ...state,
      showDeclineInterviewModal: false,
    })
  ),

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
  ),

  on(adminModalActions.openAdminAddNewSubjectModal, (state) => ({
    ...state,
    showAddNewSubjectModal: true,
  })),

  on(
    fromCore.addEditSubjectSuccess,
    adminModalActions.closeAdminAddNewSubjectModal,
    (state) => ({
      ...state,
      showAddNewSubjectModal: false,
    })
  ),

  on(adminModalActions.openAdminAddNewCountryModal, (state) => ({
    ...state,
    showAddNewCountryModal: true,
  })),

  on(
    fromCore.addEditProgramCountriesSuccess,
    adminModalActions.closeAdminAddNewCountryModal,
    (state) => ({
      ...state,
      showAddNewCountryModal: false,
    })
  ),

  on(adminModalActions.openAdminScheduleInterviewModal, (state) => ({
    ...state,
    showScheduleInterviewModal: true,
  })),

  on(
    fromCore.scheduleInterviewRequestSuccess,
    adminModalActions.closeAdminScheduleInterviewModal,
    (state) => ({
      ...state,
      showScheduleInterviewModal: false,
    })
  )
);

// Admin modal selectors
export const selectIsSendMeetingLinkModal = (state: State): boolean =>
  state.showSendMeetingLinkModal;

export const selectIsHourlyRatePerSubjectModal = (state: State): boolean =>
  state.showHourlyRatePerSubjectModal;

export const selectIsDeclineInterviewModal = (state: State): boolean =>
  state.showDeclineInterviewModal;

export const selectIsInterviewAttachmentModal = (state: State): boolean =>
  state.showInterviewAttachmentModal;

export const selectAddNewProgramModal = (state: State): boolean =>
  state.showAddNewProgramModal;

export const selectAddNewFieldModal = (state: State): boolean =>
  state.showAddNewFieldModal;

export const selectAddNewSubjectModal = (state: State): boolean =>
  state.showAddNewSubjectModal;

export const selectAddNewCountryModal = (state: State): boolean =>
  state.showAddNewCountryModal;

export const selectScheduleInterviewModal = (state: State): boolean =>
  state.showScheduleInterviewModal;
