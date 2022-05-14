import { ICapacity, ICourse, ISubject, ITutor } from '@metutor/core/models';
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

export const loadAdminTutors = createAction(
  '[Admin] Load Admin Tutors',
  props<{ tutorType: string; id: number }>()
);

export const loadAdminTutorsSuccess = createAction(
  '[Admin] Load Admin Tutors Success',
  props<{ tutors: ITutor[] }>()
);
export const loadAdminTutorsFailure = createAction(
  '[Admin] Load Admin Tutors Failure',
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

// Load All Bookings
export const loadAllBookings = createAction('[Admin] Load All Bookings');

export const loadAllBookingsSuccess = createAction(
  '[Admin] Load All Bookings Success',
  props<{ allBookings: ICourse[] }>()
);

export const loadAllBookingsFailure = createAction(
  '[Admin] Load All Bookings Failure',
  props<{ error: any }>()
);

export const loadAllBookingsEnded = createAction(
  '[Admin] Load All Bookings Ended'
);

// Load Completed Bookings
export const loadCompletedBookings = createAction(
  '[Admin] Load Completed Bookings'
);

export const loadCompletedBookingsSuccess = createAction(
  '[Admin] Load Completed Bookings Success',
  props<{ completedBookings: ICourse[] }>()
);

export const loadCompletedBookingsFailure = createAction(
  '[Admin] Load Completed Bookings Failure',
  props<{ error: any }>()
);

export const loadCompletedBookingsEnded = createAction(
  '[Admin] Load Completed Bookings Ended'
);

// Load Running Bookings
export const loadRunningBookings = createAction(
  '[Admin] Load Running Bookings'
);

export const loadRunningBookingsSuccess = createAction(
  '[Admin] Load Running Bookings Success',
  props<{ runningBookings: ICourse[] }>()
);

export const loadRunningBookingsFailure = createAction(
  '[Admin] Load Running Bookings Failure',
  props<{ error: any }>()
);

export const loadRunningBookingsEnded = createAction(
  '[Admin] Load Running Bookings Ended'
);

// Load Cancelled Bookings
export const loadCancelledBookings = createAction(
  '[Admin] Load Cancelled Bookings'
);

export const loadCancelledBookingsSuccess = createAction(
  '[Admin] Load Cancelled Bookings Success',
  props<{ cancelledBookings: ICourse[] }>()
);

export const loadCancelledBookingsFailure = createAction(
  '[Admin] Load Cancelled Bookings Failure',
  props<{ error: any }>()
);

export const loadCancelledBookingsEnded = createAction(
  '[Admin] Load Cancelled Bookings Ended'
);

// Load booking details
export const loadBookingDetail = createAction('[Admin] Load Booking Detail');

export const loadBookingDetailSuccess = createAction(
  '[Admin] Load Booking Detail Success',
  props<{ bookingDetail: any }>()
);

export const loadBookingDetailFailure = createAction(
  '[Admin] Load Booking Detail Failure',
  props<{ error: any }>()
);

export const loadAdminCoursePreviousTutors = createAction(
  '[Admin] Load Admin Course Previous Tutors'
);

export const loadAdminCoursePreviousTutorsSuccess = createAction(
  '[Admin] Load Admin Course Previous Tutors Success',
  props<{ previousTutors: any }>()
);

export const loadAdminCoursePreviousTutorsFailure = createAction(
  '[Admin] Load Admin Course Previous Tutors Failure',
  props<{ error: any }>()
);
