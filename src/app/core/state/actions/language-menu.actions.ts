import { createAction, props } from '@ngrx/store';

export const selectCurrency = createAction(
  '[Language Menu] Select Currency',
  props<{ currency: any }>()
);

export const changeLanguage = createAction(
  '[Language Menu] Select Language',
  props<{ language: string }>()
);

export const changeLanguageSuccess = createAction(
  '[Language Menu] Select Language Success',
);

export const changeLanguageFailure = createAction(
  '[Language Menu] Select Language Failure',
  props<{ error: string }>()
);
