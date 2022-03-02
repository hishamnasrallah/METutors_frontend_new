import { createAction, props } from '@ngrx/store';

import { ITutor } from '@models';

export const signIn = createAction('[User] Sign In', props<{ user: any }>());

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{ user: any; returnUrl?: string }>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: any }>()
);
