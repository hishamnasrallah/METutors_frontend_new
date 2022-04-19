import { createAction, props } from '@ngrx/store';

import { IClassroom, IInvoiceDetails, ITutor } from '@models';

export const generateTutors = createAction(
  '[Request] Generate Tutors',
  props<{ data: any }>()
);

export const generateTutorsSuccess = createAction(
  '[Request] Generate Tutors Success',
  props<{ tutors: ITutor[] }>()
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
  '[Request] Calculate Final Invoice'
);

export const calculateFinalInvoiceSuccess = createAction(
  '[Request] Calculate Final Invoice Success',
  props<{ invoiceDetails: IInvoiceDetails }>()
);

export const calculateFinalInvoiceFailure = createAction(
  '[Request] Calculate Final Invoice Failure',
  props<{ error: any }>()
);

export const calculateFinalInvoiceEnded = createAction(
  '[Request] Calculate Final Invoice Ended'
);

export const createPaidClass = createAction(
  '[Request] Create Paid Class',
  props<{ data: any }>()
);

export const createPaidClassSuccess = createAction(
  '[Request] Create Paid Class Success',
  props<{ classroom: IClassroom; message: string }>()
);

export const createPaidClassFailure = createAction(
  '[Request] Create Paid Class Failure',
  props<{ error: any }>()
);
