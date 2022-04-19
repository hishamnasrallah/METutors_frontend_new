import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as requestsModalActions from '../actions/requests-modal.actions';

export interface State {
  showConfirmPaymentModal: boolean;
}

export const initialState: State = {
  showConfirmPaymentModal: false,
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
  )
);

// Requests modal selectors
export const selectIsConfirmPaymentModal = (state: State): boolean =>
  state.showConfirmPaymentModal;
