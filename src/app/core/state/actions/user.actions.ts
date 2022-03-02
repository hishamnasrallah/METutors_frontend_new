import { createAction, props } from '@ngrx/store';

export const signIn = createAction('[User] Sign In', props<{ user: any }>());

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{ token: string; returnUrl?: string }>()
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
