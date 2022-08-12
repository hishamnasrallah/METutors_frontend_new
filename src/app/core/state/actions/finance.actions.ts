import { createAction, props } from '@ngrx/store';

export const loadOrders = createAction(
  '[Finance] Load Orders',
  props<{ params: { page: number; search: string } }>()
);

export const loadOrdersSuccess = createAction(
  '[Finance] Load Orders Success',
  props<{ orders: any }>()
);

export const loadOrdersFailure = createAction(
  '[Finance] Load Orders Failure',
  props<{ error: any }>()
);

export const loadAdminCourses = createAction(
  '[Finance] Load Admin Courses',
  props<{ params: { page: number; search: string } }>()
);

export const loadAdminCoursesSuccess = createAction(
  '[Finance] Load Admin Courses Success',
  props<{ courses: any }>()
);

export const loadAdminCoursesFailure = createAction(
  '[Finance] Load Admin Courses Failure',
  props<{ error: any }>()
);

export const loadRefundOrders = createAction(
  '[Finance] Load Refund Orders',
  props<{ params: { page: number; search: string } }>()
);

export const loadRefundOrdersSuccess = createAction(
  '[Finance] Load Refund Orders Success',
  props<{ orders: any }>()
);

export const loadRefundOrdersFailure = createAction(
  '[Finance] Load Orders Failure',
  props<{ error: any }>()
);

export const loadRefundDetail = createAction(
  '[Finance] Load Refund Detail',
  props<{ courseId: number }>()
);

export const loadRefundDetailSuccess = createAction(
  '[Finance] Load Refund Detail Success',
  props<{ refundDetail: any }>()
);

export const loadRefundDetailFailure = createAction(
  '[Finance] Load Refund Detail Failure',
  props<{ error: any }>()
);

export const refundCourse = createAction(
  '[Finance] Refund Course',
  props<{ courseId: number }>()
);

export const refundCourseSuccess = createAction(
  '[Finance] Refund Course Success'
);

export const refundCourseFailure = createAction(
  '[Finance] Refund Course Failure',
  props<{ error: any }>()
);

export const verifyCoursePayment = createAction(
  '[Finance] Verify Course Payment',
  props<{ id: string; courseId: number; resourcePath: string }>()
);

export const verifyCoursePaymentSuccess = createAction(
  '[Finance] Verify Course Payment Success',
  props<{ paymentInfo: any }>()
);

export const verifyCoursePaymentFailure = createAction(
  '[Finance] Verify Course Payment Failure',
  props<{ error: any }>()
);

export const reTryPayment = createAction(
  '[Finance] Re-Try Payment',
  props<{ courseId: number; redirectUrl: string }>()
);

export const reTryPaymentSuccess = createAction(
  '[Finance] Re-Try Payment Success',
  props<{ paymentInfo: any }>()
);

export const reTryPaymentFailure = createAction(
  '[Finance] Re-Try Payment Failure ',
  props<{ error: any }>()
);
