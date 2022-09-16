import {
  Action,
  createSelector,
  combineReducers,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromRoot from '@metutor/state';

import * as featureKeys from './feature-keys';
import * as fromAdminModal from './reducers/admin-modal.reducers';

export interface AdminState {
  [featureKeys.adminModalFeatureKey]: fromAdminModal.State;
}

// Extends the app state to include the admin feature.
// This is required because admin feature is lazy loaded.
// So the reference to State cannot be added to root state directly.
export interface State extends fromRoot.State {
  [featureKeys.adminFeatureKey]: AdminState;
}

/** Provide reducer in AoT-compilation happy way */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function reducers(state: AdminState, action: Action): any {
  return combineReducers({
    [featureKeys.adminModalFeatureKey]: fromAdminModal.reducer,
  })(state, action);
}

// Admin Selectors
export const selectAdminState = createFeatureSelector<State, AdminState>(
  featureKeys.adminFeatureKey
);

export const selectAdminModalState = createSelector(
  selectAdminState,
  (state) => state[featureKeys.adminModalFeatureKey]
);

// Admin modal selectors
export const selectShowModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectShowModal
);

export const selectIsSendMeetingLinkModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsSendMeetingLinkModal
);

export const selectIsHourlyRatePerSubjectModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsHourlyRatePerSubjectModal
);

export const selectIsDeclineInterviewModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsDeclineInterviewModal
);

export const selectIsInterviewAttachmentModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsInterviewAttachmentModal
);

export const selectAddNewProgramModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAddNewProgramModal
);

export const selectAddNewFieldModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAddNewFieldModal
);

export const selectAddNewSubjectModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAddNewSubjectModal
);

export const selectAddNewCountryModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAddNewCountryModal
);

export const selectScheduleInterviewModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectScheduleInterviewModal
);

export const selectCourseBookingListModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectCourseBookingListModal
);

export const selectShowAdminTutorsListModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectShowAdminTutorsListModal
);

export const selectStudentsFeedbackModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectStudentsFeedbackModal
);

export const selectPreviousTeacherModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectPreviousTeacherModal
);

export const selectReassigningTutorSelectionModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectReassigningTutorSelectionModal
);

export const selectIsChangeStatusModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsChangeStatusModal
);

export const selectAdminStudentBookingModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAdminStudentBookingModal
);

export const selectAdminStudentViewAssignmentsModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAdminStudentViewAssignmentsModal
);

export const selectAdminStudentViewFeedbackModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAdminStudentViewFeedbackModal
);

export const selectAdminEditFeedbackModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAdminEditFeedbackModal
);

export const selectAdminRequestCourseDetailsModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectAdminRequestCourseDetailsModal
);

export const selectIsShowTeacherAvailabilityModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectIsShowTeacherAvailabilityModal
);

export const selectShowRefundDetailModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectShowRefundDetailModal
);

export const selectShowRefundPaymentModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectShowRefundPaymentModal
);

export const selectShowSuccessModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectShowSuccessModal
);

export const selectShowViewRejectionReasonModal = createSelector(
  selectAdminModalState,
  fromAdminModal.selectShowViewRejectionReasonModal
);
