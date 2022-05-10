import { ICapacity, ISubject } from '@metutor/core/models';
import { createAction, props } from '@ngrx/store';

// Load Admin Documents
export const loadAdminDocuments = createAction('[Admin] Load Admin Documents');

export const loadAdminDocumentsSuccess = createAction(
  '[Admin] Load Admin Documents Success',
  props<{ documents: any }>()
);

export const loadAdminDocumentsFailure = createAction(
  '[Admin] Load Admin Documents Failure',
  props<{ error: any }>()
);

export const loadAdminDocumentsEnded = createAction(
  '[Admin] Load Admin Documents Ended'
);

// Admin Approve Document
export const adminApproveDocument = createAction(
  '[Admin] Admin ApproveDocument',
  props<{ id: number }>()
);

export const adminApproveDocumentSuccess = createAction(
  '[Admin] Admin Approve Document Success',
  props<{ id: number; message: string }>()
);

export const adminApproveDocumentFailure = createAction(
  '[Admin] Admin Approve Document Failure',
  props<{ error: any }>()
);

// Admin Reject Document
export const adminRejectDocument = createAction(
  '[Admin] Admin Reject Document',
  props<{ id: number }>()
);

export const adminRejectDocumentSuccess = createAction(
  '[Admin] Admin Reject Document Success',
  props<{ id: number; message: string }>()
);

export const adminRejectDocumentFailure = createAction(
  '[Admin] Admin Reject Document Failure',
  props<{ error: any }>()
);

// Load Workforce Capacity
export const loadWorkforceCapacity = createAction(
  '[Admin] Load Workforce Capacity'
);

export const loadWorkforceCapacitySuccess = createAction(
  '[Admin] Load Workforce Capacity Success',
  props<{ workforceCapacity: ICapacity[] }>()
);

export const loadWorkforceCapacityFailure = createAction(
  '[Admin] Load Workforce Capacity Failure',
  props<{ error: any }>()
);

export const loadWorkforceCapacityEnded = createAction(
  '[Admin] Load Workforce Capacity Ended'
);

// Load Course Booking List
export const loadCourseBookingList = createAction(
  '[Admin] Load Course Booking List',
  props<{ id: number }>()
);

export const loadCourseBookingListSuccess = createAction(
  '[Admin] Load Course Booking List Success',
  props<{ courseBooking: ISubject }>()
);

export const loadCourseBookingListFailure = createAction(
  '[Admin] Load Course Booking List Failure',
  props<{ error: any }>()
);
