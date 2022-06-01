import { createAction, props } from '@ngrx/store';

export const loadOrders = createAction('[Finance] Load Orders');

export const loadOrdersSuccess = createAction(
  '[Finance] Load Orders Success',
  props<{ orders: any }>()
);

export const loadOrdersFailure = createAction(
  '[Finance] Load Orders Failure',
  props<{ error: any }>()
);
