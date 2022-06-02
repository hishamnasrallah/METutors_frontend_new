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

export const loadRefundOrders = createAction('[Finance] Load Refund Orders');

export const loadRefundOrdersSuccess = createAction(
  '[Finance] Load Refund Orders Success',
  props<{ orders: any }>()
);

export const loadRefundOrdersFailure = createAction(
  '[Finance] Load Orders Failure',
  props<{ error: any }>()
);