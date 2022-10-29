import { createReducer, on } from '@ngrx/store';

import * as financeActions from '../actions/finance.actions';

export interface State {
  orders: any;
  courses: any;
  coupons: any;
  paymentInfo: any;
  refundDetail: any;
  isLoading: boolean;
  isAddingCoupon: boolean;
  coursePaymentStatus: any;
  isLoadingRefund: boolean;
  isRetryingPayment: boolean;
  isRefundingCourse: boolean;
}

export const initialState: State = {
  orders: null,
  courses: null,
  coupons: null,
  isLoading: false,
  paymentInfo: null,
  refundDetail: null,
  isAddingCoupon: false,
  isLoadingRefund: false,
  isRefundingCourse: false,
  isRetryingPayment: false,
  coursePaymentStatus: null,
};

export const reducer = createReducer(
  initialState,
  on(
    financeActions.loadOrders,
    financeActions.loadCoupons,
    financeActions.loadAdminCourses,
    financeActions.loadRefundOrders,
    financeActions.verifyCoursePayment,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),

  on(
    financeActions.loadOrdersFailure,
    financeActions.loadCouponsFailure,
    financeActions.loadAdminCoursesFailure,
    financeActions.loadRefundOrdersFailure,
    financeActions.verifyCoursePaymentFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      coursePaymentStatus: { status: false, error },
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

  on(financeActions.loadCouponsSuccess, (state, { coupons }) => ({
    ...state,
    coupons,
    isLoading: false,
  })),

  on(financeActions.adminAddCoupon, (state) => ({
    ...state,
    isAddingCoupon: true,
  })),

  on(financeActions.adminAddCouponSuccess, (state, { coupon }) => {
    let finalState = {
      ...state,
      isAddingCoupon: false,
    };

    let { coupons, total } = finalState.coupons;

    total = total + 1;
    const couponsClone = [...coupons];
    couponsClone.unshift(coupon);
    coupons = { coupons: couponsClone, total };

    finalState.coupons = {
      ...finalState.coupons,
      ...coupons,
    };

    return finalState;
  }),

  on(financeActions.adminAddCouponFailure, (state) => ({
    ...state,
    isAddingCoupon: false,
  })),

  on(financeActions.loadAdminCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    isLoading: false,
  })),

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
  })),

  on(financeActions.reTryPayment, (state) => ({
    ...state,
    isRetryingPayment: true,
  })),

  on(financeActions.reTryPaymentSuccess, (state, { paymentInfo }) => ({
    ...state,
    paymentInfo,
    isRetryingPayment: false,
  })),

  on(financeActions.reTryPaymentFailure, (state) => ({
    ...state,
    isRetryingPayment: false,
  }))
);

export const selectFinanceOrders = (state: State): any => state.orders;
export const selectFinanceCoupons = (state: State): any => state.coupons;
export const selectFinanceCourses = (state: State): any => state.courses;

export const selectFinanceRefundDetail = (state: State): any =>
  state.refundDetail;

export const selectIsLoadingFinance = (state: State): boolean =>
  state.isLoading;

export const selectFinancePaymentInfo = (state: State): any =>
  state.paymentInfo;

export const selectIsRetryingPayment = (state: State): boolean =>
  state.isRetryingPayment;

export const selectIsLoadingFinanceRefundDetail = (state: State): boolean =>
  state.isLoadingRefund;

export const selectIsLoadingFinanceAddCoupon = (state: State): boolean =>
  state.isAddingCoupon;

export const selectFinanceIsRefundingCourse = (state: State): boolean =>
  state.isRefundingCourse;

export const selectFinanceCoursePaymentStatus = (state: State): boolean =>
  state.coursePaymentStatus;
