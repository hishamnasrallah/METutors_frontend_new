import { IUser } from '@metutor/core/models';
import { createAction, props } from '@ngrx/store';

export const register = createAction('[User] Register', props<{ user: any }>());

export const registerSuccess = createAction(
  '[User] Register Success',
  props<{ email: string; userType: number }>()
);

export const registerFailure = createAction(
  '[User] Register Failure',
  props<{ error: any }>()
);

export const registerStep = createAction(
  '[User] Register Step',
  props<{ step: number; email: string; userType: number }>()
);

export const signIn = createAction('[User] Sign In', props<{ user: any }>());

export const socialSignIn = createAction(
  '[User] Social Sign In',
  props<{ user: any }>()
);

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{
    token: string;
    profileStep: number;
    user: IUser;
    returnUrl?: string;
  }>()
);

export const signInAdminSuccess = createAction(
  '[User] Sign In Admin Success',
  props<{
    tempToken: string;
    user: IUser;
    returnUrl?: string;
  }>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: any; errorInfo: any }>()
);

export const signInRequired = createAction(
  '[User] Sign In Required',
  props<{ returnUrl?: string }>()
);

export const submitOTPAdmin = createAction(
  '[User] Submit OTP Admin',
  props<{ otp: string }>()
);

export const resendOTPAdmin = createAction('[User] Resend OTP Admin');

export const resendOTPAdminSuccess = createAction(
  '[User] Resend OTP Admin Success',
  props<{ message: string }>()
);

export const resendOTPAdminFailure = createAction(
  '[User] Resend OTP Admin Failure',
  props<{ error: any }>()
);

export const logout = createAction('[User] Logout');

export const logoutSuccess = createAction('[User] Logout Success');

export const enterCompleteProfile = createAction(
  '[User] Enter Complete Profile'
);

export const enterRequestTutor = createAction('[User] Enter Request Tutor');

export const enterInvoiceDetails = createAction('[User] Enter Invoice Details');

export const identifyUser = createAction('[User] Identify User');

export const identifyUserSuccess = createAction(
  '[User] Identify User Success',
  props<{ user: IUser; profileStep: number }>()
);

export const identifyUserEnded = createAction('[User] Identify User Ended');

export const changePassword = createAction(
  '[User] Change Password',
  props<{ value: any }>()
);

export const changePasswordSuccess = createAction(
  '[User] Change Password Success',
  props<{ message: string }>()
);

export const changePasswordFailure = createAction(
  '[User] Change Password Failure',
  props<{ error: any }>()
);

export const verifyEmail = createAction(
  '[User] Verify Email',
  props<{ value: any }>()
);

export const verifyEmailSuccess = createAction(
  '[User] Verify Email Success',
  props<{ message: string; userType: number }>()
);

export const verifyEmailFailure = createAction(
  '[User] Verify Email Failure',
  props<{ error: any }>()
);

export const resendEmailConfirm = createAction(
  '[User] Resend Email Confirm',
  props<{ email: string }>()
);

export const resendEmailConfirmSuccess = createAction(
  '[User] Resend Email Confirm Success',
  props<{ message: string }>()
);

export const resendEmailConfirmFailure = createAction(
  '[User] Resend Email Confirm Failure',
  props<{ error: any }>()
);
