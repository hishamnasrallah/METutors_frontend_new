import { createReducer, on } from '@ngrx/store';

import * as financeActions from '../actions/finance.actions';

export interface State {
  orders: any;
  refundDetail: any;
  isLoading: boolean;
  coursePaymentStatus: any;
  isLoadingRefund: boolean;
  isRefundingCourse: boolean;
}

export const initialState: State = {
  orders: null,
  refundDetail: null,
  isLoading: false,
  isLoadingRefund: false,
  isRefundingCourse: false,
  coursePaymentStatus: null,
};

export const reducer = createReducer(
  initialState,
  on(
    financeActions.loadOrders,
    financeActions.loadRefundOrders,
    financeActions.verifyCoursePayment,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),

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
    financeActions.verifyCoursePaymentFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      coursePaymentStatus: { status: false, error },
    })
  ),

  on(financeActions.verifyCoursePaymentSuccess, (state, { paymentInfo }) => ({
    ...state,
    coursePaymentStatus: { status: true, ...paymentInfo },
    isLoading: false,
  })),

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
  })),

  on(financeActions.refundCourse, (state) => ({
    ...state,
    isRefundingCourse: true,
  })),

  on(financeActions.refundCourseSuccess, (state) => ({
    ...state,
    isRefundingCourse: false,
  })),

  on(financeActions.refundCourseFailure, (state) => ({
    ...state,
    isRefundingCourse: false,
  }))
);

export const selectFinanceOrders = (state: State): any => state.orders;

export const selectFinanceRefundDetail = (state: State): any =>
  state.refundDetail;

export const selectIsLoadingFinance = (state: State): boolean =>
  state.isLoading;

export const selectIsLoadingFinanceRefundDetail = (state: State): boolean =>
  state.isLoadingRefund;

export const selectFinanceIsRefundingCourse = (state: State): boolean =>
  state.isRefundingCourse;

export const selectFinanceCoursePaymentStatus = (state: State): boolean =>
  state.coursePaymentStatus;
