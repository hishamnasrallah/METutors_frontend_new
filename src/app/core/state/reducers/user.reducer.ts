import { IUser } from '@metutor/core/models';
import { createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import * as tutorActions from '../actions/tutor.actions';
import * as uploadActions from '../actions/upload.actions';
import * as requestActions from '../actions/request.actions';
import { FreeClassroomDemo, UserRole } from '@metutor/config';

export interface State {
  // Sign up
  isSignUp: boolean;
  registerStep: number;
  registerEmail: string;
  isVerifyEmail: boolean;
  isSocialSignIn: boolean;
  registerUserType: number;
  isResendEmailConfirm: boolean;

  // Sign in
  token?: string;
  isSignIn: boolean;
  tempToken?: string;
  signInFailure?: string;
  isSubmitOTPAdmin: boolean;
  isResendOTPAdmin: boolean;

  // Complete profile
  user: IUser | null;
  profileStep: number;
  isDemo: number;

  // Change Password
  isChangePassword: boolean;
  changePasswordSuccess: boolean;
  changePasswordFailure?: string;
}

export const initialState: State = {
  isDemo: 0,
  user: null,
  profileStep: 1,
  registerStep: 1,
  isSignIn: false,
  isSignUp: false,
  registerEmail: '',
  isVerifyEmail: false,
  isSocialSignIn: false,
  isChangePassword: false,
  isSubmitOTPAdmin: false,
  isResendOTPAdmin: false,
  isResendEmailConfirm: false,
  changePasswordSuccess: false,
  registerUserType: UserRole.student
};

export const reducer = createReducer(
  initialState,

  on(
    userActions.identifyUserSuccess,
    (state, { profileStep, user, isDemo }) => ({
      ...state,
      profileStep,
      isDemo,
      user
    })
  ),

  on(userActions.register, state => ({
    ...state,
    isSignUp: true
  })),

  on(userActions.registerSuccess, (state, { email, userType }) => ({
    ...state,
    isSignUp: false,
    registerStep: 2,
    registerEmail: email,
    registerUserType: userType
  })),

  on(userActions.registerFailure, state => ({
    ...state,
    isSignUp: false
  })),

  on(userActions.registerStep, (state, { step, email, userType }) => ({
    ...state,
    registerStep: step,
    registerEmail: email,
    registerUserType: userType
  })),

  on(userActions.signIn, state => ({
    ...state,
    isSignIn: true,
    signInFailure: ''
  })),

  on(userActions.socialSignIn, state => ({
    ...state,
    isSocialSignIn: true,
    signInFailure: ''
  })),

  on(
    userActions.signInSuccess,
    (state, { token, profileStep, user, isDemo }) => ({
      ...state,
      isSignIn: false,
      isSocialSignIn: false,
      token,
      profileStep,
      user,
      isDemo,
      tempToken: undefined,
      isSubmitOTPAdmin: false,
      signInFailure: ''
    })
  ),

  on(userActions.signInAdminSuccess, (state, { tempToken, user }) => ({
    ...state,
    isSignIn: false,
    isSocialSignIn: false,
    tempToken,
    user,
    signInFailure: ''
  })),

  on(userActions.signInFailure, (state, { error }) => ({
    ...state,
    isSignIn: false,
    isSocialSignIn: false,
    signInFailure: error,
    isSubmitOTPAdmin: false
  })),

  on(userActions.submitOTPAdmin, state => ({
    ...state,
    isSubmitOTPAdmin: true,
    signInFailure: ''
  })),

  on(userActions.resendOTPAdmin, state => ({
    ...state,
    isResendOTPAdmin: true,
    signInFailure: ''
  })),

  on(
    userActions.resendOTPAdminSuccess,
    userActions.resendOTPAdminFailure,
    state => ({
      ...state,
      isResendOTPAdmin: false,
      signInFailure: ''
    })
  ),

  on(
    tutorActions.completeTutorProfileSuccess,
    (state, { nextStep, user, token }) => ({
      ...state,
      profileStep: nextStep,
      user,
      token
    })
  ),

  on(tutorActions.changeTutorProfileStep, (state, { step }) => ({
    ...state,
    profileStep: step
  })),

  on(uploadActions.changeAvatarSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token
  })),

  on(userActions.changePassword, state => ({
    ...state,
    isChangePassword: true,
    changePasswordSuccess: false
  })),

  on(userActions.changePasswordSuccess, state => ({
    ...state,
    isChangePassword: false,
    changePasswordSuccess: true
  })),

  on(userActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    isChangePassword: false,
    changePasswordSuccess: false,
    changePasswordFailure: error
  })),

  on(userActions.verifyEmail, state => ({
    ...state,
    isVerifyEmail: true
  })),

  on(userActions.verifyEmailSuccess, state => ({
    ...state,
    isVerifyEmail: false
  })),

  on(userActions.verifyEmailFailure, (state, { error }) => ({
    ...state,
    isVerifyEmail: false
  })),

  on(userActions.resendEmailConfirm, state => ({
    ...state,
    isResendEmailConfirm: true
  })),

  on(userActions.resendEmailConfirmSuccess, state => ({
    ...state,
    isResendEmailConfirm: false
  })),

  on(userActions.resendEmailConfirmFailure, (state, { error }) => ({
    ...state,
    isResendEmailConfirm: false
  })),

  on(requestActions.createFreeCourseSuccess, (state, { token }) => ({
    ...state,
    isDemo: FreeClassroomDemo.cantBook,
    token
  }))
);

export const selectToken = (state: State): string | undefined => state.token;

export const selectTempToken = (state: State): string | undefined =>
  state.tempToken;

export const selectSignInFailure = (state: State): string | undefined =>
  state.signInFailure;

export const selectIsSignUp = (state: State): boolean => state.isSignUp;

export const selectRegisterStep = (state: State): number => state.registerStep;

export const selectRegisterEmail = (state: State): string =>
  state.registerEmail;

export const selectRegisterUserType = (state: State): number =>
  state.registerUserType;

export const selectIsSignIn = (state: State): boolean => state.isSignIn;

export const selectIsSocialSignIn = (state: State): boolean =>
  state.isSocialSignIn;

export const selectIsSubmitOTPAdmin = (state: State): boolean =>
  state.isSubmitOTPAdmin;

export const selectIsResendOTPAdmin = (state: State): boolean =>
  state.isResendOTPAdmin;

export const selectProfileStep = (state: State): number => state.profileStep;

export const selectStudentIsDemo = (state: State): number => state.isDemo;

export const selectUser = (state: State): IUser | null => state.user;

export const selectIsChangingPassword = (state: State): boolean =>
  state.isChangePassword;

export const selectChangePasswordSuccess = (state: State): boolean =>
  state.changePasswordSuccess;

export const selectIsVerifyEmail = (state: State): boolean =>
  state.isVerifyEmail;

export const selectIsResendEmailConfirm = (state: State): boolean =>
  state.isResendEmailConfirm;
