import { createReducer, on } from '@ngrx/store';

import * as financeActions from '../actions/finance.actions';

export interface State {
  orders: any;
  isLoading: boolean;
}

export const initialState: State = {
  orders: null,
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(financeActions.loadOrders, financeActions.loadRefundOrders, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(
    financeActions.loadOrdersSuccess,
    financeActions.loadRefundOrdersSuccess,
    (state, { orders }) => ({
      ...state,
      orders,
      isLoading: false,
    })
  ),

  on(
    financeActions.loadOrdersFailure,
    financeActions.loadRefundOrdersFailure,
    (state) => ({
      ...state,
      isLoading: false,
    })
  )
);

export const selectFinanceOrders = (state: State): any => state.orders;

export const selectIsLoadingIFinance = (state: State): boolean =>
  state.isLoading;
