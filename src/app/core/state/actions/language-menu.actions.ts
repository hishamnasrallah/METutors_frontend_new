import { createAction, props } from '@ngrx/store';

export const selectCurrency = createAction(
  '[Language Menu] Select Currency',
  props<{ currency: any }>()
);
