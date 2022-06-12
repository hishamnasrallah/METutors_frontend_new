import { createReducer, on } from '@ngrx/store';

import * as financeActions from '../actions/finance.actions';

export interface State {
  orders: any;
  refundDetail: any;
  isLoading: boolean;
  isLoadingRefund: boolean;
}

export const initialState: State = {
  orders: null,
  refundDetail: null,
  isLoading: false,
  isLoadingRefund: false,
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
  ),

  on(financeActions.loadRefundDetail, (state) => ({
    ...state,
    isLoadingRefund: true,
  })),

  on(financeActions.loadRefundDetailSuccess, (state, { refundDetail }) => ({
    ...state,
    refundDetail,
    isLoadingRefund: false,
  })),

  on(financeActions.loadRefundDetailFailure, (state) => ({
    ...state,
    isLoadingRefund: false,
  }))
);

export const selectFinanceOrders = (state: State): any => state.orders;

export const selectFinanceRefundDetail = (state: State): any =>
  state.refundDetail;

export const selectIsLoadingFinance = (state: State): boolean =>
  state.isLoading;

export const selectIsLoadingFinanceRefundDetail = (state: State): boolean =>
  state.isLoadingRefund;
