import {
  ICapacity,
  ICourse,
  ISubject,
  ITeacherDocument,
  ITutor,
} from '@metutor/core/models';
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

// Admin Approve Document
export const adminApproveDocument = createAction(
  '[Admin] Admin ApproveDocument',
  props<{ document: ITeacherDocument }>()
);

export const adminApproveDocumentSuccess = createAction(
  '[Admin] Admin Approve Document Success',
  props<{ document: ITeacherDocument; message: string }>()
);

export const adminApproveDocumentFailure = createAction(
  '[Admin] Admin Approve Document Failure',
  props<{ error: any }>()
);

// Admin Reject Document
export const adminRejectDocument = createAction(
  '[Admin] Admin Reject Document',
  props<{ document: ITeacherDocument }>()
);

export const adminRejectDocumentSuccess = createAction(
  '[Admin] Admin Reject Document Success',
  props<{ document: ITeacherDocument; message: string }>()
);

export const adminRejectDocumentFailure = createAction(
  '[Admin] Admin Reject Document Failure',
  props<{ error: any }>()
);

// Load Workforce Capacity
export const loadWorkforceCapacity = createAction(
  '[Admin] Load Workforce Capacity',
  props<{ params: { page: number; search: string } }>()
);

export const loadWorkforceCapacitySuccess = createAction(
  '[Admin] Load Workforce Capacity Success',
  props<{ total: number; workforceCapacity: ICapacity[] }>()
);

export const loadWorkforceCapacityFailure = createAction(
  '[Admin] Load Workforce Capacity Failure',
  props<{ error: any }>()
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
export const loadBookings = createAction(
  '[Admin] Load Bookings',
  props<{ params: { page: number; search: string; status: string } }>()
);

export const loadBookingsSuccess = createAction(
  '[Admin] Load Bookings Success',
  props<{ bookings: ICourse[]; bookingCounts: any }>()
);

export const loadBookingsFailure = createAction(
  '[Admin] Load Bookings Failure',
  props<{ error: any }>()
);

// Load Cancelled Bookings
export const loadCancelledBookings = createAction(
  '[Admin] Load Cancelled Bookings',
  props<{ params: { page: number; search: string } }>()
);

export const loadCancelledBookingsSuccess = createAction(
  '[Admin] Load Cancelled Bookings Success',
  props<{ cancelledBookings: ICourse[]; bookingCounts: any }>()
);

export const loadCancelledBookingsFailure = createAction(
  '[Admin] Load Cancelled Bookings Failure',
  props<{ error: any }>()
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

export const loadAdminStudentBookingDetail = createAction(
  '[Admin] Load Admin Student Booking Detail'
);

export const loadAdminStudentBookingDetailSuccess = createAction(
  '[Admin] Load Admin Student Booking Detail Success',
  props<{ bookingDetail: any }>()
);

export const loadAdminStudentBookingDetailFailure = createAction(
  '[Admin] Load Admin Student Booking Detail Failure',
  props<{ error: any }>()
);

export const loadAdminTutorBookingDetail = createAction(
  '[Admin] Load Admin Tutor Booking Detail'
);

export const loadAdminTutorBookingDetailSuccess = createAction(
  '[Admin] Load Admin Tutor Booking Detail Success',
  props<{ bookingDetail: any }>()
);

export const loadAdminTutorBookingDetailFailure = createAction(
  '[Admin] Load Admin Tutor Booking Detail Failure',
  props<{ error: any }>()
);

// Load booking per subject/course
export const loadAdminBookingPerCourse = createAction(
  '[Admin] Load Admin Booking Per Course',
  props<{ params: { page: number; search: string; status: string } }>()
);

export const loadAdminBookingPerCourseSuccess = createAction(
  '[Admin] Load Admin Booking Per Course Success',
  props<{ bookingPerCourse: any }>()
);

export const loadAdminBookingPerCourseFailure = createAction(
  '[Admin] Load Admin Booking Per Course Failure',
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

export const loadAdminViewFeedback = createAction(
  '[Admin] Load Admin View Feedback',
  props<{ studentId?: number; courseId?: number }>()
);

export const loadAdminViewFeedbackSuccess = createAction(
  '[Admin] Load Admin View Feedback Success',
  props<{ viewFeedback: any }>()
);

export const loadAdminViewFeedbackFailure = createAction(
  '[Admin] Load Admin View Feedback Failure',
  props<{ error: any }>()
);

export const loadAdminTutorReAssignment = createAction(
  '[Admin] Load Admin Tutor Re-assignment',
  props<{ params: { page: number; status: string; search: string } }>()
);

export const loadAdminTutorReAssignmentSuccess = createAction(
  '[Admin] Load Admin Tutor Re-assignment Success',
  props<{ tutorReAssignment: any }>()
);

export const loadAdminTutorReAssignmentFailure = createAction(
  '[Admin] Load Admin Tutor Re-assignment Failure',
  props<{ error: any }>()
);

export const loadAdminTestimonials = createAction(
  '[Admin] Load Admin Testimonials',
  props<{ params: { page: 1; feedback_by: string } }>()
);

export const loadAdminTestimonialsSuccess = createAction(
  '[Admin] Load Admin Testimonials Success',
  props<{ testimonials: any }>()
);

export const loadAdminTestimonialsFailure = createAction(
  '[Admin] Load Admin Testimonials Failure',
  props<{ error: any }>()
);

export const adminEditTestimonialStatus = createAction(
  '[Admin] Admin Edit Testimonial Status',
  props<{ status: string; id: number }>()
);

export const adminEditTestimonialStatusSuccess = createAction(
  '[Admin] Admin Edit Testimonial Status Success',
  props<{ id: number; status: string; message: string }>()
);

export const adminEditTestimonialStatusFailure = createAction(
  '[Admin] Admin Edit Testimonial Status Failure',
  props<{ error: string }>()
);

export const loadAdminTestimonialFeedbackOptions = createAction(
  '[Admin] Load Admin Testimonial Feedback Options',
  props<{ id: number }>()
);

export const loadAdminTestimonialFeedbackOptionsSuccess = createAction(
  '[Admin] Load Admin Testimonial Feedback Options Success',
  props<{ feedbackOptions: any }>()
);

export const loadAdminTestimonialFeedbackOptionsFailure = createAction(
  '[Admin] Load Admin Testimonial Feedback Options Failure',
  props<{ error: any }>()
);

export const adminEditTestimonialFeedback = createAction(
  '[Admin] Admin Edit Testimonial Feedback',
  props<{ body: any }>()
);

export const adminEditTestimonialFeedbackSuccess = createAction(
  '[Admin] Admin Edit Testimonial Feedback Success',
  props<{ result: any; id: number; message: string }>()
);

export const adminEditTestimonialFeedbackFailure = createAction(
  '[Admin] Admin Edit Testimonial Feedback Failure',
  props<{ error: string }>()
);

export const adminChangeTutorAvailabilityStatus = createAction(
  '[Admin] Admin Change Tutor Availability Status',
  props<{ id: number; status: string }>()
);

export const adminChangeTutorAvailabilityStatusSuccess = createAction(
  '[Admin] Admin Change Tutor Availability Status Success',
  props<{ id: number; status: string; message: string }>()
);

export const adminChangeTutorAvailabilityStatusFailure = createAction(
  '[Admin] Admin Change Tutor Availability Status Failure',
  props<{ error: any }>()
);

export const loadAdminTutorApprovalRequest = createAction(
  '[Admin] Load Admin Tutor Approval Request',
  props<{ params: { page: number; search: string } }>()
);

export const loadAdminTutorApprovalRequestSuccess = createAction(
  '[Admin] Load Admin Tutor Approval Request Success',
  props<{ tutorApprovalRequest: any }>()
);

export const loadAdminTutorApprovalRequestFailure = createAction(
  '[Admin] Load Admin Tutor Approval Request Failure',
  props<{ error: any }>()
);

// Load Admin Tutor Schedule
export const loadAdminTutorSchedule = createAction(
  '[Admin] Load Admin Tutor Schedule',
  props<{ startingDate?: string; params: { page: number; search: string } }>()
);

export const loadAdminTutorScheduleSuccess = createAction(
  '[Admin] Load Admin Tutor Schedule Success',
  props<{ schedule: any }>()
);

export const loadAdminTutorScheduleFailure = createAction(
  '[Admin] Load Admin Tutor Schedule Failure',
  props<{ error: any }>()
);
