import { IUser } from '@metutor/core/models';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import * as tutorActions from '../actions/tutor.actions';

export interface State {
  // Sign in
  isSignIn: boolean;
  token?: string;
  signInFailure?: string;

  // Complete profile
  profileStep: number;
  user: IUser | null;

  // Change Password
  isChangePassword: boolean;
  changePasswordSuccess: boolean;
  changePasswordFailure?: string;
}

export const initialState: State = {
  user: null,
  profileStep: 1,
  isSignIn: false,
  isChangePassword: false,
  changePasswordSuccess: false,
};

export const reducer = createReducer(
  initialState,

  on(userActions.signIn, (state) => ({
    ...state,
    isSignIn: true,
  })),

  on(userActions.signInSuccess, (state, { token, profileStep, user }) => ({
    ...state,
    isSignIn: false,
    token,
    profileStep,
    user,
  })),

  on(userActions.signInFailure, (state, { error }) => ({
    ...state,
    isSignIn: false,
    signInFailure: error.message,
  })),

  on(
    tutorActions.completeTutorProfileSuccess,
    (state, { nextStep, user, token }) => ({
      ...state,
      profileStep: nextStep,
      user,
      token,
    })
  ),

  on(userActions.identifyUserSuccess, (state, { profileStep, user }) => ({
    ...state,
    profileStep,
    user,
  })),

  on(userActions.changePassword, (state) => ({
    ...state,
    isChangePassword: true,
    changePasswordSuccess: false,
  })),

  on(userActions.changePasswordSuccess, (state) => ({
    ...state,
    isChangePassword: false,
    changePasswordSuccess: true,
  })),

  on(userActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    isChangePassword: false,
    changePasswordSuccess: false,
    changePasswordFailure: error,
  }))
);

export const selectToken = (state: State): string | undefined => state.token;

export const selectIsSignIn = (state: State): boolean => state.isSignIn;

export const selectProfileStep = (state: State): number => state.profileStep;

export const selectUser = (state: State): IUser | null => state.user;

export const selectIsChangingPassword = (state: State): boolean =>
  state.isChangePassword;

export const selectChangePasswordSuccess = (state: State): boolean =>
  state.changePasswordSuccess;
