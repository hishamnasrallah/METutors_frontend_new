import { IUser } from '@metutor/core/models';
import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[User] Sign In', props<{ user: any }>());

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{
    token: string;
    profileStep: number;
    user: IUser;
    returnUrl?: string;
  }>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: any }>()
);

export const signInRequired = createAction(
  '[User] Sign In Required',
  props<{ returnUrl?: string }>()
);

export const logout = createAction('[User] Logout');

export const logoutSuccess = createAction('[User] Logout Success');

export const enterCompleteProfile = createAction(
  '[User] Enter Complete Profile'
);

export const enterRequestTutor = createAction(
  '[User] Enter Request Tutor'
);

export const enterInvoiceDetails = createAction(
  '[User] Enter Invoice Details'
);

export const identifyUser = createAction('[User] Identify User');

export const identifyUserSuccess = createAction(
  '[User] Identify User Success',
  props<{ user: IUser; profileStep: number }>()
);

export const identifyUserEnded = createAction('[User] Identify User Ended');
