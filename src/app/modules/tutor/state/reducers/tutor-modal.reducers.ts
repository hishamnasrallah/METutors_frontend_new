import { createReducer, on } from '@ngrx/store';

import * as fromCore from '@metutor/core/state';
import * as tutorModalActions from '../actions/tutor-modal.actions';

export interface State {
  params: any;
  showDisputeModal: boolean;
  showConfirmModal: boolean;
  showAddTopicModal: boolean;
  showKudosPointsModal: boolean;
  showRejectCourseModal: boolean;
  showCancelCourseModal: boolean;
  showSendFeedbackModal: boolean;
  showAddAssignmentModal: boolean;
  showConfirmPaymentModal: boolean;
  showDisputePaymentModal: boolean;
  showViewAssignmentModal: boolean;
  acceptRejectModalHeading: string;
  showUploadDocumentModal: boolean;
  showPaymentSuccessModal: boolean;
  showRescheduleClassModal: boolean;
  showSubmitInterviewModal: boolean;
  showCourseAttendanceModal: boolean;
  showAddClassResourceModal: boolean;
  showAssignmentDetailsModal: boolean;
  showAcceptRejectAssignmentModal: boolean;
}

export const initialState: State = {
  params: null,
  showDisputeModal: false,
  showConfirmModal: false,
  showAddTopicModal: false,
  showKudosPointsModal: false,
  acceptRejectModalHeading: '',
  showRejectCourseModal: false,
  showCancelCourseModal: false,
  showSendFeedbackModal: false,
  showAddAssignmentModal: false,
  showConfirmPaymentModal: false,
  showUploadDocumentModal: false,
  showViewAssignmentModal: false,
  showDisputePaymentModal: false,
  showPaymentSuccessModal: false,
  showRescheduleClassModal: false,
  showSubmitInterviewModal: false,
  showCourseAttendanceModal: false,
  showAddClassResourceModal: false,
  showAssignmentDetailsModal: false,
  showAcceptRejectAssignmentModal: false,
};

export const reducer = createReducer(
  initialState,

  on(tutorModalActions.openTutorConfirmModal, (state) => ({
    ...state,
    showConfirmModal: true,
  })),

  on(
    fromCore.deleteTutorResourceSuccess,
    tutorModalActions.closeTutorConfirmModal,
    (state) => ({
      ...state,
      showConfirmModal: false,
    })
  ),

  on(tutorModalActions.openTutorRejectCourseModal, (state) => ({
    ...state,
    showRejectCourseModal: true,
  })),

  on(
    fromCore.tutorRejectCourseSuccess,
    tutorModalActions.closeTutorRejectCourseModal,
    (state) => ({
      ...state,
      showRejectCourseModal: false,
    })
  ),

  on(tutorModalActions.openTutorCancelCourseModal, (state) => ({
    ...state,
    showCancelCourseModal: true,
  })),

  on(
    fromCore.tutorCancelCourseSuccess,
    tutorModalActions.closeTutorCancelCourseModal,
    (state) => ({
      ...state,
      showCancelCourseModal: false,
    })
  ),

  on(
    tutorModalActions.openTutorSendFeedbackModal,
    tutorModalActions.openTutorSendPlatformFeedbackModal,
    (state) => ({
      ...state,
      showSendFeedbackModal: true,
    })
  ),

  on(
    fromCore.tutorSubmitFeedbackSuccess,
    fromCore.tutorSubmitPlatformFeedbackSuccess,
    tutorModalActions.closeTutorSendFeedbackModal,
    tutorModalActions.closeTutorSendPlatformFeedbackModal,
    (state) => ({
      ...state,
      showSendFeedbackModal: false,
    })
  ),

  on(tutorModalActions.openTutorCourseAttendanceModal, (state) => ({
    ...state,
    showCourseAttendanceModal: true,
  })),

  on(tutorModalActions.closeTutorCourseAttendanceModal, (state) => ({
    ...state,
    showCourseAttendanceModal: false,
  })),

  on(
    tutorModalActions.openTutorAddClassResourceModal,
    tutorModalActions.openTutorEditClassResourceModal,
    (state) => ({
      ...state,
      showAddClassResourceModal: true,
    })
  ),

  on(
    fromCore.addTutorResourceSuccess,
    fromCore.editTutorResourceSuccess,
    fromCore.deleteTutorResourceSuccess,
    tutorModalActions.closeTutorAddClassResourceModal,
    (state) => ({
      ...state,
      showAddClassResourceModal: false,
    })
  ),

  on(
    tutorModalActions.openTutorAddAssignmentModal,
    tutorModalActions.openTutorEditAssignmentModal,
    (state) => ({
      ...state,
      showAddAssignmentModal: true,
      showAssignmentDetailsModal: false,
    })
  ),

  on(
    fromCore.tutorAddAssignmentSuccess,
    fromCore.tutorEditAssignmentSuccess,
    tutorModalActions.closeTutorAddAssignmentModal,
    tutorModalActions.closeTutorEditAssignmentModal,
    (state) => ({
      ...state,
      showAddAssignmentModal: false,
    })
  ),

  on(tutorModalActions.openTutorAssignmentDetailsModal, (state) => ({
    ...state,
    showAssignmentDetailsModal: true,
  })),

  on(
    fromCore.deleteTutorAssignmentSuccess,
    tutorModalActions.closeTutorAssignmentDetailsModal,
    (state) => ({
      ...state,
      showAssignmentDetailsModal: false,
    })
  ),

  on(tutorModalActions.openTutorAddTopicModal, (state) => ({
    ...state,
    showAddTopicModal: true,
  })),

  on(
    fromCore.tutorAddSyllabusTopicSuccess,
    fromCore.tutorEditSyllabusTopicSuccess,
    fromCore.tutorDeleteSyllabusTopicSuccess,
    tutorModalActions.closeTutorAddTopicModal,
    (state) => ({
      ...state,
      showAddTopicModal: false,
    })
  ),

  on(tutorModalActions.openTutorViewStudentAssignmentModal, (state) => ({
    ...state,
    showViewAssignmentModal: true,
  })),

  on(tutorModalActions.closeTutorViewStudentAssignmentModal, (state) => ({
    ...state,
    showViewAssignmentModal: false,
  })),

  on(tutorModalActions.openAcceptRejectAssignmentModal, (state) => ({
    ...state,
    showViewAssignmentModal: false,
    showAcceptRejectAssignmentModal: true,
  })),

  on(
    fromCore.tutorRejectAssignmentSuccess,
    fromCore.tutorAcceptAssignmentSuccess,
    tutorModalActions.closeAcceptRejectAssignmentModal,
    (state) => ({
      ...state,
      showAcceptRejectAssignmentModal: false,
    })
  ),

  on(tutorModalActions.setTutorStateParams, (state, { params }) => ({
    ...state,
    params,
  })),

  on(tutorModalActions.openTutorSubmitInterviewModal, (state) => ({
    ...state,
    showSubmitInterviewModal: true,
  })),

  on(
    fromCore.submitInterviewSuccess,
    tutorModalActions.closeTutorSubmitInterviewModal,
    (state) => ({
      ...state,
      showSubmitInterviewModal: false,
    })
  ),

  on(tutorModalActions.openTutorRescheduleClassModal, (state) => ({
    ...state,
    showRescheduleClassModal: true,
  })),

  on(
    fromCore.tutorRescheduleClassSuccess,
    tutorModalActions.closeTutorRescheduleClassModal,
    (state) => ({
      ...state,
      showRescheduleClassModal: false,
    })
  ),

  on(tutorModalActions.openKudosPointsModal, (state) => ({
    ...state,
    showKudosPointsModal: true,
  })),

  on(tutorModalActions.closeKudosPointsModal, (state) => ({
    ...state,
    showKudosPointsModal: false,
  })),

  on(tutorModalActions.openResourcesUploadDocumentModal, (state) => ({
    ...state,
    showUploadDocumentModal: true,
  })),

  on(
    fromCore.uploadTutorResourceDocumentSuccess,
    tutorModalActions.closeResourcesUploadDocumentModal,
    (state) => ({
      ...state,
      showUploadDocumentModal: false,
    })
  ),

  on(tutorModalActions.openDisputePaymentModal, (state) => ({
    ...state,
    showDisputePaymentModal: true,
  })),

  on(tutorModalActions.closeDisputePaymentModal, (state) => ({
    ...state,
    showDisputePaymentModal: false,
  })),

  on(tutorModalActions.openConfirmPaymentModal, (state) => ({
    ...state,
    showConfirmPaymentModal: true,
  })),

  on(tutorModalActions.closeConfirmPaymentModal, (state) => ({
    ...state,
    showConfirmPaymentModal: false,
  })),

  on(tutorModalActions.openDisputeModal, (state) => ({
    ...state,
    showDisputeModal: true,
  })),

  on(tutorModalActions.closeDisputeModal, (state) => ({
    ...state,
    showDisputeModal: false,
  })),

  on(fromCore.tutorCreateDisputeSuccess, (state) => ({
    ...state,
    showDisputeModal: false,
    showPaymentSuccessModal: true,
  })),

  on(tutorModalActions.closePaymentSuccessModal, (state) => ({
    ...state,
    showPaymentSuccessModal: false,
  }))
);

// tutor modal selectors
export const selectTutorConfirmModal = (state: State): boolean =>
  state.showConfirmModal;

export const selectAddTopicModal = (state: State): boolean =>
  state.showAddTopicModal;

export const selectRejectCourseModal = (state: State): boolean =>
  state.showRejectCourseModal;

export const selectCancelCourseModal = (state: State): boolean =>
  state.showCancelCourseModal;

export const selectSendFeedbackModal = (state: State): boolean =>
  state.showSendFeedbackModal;

export const selectCourseAttendanceModal = (state: State): boolean =>
  state.showCourseAttendanceModal;

export const selectAddClassResourceModal = (state: State): boolean =>
  state.showAddClassResourceModal;

export const selectAddAssignmentModal = (state: State): boolean =>
  state.showAddAssignmentModal;

export const selectAssignmentDetailsModal = (state: State): boolean =>
  state.showAssignmentDetailsModal;

export const selectViewAssignmentModal = (state: State): boolean =>
  state.showViewAssignmentModal;

export const selectAcceptRejectAssignmentModal = (state: State): boolean =>
  state.showAcceptRejectAssignmentModal;

export const selectTutorStateParams = (state: State): any => state.params;

export const selectSubmitInterviewModal = (state: State): boolean =>
  state.showSubmitInterviewModal;

export const selectRescheduleClassModal = (state: State): boolean =>
  state.showRescheduleClassModal;

export const selectKudosPointsModal = (state: State): boolean =>
  state.showKudosPointsModal;

export const selectUploadDocumentModal = (state: State): boolean =>
  state.showUploadDocumentModal;

export const selectConfirmPaymentModal = (state: State): boolean =>
  state.showConfirmPaymentModal;

export const selectDisputePaymentModal = (state: State): boolean =>
  state.showDisputePaymentModal;

export const selectDisputeModal = (state: State): boolean =>
  state.showDisputeModal;

export const selectPaymentSuccessModal = (state: State): boolean =>
  state.showPaymentSuccessModal;
