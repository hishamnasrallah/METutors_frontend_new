import { createReducer, on } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import * as accountModalActions from '../actions/account-modal.actions';

export interface State {
  loginUserRole: number;
  showEmailVerificationModal: boolean;
}

export const initialState: State = {
  loginUserRole: 0,
  showEmailVerificationModal: false,
};

export const reducer = createReducer(
  initialState,

  on(accountModalActions.openAccountEmailVerificationModal, (state) => ({
    ...state,
    showEmailVerificationModal: true,
  })),

  on(accountModalActions.closeAccountEmailVerificationModal, (state) => ({
    ...state,
    showEmailVerificationModal: false,
    loginUserRole: 0,
  })),

  on(fromCore.signInFailure, (state, { errorInfo }) => ({
    ...state,
    showEmailVerificationModal: errorInfo?.verified === 0 ? true : false,
    loginUserRole: errorInfo?.role,
  })),

  on(fromCore.verifyEmailSuccess, (state) => ({
    ...state,
    showEmailVerificationModal: false,
  }))
);

// Account modal selectors

export const selectShowEmailVerificationModal = (state: State): boolean =>
  state.showEmailVerificationModal;

export const selectLoginUserRole = (state: State): number =>
  state.loginUserRole;
