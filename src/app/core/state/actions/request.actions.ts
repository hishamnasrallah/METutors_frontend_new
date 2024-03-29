import { createAction, props } from '@ngrx/store';

import { IClassroom, ICourseRequest, IInvoiceDetails, ITutor } from '@models';

export const generateTutors = createAction(
  '[Request] Generate Tutors',
  props<{ data: any }>()
);

export const generateTutorsSuccess = createAction(
  '[Request] Generate Tutors Success',
  props<{ availableTutors: ITutor[]; suggestedTutors: ITutor[] }>()
);

export const generateTutorsFailure = createAction(
  '[Request] Generate Tutors Failure',
  props<{ error: any }>()
);

export const createClass = createAction(
  '[Request] Create Class',
  props<{ data: any }>()
);

export const createClassSuccess = createAction(
  '[Request] Create Class Success',
  props<{ classroom: IClassroom }>()
);

export const createClassFailure = createAction(
  '[Request] Create Class Failure',
  props<{ error: any }>()
);

export const createClassLocalStorage = createAction(
  '[Request] Create Class Local Storage',
  props<{ classroom: IClassroom }>()
);

export const calculateEstimatedPrice = createAction(
  '[Request] Calculate Estimated Price',
  props<{ subjectId: string }>()
);

export const calculateEstimatedPriceSuccess = createAction(
  '[Request] Calculate Estimated Price Success',
  props<{ estimatedPrice: number }>()
);

export const calculateEstimatedPriceFailure = createAction(
  '[Request] Calculate Estimated Price Failure',
  props<{ error: any }>()
);

export const calculateFinalInvoice = createAction(
  '[Request] Calculate Final Invoice',
  props<{ classes?: any }>()
);

export const calculateFinalInvoiceSuccess = createAction(
  '[Request] Calculate Final Invoice Success',
  props<{ invoiceDetails: IInvoiceDetails }>()
);

export const calculateFinalInvoiceFailure = createAction(
  '[Request] Calculate Final Invoice Failure',
  props<{ error: any }>()
);

export const createCourse = createAction(
  '[Request] Create Course',
  props<{ data: any }>()
);

export const createCourseSuccess = createAction(
  '[Request] Create Course Success',
  props<{ paymentInfo: any }>()
);

export const createCourseFailure = createAction(
  '[Request] Create Course Failure',
  props<{ error: any }>()
);

export const createFreeCourse = createAction(
  '[Request] Create Free Course',
  props<{ data: any }>()
);

export const createFreeCourseSuccess = createAction(
  '[Request] Create Free Course Success',
  props<{ paymentInfo: any; token: string }>()
);

export const createFreeCourseFailure = createAction(
  '[Request] Create Free Course Failure',
  props<{ error: any }>()
);

export const loadRequestedCourses = createAction(
  '[Request] Load Requested Courses',
  props<{ params: { page: number; search: string } }>()
);

export const loadRequestedCoursesSuccess = createAction(
  '[Request] Load Requested Courses Success',
  props<{
    requestedCourses: ICourseRequest[];
    completedCourses: ICourseRequest[];
    requestedCoursesCounts: any;
  }>()
);

export const loadRequestedCoursesFailure = createAction(
  '[Request] Load Requested Courses Failure',
  props<{ error: any }>()
);

export const requestCourse = createAction(
  '[Request] Request Course',
  props<{ data: any }>()
);

export const requestCourseSuccess = createAction(
  '[Request] Request Course Success',
  props<{ message: string }>()
);

export const requestCourseFailure = createAction(
  '[Request] Request Course Failure',
  props<{ error: any }>()
);

export const changeRequestStatus = createAction(
  '[Request] Change Request Status',
  props<{ id: number; status: string }>()
);

export const changeRequestStatusSuccess = createAction(
  '[Request] Change Request Status Success',
  props<{ id: number; status: string; message: string }>()
);

export const changeRequestStatusFailure = createAction(
  '[Request] Change Request Status Failure',
  props<{ error: any }>()
);

export const getInvoiceEmail = createAction(
  '[Request] Get Invoice Email',
  props<{ info: any }>()
);

export const getInvoiceEmailSuccess = createAction(
  '[Request] Get Invoice Email Success',
  props<{ message: string }>()
);

export const getInvoiceEmailFailure = createAction(
  '[Request] Get Invoice Email Failure',
  props<{ error: any }>()
);

export const applyCoupon = createAction(
  '[Request] Apply Coupon',
  props<{ body: any }>()
);

export const applyCouponSuccess = createAction(
  '[Request] Apply Coupon Success',
  props<{ invoiceDetails: IInvoiceDetails; message: string }>()
);

export const applyCouponFailure = createAction(
  '[Request] Apply Coupon Failure',
  props<{ error: any }>()
);
