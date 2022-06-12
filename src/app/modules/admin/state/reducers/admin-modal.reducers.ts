import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as adminModalActions from '../actions/admin-modal.actions';

export interface State {
  showAddNewFieldModal: boolean;
  showChangeStatusModal: boolean;
  showEditFeedbackModal: boolean;
  showAddNewSubjectModal: boolean;
  showAddNewProgramModal: boolean;
  showAddNewCountryModal: boolean;
  showAdminTutorsListModal: boolean;
  showSendMeetingLinkModal: boolean;
  showPreviousTeacherModal: boolean;
  showDeclineInterviewModal: boolean;
  showStudentsFeedbackModal: boolean;
  showScheduleInterviewModal: boolean;
  showCourseBookingListModal: boolean;
  showAdminCancelCourseModal: boolean;
  showInterviewAttachmentModal: boolean;
  showTeacherAvailabilityModal: boolean;
  showAdminStudentBookingModal: boolean;
  showRequestCourseDetailsModal: boolean;
  showHourlyRatePerSubjectModal: boolean;
  showAdminStudentFeedbackModal: boolean;
  showAdminStudentAssignmentModal: boolean;
  showReassigningTutorSelectionModal: boolean;
}

export const initialState: State = {
  showAddNewFieldModal: false,
  showEditFeedbackModal: false,
  showChangeStatusModal: false,
  showAddNewSubjectModal: false,
  showAddNewProgramModal: false,
  showAddNewCountryModal: false,
  showAdminTutorsListModal: false,
  showSendMeetingLinkModal: false,
  showPreviousTeacherModal: false,
  showStudentsFeedbackModal: false,
  showDeclineInterviewModal: false,
  showAdminCancelCourseModal: false,
  showScheduleInterviewModal: false,
  showCourseBookingListModal: false,
  showTeacherAvailabilityModal: false,
  showAdminStudentBookingModal: false,
  showInterviewAttachmentModal: false,
  showAdminStudentFeedbackModal: false,
  showRequestCourseDetailsModal: false,
  showHourlyRatePerSubjectModal: false,
  showAdminStudentAssignmentModal: false,
  showReassigningTutorSelectionModal: false,
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

  on(adminModalActions.openAdminTutorListModal, (state) => ({
    ...state,
    showAdminTutorsListModal: true,
  })),

  on(adminModalActions.closeAdminTutorListModal, (state) => ({
    ...state,
    showAdminTutorsListModal: false,
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

  on(
    fromCore.adminRejectDocumentSuccess,
    fromCore.adminApproveDocumentSuccess,
    adminModalActions.closeAdminInterviewAttachmentModal,
    (state) => ({
      ...state,
      showInterviewAttachmentModal: false,
    })
  ),

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
  ),

  on(adminModalActions.openAdminCourseBookingListModal, (state) => ({
    ...state,
    showCourseBookingListModal: true,
  })),

  on(adminModalActions.closeAdminCourseBookingListModal, (state) => ({
    ...state,
    showCourseBookingListModal: false,
  })),

  on(adminModalActions.openAdminStudentsFeedbackModal, (state) => ({
    ...state,
    showStudentsFeedbackModal: true,
  })),

  on(adminModalActions.closeAdminStudentsFeedbackModal, (state) => ({
    ...state,
    showStudentsFeedbackModal: false,
  })),

  on(adminModalActions.openAdminPreviousTeacherModal, (state) => ({
    ...state,
    showPreviousTeacherModal: true,
  })),

  on(adminModalActions.closeAdminPreviousTeacherModal, (state) => ({
    ...state,
    showPreviousTeacherModal: false,
  })),

  on(adminModalActions.openAdminReassigningTutorSelectionModal, (state) => ({
    ...state,
    showReassigningTutorSelectionModal: true,
  })),

  on(
    fromCore.studentReassignTutorSuccess,
    adminModalActions.closeAdminReassigningTutorSelectionModal,
    (state) => ({
      ...state,
      showReassigningTutorSelectionModal: false,
    })
  ),

  on(adminModalActions.openAdminChangeStatusModal, (state) => ({
    ...state,
    showChangeStatusModal: true,
  })),

  on(
    fromCore.changeTutorStatusSuccess,
    fromCore.changeTicketStatusSuccess,
    fromCore.adminEditTestimonialStatusSuccess,
    adminModalActions.closeAdminChangeStatusModal,
    (state) => ({
      ...state,
      showChangeStatusModal: false,
    })
  ),

  on(adminModalActions.openAdminStudentBookingModal, (state) => ({
    ...state,
    showAdminStudentBookingModal: true,
  })),

  on(adminModalActions.closeAdminStudentBookingModal, (state) => ({
    ...state,
    showAdminStudentBookingModal: false,
  })),

  on(adminModalActions.openAdminStudentViewAssignmentsModal, (state) => ({
    ...state,
    showAdminStudentAssignmentModal: true,
  })),

  on(adminModalActions.closeAdminStudentViewAssignmentsModal, (state) => ({
    ...state,
    showAdminStudentAssignmentModal: false,
  })),

  on(adminModalActions.openAdminStudentViewFeedbackModal, (state) => ({
    ...state,
    showAdminStudentFeedbackModal: true,
  })),

  on(adminModalActions.closeAdminStudentViewFeedbackModal, (state) => ({
    ...state,
    showAdminStudentFeedbackModal: false,
  })),

  on(adminModalActions.openAdminEditFeedbackModal, (state) => ({
    ...state,
    showEditFeedbackModal: true,
  })),

  on(
    fromCore.adminEditTestimonialFeedbackSuccess,
    adminModalActions.closeAdminEditFeedbackModal,
    (state) => ({
      ...state,
      showEditFeedbackModal: false,
    })
  ),

  on(adminModalActions.openAdminRequestCourseDetailsModal, (state) => ({
    ...state,
    showRequestCourseDetailsModal: true,
  })),

  on(adminModalActions.closeAdminRequestCourseDetailsModal, (state) => ({
    ...state,
    showRequestCourseDetailsModal: false,
  })),

  on(adminModalActions.openAdminTeacherAvailabilityModal, (state) => ({
    ...state,
    showTeacherAvailabilityModal: true,
  })),

  on(adminModalActions.closeAdminTeacherAvailabilityModal, (state) => ({
    ...state,
    showTeacherAvailabilityModal: false,
  })),

  on(adminModalActions.openAdminCancelCourseModal, (state) => ({
    ...state,
    showAdminCancelCourseModal: true,
  })),

  on(adminModalActions.closeAdminCancelCourseModal, (state) => ({
    ...state,
    showAdminCancelCourseModal: false,
  }))
);

// Admin modal selectors
export const selectIsSendMeetingLinkModal = (state: State): boolean =>
  state.showSendMeetingLinkModal;

export const selectShowAdminTutorsListModal = (state: State): boolean =>
  state.showAdminTutorsListModal;

export const selectStudentsFeedbackModal = (state: State): boolean =>
  state.showStudentsFeedbackModal;

export const selectPreviousTeacherModal = (state: State): boolean =>
  state.showPreviousTeacherModal;

export const selectReassigningTutorSelectionModal = (state: State): boolean =>
  state.showReassigningTutorSelectionModal;

export const selectIsChangeStatusModal = (state: State): boolean =>
  state.showChangeStatusModal;

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

export const selectCourseBookingListModal = (state: State): boolean =>
  state.showCourseBookingListModal;

export const selectAdminStudentBookingModal = (state: State): boolean =>
  state.showAdminStudentBookingModal;

export const selectAdminStudentViewAssignmentsModal = (state: State): boolean =>
  state.showAdminStudentAssignmentModal;

export const selectAdminStudentViewFeedbackModal = (state: State): boolean =>
  state.showAdminStudentFeedbackModal;

export const selectAdminEditFeedbackModal = (state: State): boolean =>
  state.showEditFeedbackModal;

export const selectAdminRequestCourseDetailsModal = (state: State): boolean =>
  state.showRequestCourseDetailsModal;

export const selectIsShowTeacherAvailabilityModal = (state: State): boolean =>
  state.showTeacherAvailabilityModal;

export const selectShowCancelCourseModal = (state: State): boolean =>
  state.showAdminCancelCourseModal;
