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
  props<{ allBookings: ICourse[]; bookingsCounts: any }>()
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
  props<{ cancelledBookings: ICourse[]; bookingsCounts: any }>()
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

// Load booking per subject/course
// -----RUNNING
export const loadAdminBookingPerCourseRunning = createAction(
  '[Admin] Load Admin Booking Per Course Running',
  props<{ status: string }>()
);

export const loadAdminBookingPerCourseRunningSuccess = createAction(
  '[Admin] Load Admin Booking Per Course Running Success',
  props<{ bookingPerCourseRunning: any }>()
);

export const loadAdminBookingPerCourseRunningFailure = createAction(
  '[Admin] Load Admin Booking Per Course Running Failure',
  props<{ error: any }>()
);

export const loadAdminBookingPerCourseRunningEnded = createAction(
  '[Admin] Load Admin Booking Per Course Running Ended'
);

// -----PENDING
export const loadAdminBookingPerCoursePending = createAction(
  '[Admin] Load Admin Booking Per Course Pending',
  props<{ status: string }>()
);

export const loadAdminBookingPerCoursePendingSuccess = createAction(
  '[Admin] Load Admin Booking Per Course Pending Success',
  props<{ bookingPerCoursePending: any }>()
);

export const loadAdminBookingPerCoursePendingFailure = createAction(
  '[Admin] Load Admin Booking Per Course Pending Failure',
  props<{ error: any }>()
);

export const loadAdminBookingPerCoursePendingEnded = createAction(
  '[Admin] Load Admin Booking Per Course Pending Ended'
);

// -----REASSIGNED
export const loadAdminBookingPerCourseReAssigned = createAction(
  '[Admin] Load Admin Booking Per Course ReAssigned',
  props<{ status: string }>()
);

export const loadAdminBookingPerCourseReAssignedSuccess = createAction(
  '[Admin] Load Admin Booking Per Course ReAssigned Success',
  props<{ bookingPerCourseReAssigned: any }>()
);

export const loadAdminBookingPerCourseReAssignedFailure = createAction(
  '[Admin] Load Admin Booking Per Course ReAssigned Failure',
  props<{ error: any }>()
);

export const loadAdminBookingPerCourseReAssignedEnded = createAction(
  '[Admin] Load Admin Booking Per Course ReAssigned Ended'
);

// -----CANCELLED
export const loadAdminBookingPerCourseCancelled = createAction(
  '[Admin] Load Admin Booking Per Course Cancelled',
  props<{ status: string }>()
);

export const loadAdminBookingPerCourseCancelledSuccess = createAction(
  '[Admin] Load Admin Booking Per Course Cancelled Success',
  props<{ bookingPerCourseCancelled: any }>()
);

export const loadAdminBookingPerCourseCancelledFailure = createAction(
  '[Admin] Load Admin Booking Per Course Cancelled Failure',
  props<{ error: any }>()
);

export const loadAdminBookingPerCourseCancelledEnded = createAction(
  '[Admin] Load Admin Booking Per Course Cancelled Ended'
);

// -----COMPLETED
export const loadAdminBookingPerCourseCompleted = createAction(
  '[Admin] Load Admin Booking Per Course Completed',
  props<{ status: string }>()
);

export const loadAdminBookingPerCourseCompletedSuccess = createAction(
  '[Admin] Load Admin Booking Per Course Completed Success',
  props<{ bookingPerCourseCompleted: any }>()
);

export const loadAdminBookingPerCourseCompletedFailure = createAction(
  '[Admin] Load Admin Booking Per Course Completed Failure',
  props<{ error: any }>()
);

export const loadAdminBookingPerCourseCompletedEnded = createAction(
  '[Admin] Load Admin Booking Per Course Completed Ended'
);

export const loadAdminBookingPerCourseEnded = createAction(
  '[Admin] Load Admin Booking Per Course Ended'
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

export const loadAdminStudentsFeedback = createAction(
  '[Admin] Load Admin Students Feedback'
);

export const loadAdminStudentsFeedbackSuccess = createAction(
  '[Admin] Load Admin Students Feedback Success',
  props<{ studentsFeedback: any }>()
);

export const loadAdminStudentsFeedbackFailure = createAction(
  '[Admin] Load Admin Students Feedback Failure',
  props<{ error: any }>()
);

export const loadAdminStudentProfile = createAction(
  '[Admin] Load Admin Student Profile'
);

export const loadAdminStudentProfileSuccess = createAction(
  '[Admin] Load Admin Student Profile Success',
  props<{ studentProfile: any }>()
);

export const loadAdminStudentProfileFailure = createAction(
  '[Admin] Load Admin Student Profile Failure',
  props<{ error: any }>()
);

export const loadAdminStudentTotalBooking = createAction(
  '[Admin] Load Admin Student Total Booking',
  props<{ id: number; bookingType?: string }>()
);

export const loadAdminStudentTotalBookingSuccess = createAction(
  '[Admin] Load Admin Student Total Booking Success',
  props<{ studentTotalBooking: any }>()
);

export const loadAdminStudentTotalBookingFailure = createAction(
  '[Admin] Load Admin Student Total Booking Failure',
  props<{ error: any }>()
);

export const loadAdminStudentBookingDetail = createAction(
  '[Admin] Load Admin Student Booking Detail'
);

export const loadAdminStudentBookingDetailSuccess = createAction(
  '[Admin] Load Admin Student Booking Detail Success',
  props<{ studentBookingDetail: any }>()
);

export const loadAdminStudentBookingDetailFailure = createAction(
  '[Admin] Load Admin Student Booking Detail Failure',
  props<{ error: any }>()
);

export const loadAdminStudentAssignmentSummary = createAction(
  '[Admin] Load Admin Student Assignment Summary'
);

export const loadAdminStudentAssignmentSummarySuccess = createAction(
  '[Admin] Load Admin Student Assignment Summary Success',
  props<{ assignmentSummary: any }>()
);

export const loadAdminStudentAssignmentSummaryFailure = createAction(
  '[Admin] Load Admin Student Assignment Summary Failure',
  props<{ error: any }>()
);

export const loadAdminStudentViewFeedback = createAction(
  '[Admin] Load Admin Student View Feedback'
);

export const loadAdminStudentViewFeedbackSuccess = createAction(
  '[Admin] Load Admin Student View Feedback Success',
  props<{ viewFeedback: any }>()
);

export const loadAdminStudentViewFeedbackFailure = createAction(
  '[Admin] Load Admin Student View Feedback Failure',
  props<{ error: any }>()
);
