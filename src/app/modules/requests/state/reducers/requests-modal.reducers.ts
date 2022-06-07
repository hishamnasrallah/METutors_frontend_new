import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as requestsModalActions from '../actions/requests-modal.actions';

export interface State {
  showConfirmPaymentModal: boolean;
  showTeacherAvailabilityModal: boolean;
  showChangeCourseScheduleModal: boolean;
}

export const initialState: State = {
  showConfirmPaymentModal: false,
  showTeacherAvailabilityModal: false,
  showChangeCourseScheduleModal: false,
};

export const reducer = createReducer(
  initialState,

  on(requestsModalActions.openRequestsConfirmPaymentModal, (state) => ({
    ...state,
    showConfirmPaymentModal: true,
  })),

  on(
    fromCore.createPaidClassSuccess,
    requestsModalActions.closeRequestsConfirmPaymentModal,
    (state) => ({
      ...state,
      showConfirmPaymentModal: false,
    })
  ),

  on(requestsModalActions.openTeacherAvailabilityModal, (state) => ({
    ...state,
    showTeacherAvailabilityModal: true,
  })),

  on(requestsModalActions.closeTeacherAvailabilityModal, (state) => ({
    ...state,
    showTeacherAvailabilityModal: false,
  })),

  on(requestsModalActions.openChangeCourseScheduleModal, (state) => ({
    ...state,
    showChangeCourseScheduleModal: true,
  })),

  on(requestsModalActions.closeChangeCourseScheduleModal, (state) => ({
    ...state,
    showChangeCourseScheduleModal: false,
  }))
);

// Requests modal selectors
export const selectIsConfirmPaymentModal = (state: State): boolean =>
  state.showConfirmPaymentModal;

export const selectIsShowTeacherAvailabilityModal = (state: State): boolean =>
  state.showTeacherAvailabilityModal;

export const selectIsShowChangeCourseScheduleModal = (state: State): boolean =>
  state.showChangeCourseScheduleModal;
