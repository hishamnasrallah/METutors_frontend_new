import { createReducer, on } from '@ngrx/store';

import {
  ITutor,
  ICourse,
  ISubject,
  ICapacity,
  ISchedule,
  IPagination,
  ITeacherDocument,
} from '@models';

import camelcaseKeys from 'camelcase-keys';
import { CourseStatus } from '@metutor/config';
import * as adminActions from '../actions/admin.actions';

export interface State {
  documents: any;
  tutors: ITutor[];
  viewFeedback: [];
  testimonials: any;
  bookingDetail: [];
  studentProfile: [];
  previousTutors: [];
  feedbackOptions: [];
  bookingCounts: any;
  studentsFeedback: [];
  assignmentSummary: [];
  tutorReAssignment: any;
  studentTotalBooking: [];
  isApprovingDoc: boolean;
  isRejectingDoc: boolean;
  isLoadingTutors: boolean;
  tutorApprovalRequest: any;
  isEditingFeedback: boolean;
  isLoadingAdminDocs: boolean;
  isLoadingViewFeedback: boolean;
  isLoadingBookingDetail: boolean;
  isLoadingStudentProfile: boolean;
  isLoadingPreviousTutors: boolean;
  isLoadingStudentsFeedback: boolean;
  isLoadingAdminTestimonials: boolean;
  isLoadingAssignmentSummary: boolean;
  isLoadingTutorReAssignment: boolean;

  // Loading workforce capacity
  workforceCapacity: ICapacity[];
  isLoadingWorkforceCapacity: boolean;

  // Loading course booking list
  courseBooking: ISubject | null;
  isLoadingCourseBooking: boolean;

  // Classroom Bookings
  bookings: ICourse[];
  cancelledBookings: ICourse[];
  isLoadingBookings: boolean;
  isLoadingCancelledBookings: boolean;

  // Booking per course
  bookingPerCourse: any;
  isLoadingBookingPerCourse: boolean;

  // ommon loading
  isLoadingAdmin: boolean;

  // Loading course booking list
  tutorSchedule: ISchedule | null;
  isLoadingTutorSchedule: boolean;

  // Pagination
  pagination: IPagination;
}

export const initialState: State = {
  tutors: [],
  documents: [],
  bookings: [],
  testimonials: [],
  viewFeedback: [],
  bookingDetail: [],
  bookingCounts: {},
  studentProfile: [],
  previousTutors: [],
  feedbackOptions: [],
  tutorSchedule: null,
  courseBooking: null,
  bookingPerCourse: [],
  studentsFeedback: [],
  tutorReAssignment: [],
  assignmentSummary: [],
  cancelledBookings: [],
  isLoadingAdmin: false,
  isApprovingDoc: false,
  isRejectingDoc: false,
  workforceCapacity: [],
  isLoadingTutors: false,
  studentTotalBooking: [],
  tutorApprovalRequest: [],
  isEditingFeedback: false,
  pagination: { total: 0 },
  isLoadingAdminDocs: false,
  isLoadingBookings: false,
  isLoadingViewFeedback: false,
  isLoadingCourseBooking: false,
  isLoadingBookingDetail: false,
  isLoadingTutorSchedule: false,
  isLoadingPreviousTutors: false,
  isLoadingStudentProfile: false,
  isLoadingBookingPerCourse: false,
  isLoadingStudentsFeedback: false,
  isLoadingAdminTestimonials: false,
  isLoadingWorkforceCapacity: false,
  isLoadingCancelledBookings: false,
  isLoadingAssignmentSummary: false,
  isLoadingTutorReAssignment: false,
};

export const reducer = createReducer(
  initialState,
  on(adminActions.loadAdminDocuments, (state) => ({
    ...state,
    isLoadingAdminDocs: true,
  })),

  on(adminActions.loadAdminDocumentsSuccess, (state, { documents }) => ({
    ...state,
    documents,
    isLoadingAdminDocs: false,
  })),

  on(adminActions.loadAdminDocumentsFailure, (state) => ({
    ...state,
    isLoadingAdminDocs: false,
  })),

  on(adminActions.loadAdminTutors, (state) => ({
    ...state,
    isLoadingTutors: true,
  })),

  on(adminActions.loadAdminTutorsSuccess, (state, { tutors }) => ({
    ...state,
    tutors,
    isLoadingTutors: false,
  })),

  on(adminActions.loadAdminTutorsFailure, (state) => ({
    ...state,
    isLoadingTutors: false,
  })),

  on(adminActions.adminRejectDocument, (state) => ({
    ...state,
    isRejectingDoc: true,
  })),

  on(adminActions.adminRejectDocumentSuccess, (state, { document }) => {
    const finalState = {
      ...state,
      isRejectingDoc: false,
    };

    if (
      document.document === 'resume' &&
      finalState.documents?.resume?.length
    ) {
      const resume = finalState.documents.resume.map(
        (document: ITeacherDocument) =>
          document.id === document.id
            ? { ...document, status: 'rejected' }
            : document
      );

      finalState.documents = {
        ...finalState.documents,
        resume,
      };
    } else if (
      document.document === 'degrees' &&
      finalState.documents?.degrees?.length
    ) {
      const degrees = finalState.documents.degrees.map(
        (document: ITeacherDocument) =>
          document.id === document.id
            ? { ...document, status: 'rejected' }
            : document
      );

      finalState.documents = {
        ...finalState.documents,
        degrees,
      };
    } else if (
      document.document === 'certificates' &&
      finalState.documents?.certificates?.length
    ) {
      const certificates = finalState.documents.certificates.map(
        (document: ITeacherDocument) =>
          document.id === document.id
            ? { ...document, status: 'rejected' }
            : document
      );

      finalState.documents = {
        ...finalState.documents,
        certificates,
      };
    }

    return finalState;
  }),

  on(adminActions.adminRejectDocumentFailure, (state) => ({
    ...state,
    isRejectingDoc: false,
  })),

  on(adminActions.adminApproveDocument, (state) => ({
    ...state,
    isRejectingDoc: true,
  })),

  on(adminActions.adminApproveDocumentSuccess, (state, { document }) => {
    const finalState = {
      ...state,
      isRejectingDoc: false,
    };

    if (
      document.document === 'resume' &&
      finalState.documents?.resume?.length
    ) {
      const resume = finalState.documents.resume.map(
        (document: ITeacherDocument) =>
          document.id === document.id
            ? { ...document, status: 'approved' }
            : document
      );

      finalState.documents = {
        ...finalState.documents,
        resume,
      };
    } else if (
      document.document === 'degrees' &&
      finalState.documents?.degrees?.length
    ) {
      const degrees = finalState.documents.degrees.map(
        (document: ITeacherDocument) =>
          document.id === document.id
            ? { ...document, status: 'approved' }
            : document
      );

      finalState.documents = {
        ...finalState.documents,
        degrees,
      };
    } else if (
      document.document === 'certificates' &&
      finalState.documents?.certificates?.length
    ) {
      const certificates = finalState.documents.certificates.map(
        (document: ITeacherDocument) =>
          document.id === document.id
            ? { ...document, status: 'approved' }
            : document
      );

      finalState.documents = {
        ...finalState.documents,
        certificates,
      };
    }

    return finalState;
  }),

  on(adminActions.adminApproveDocumentFailure, (state) => ({
    ...state,
    isRejectingDoc: false,
  })),

  on(adminActions.loadWorkforceCapacity, (state) => ({
    ...state,
    isLoadingWorkforceCapacity: true,
  })),

  on(
    adminActions.loadWorkforceCapacitySuccess,
    (state, { total, workforceCapacity }) => ({
      ...state,
      workforceCapacity,
      pagination: { total },
      isLoadingWorkforceCapacity: false,
    })
  ),

  on(adminActions.loadWorkforceCapacityFailure, (state) => ({
    ...state,
    isLoadingWorkforceCapacity: false,
  })),

  on(adminActions.loadCourseBookingList, (state) => ({
    ...state,
    isLoadingCourseBooking: true,
  })),

  on(adminActions.loadCourseBookingListSuccess, (state, { courseBooking }) => ({
    ...state,
    courseBooking,
    isLoadingCourseBooking: false,
  })),

  on(adminActions.loadCourseBookingListFailure, (state) => ({
    ...state,
    isLoadingCourseBooking: false,
  })),

  on(adminActions.loadBookings, (state) => ({
    ...state,
    isLoadingBookings: true,
  })),

  on(
    adminActions.loadBookingsSuccess,
    (state, { bookings, bookingCounts }) => ({
      ...state,
      bookings,
      bookingCounts: {
        ...state.bookingCounts,
        ...bookingCounts,
      },
      isLoadingBookings: false,
    })
  ),

  on(adminActions.loadBookingsFailure, (state) => ({
    ...state,
    isLoadingBookings: false,
  })),

  on(adminActions.loadCancelledBookings, (state) => ({
    ...state,
    isLoadingCancelledBookings: true,
  })),

  on(
    adminActions.loadCancelledBookingsSuccess,
    (state, { cancelledBookings, bookingCounts }) => ({
      ...state,
      cancelledBookings,
      bookingCounts: {
        ...state.bookingCounts,
        ...bookingCounts,
      },
      isLoadingCancelledBookings: false,
    })
  ),

  on(adminActions.loadCancelledBookingsFailure, (state) => ({
    ...state,
    isLoadingCancelledBookings: false,
  })),

  on(
    adminActions.loadBookingDetail,
    adminActions.loadAdminTutorBookingDetail,
    adminActions.loadAdminStudentTotalBooking,
    adminActions.loadAdminStudentBookingDetail,
    (state) => ({
      ...state,
      isLoadingBookingDetail: true,
    })
  ),

  on(
    adminActions.loadBookingDetailSuccess,
    adminActions.loadAdminTutorBookingDetailSuccess,
    adminActions.loadAdminStudentBookingDetailSuccess,
    (state, { bookingDetail }) => ({
      ...state,
      bookingDetail,
      isLoadingBookingDetail: false,
    })
  ),

  on(
    adminActions.loadAdminStudentTotalBookingSuccess,
    (state, { studentTotalBooking }) => ({
      ...state,
      studentTotalBooking,
      isLoadingBookingDetail: false,
    })
  ),

  on(
    adminActions.loadBookingDetailFailure,
    adminActions.loadAdminTutorBookingDetailFailure,
    adminActions.loadAdminStudentTotalBookingFailure,
    adminActions.loadAdminStudentBookingDetailFailure,
    (state) => ({
      ...state,
      isLoadingBookingDetail: false,
    })
  ),

  on(adminActions.loadAdminCoursePreviousTutors, (state) => ({
    ...state,
    isLoadingPreviousTutors: true,
  })),

  on(
    adminActions.loadAdminCoursePreviousTutorsSuccess,
    (state, { previousTutors }) => ({
      ...state,
      previousTutors,
      isLoadingPreviousTutors: false,
    })
  ),

  on(adminActions.loadAdminCoursePreviousTutorsFailure, (state) => ({
    ...state,
    isLoadingPreviousTutors: false,
  })),

  on(adminActions.loadAdminStudentsFeedback, (state) => ({
    ...state,
    isLoadingStudentsFeedback: true,
  })),

  on(
    adminActions.loadAdminStudentsFeedbackSuccess,
    (state, { studentsFeedback }) => ({
      ...state,
      studentsFeedback,
      isLoadingStudentsFeedback: false,
    })
  ),

  on(adminActions.loadAdminStudentsFeedbackFailure, (state) => ({
    ...state,
    isLoadingStudentsFeedback: false,
  })),

  on(adminActions.loadAdminStudentProfile, (state) => ({
    ...state,
    isLoadingStudentProfile: true,
  })),

  on(
    adminActions.loadAdminStudentProfileSuccess,
    (state, { studentProfile }) => ({
      ...state,
      studentProfile,
      isLoadingStudentProfile: false,
    })
  ),

  on(adminActions.loadAdminStudentProfileFailure, (state) => ({
    ...state,
    isLoadingStudentProfile: false,
  })),

  on(adminActions.loadAdminStudentAssignmentSummary, (state) => ({
    ...state,
    isLoadingAssignmentSummary: true,
  })),

  on(
    adminActions.loadAdminStudentAssignmentSummarySuccess,
    (state, { assignmentSummary }) => ({
      ...state,
      assignmentSummary,
      isLoadingAssignmentSummary: false,
    })
  ),

  on(adminActions.loadAdminStudentAssignmentSummaryFailure, (state) => ({
    ...state,
    isLoadingAssignmentSummary: false,
  })),

  on(adminActions.loadAdminViewFeedback, (state) => ({
    ...state,
    isLoadingViewFeedback: true,
  })),

  on(adminActions.loadAdminViewFeedbackSuccess, (state, { viewFeedback }) => ({
    ...state,
    viewFeedback,
    isLoadingViewFeedback: false,
  })),

  on(adminActions.loadAdminViewFeedbackFailure, (state) => ({
    ...state,
    isLoadingViewFeedback: false,
  })),

  on(adminActions.loadAdminBookingPerCourse, (state) => ({
    ...state,
    isLoadingBookingPerCourse: true,
  })),

  on(adminActions.loadAdminBookingPerCourseFailure, (state) => ({
    ...state,
    isLoadingBookingPerCourse: false,
  })),

  on(
    adminActions.loadAdminBookingPerCourseSuccess,
    (state, { bookingPerCourse }) => ({
      ...state,
      bookingPerCourse,
      isLoadingBookingPerCourse: false,
    })
  ),

  on(adminActions.loadAdminTutorReAssignment, (state) => ({
    ...state,
    isLoadingTutorReAssignment: true,
  })),

  on(
    adminActions.loadAdminTutorReAssignmentSuccess,
    (state, { tutorReAssignment }) => ({
      ...state,
      tutorReAssignment,
      isLoadingTutorReAssignment: false,
    })
  ),

  on(adminActions.loadAdminTutorReAssignmentFailure, (state) => ({
    ...state,
    isLoadingBookingPerCourse: false,
  })),

  on(adminActions.loadAdminTestimonials, (state) => ({
    ...state,
    isLoadingAdminTestimonials: true,
  })),

  on(adminActions.loadAdminTestimonialsSuccess, (state, { testimonials }) => ({
    ...state,
    testimonials,
    isLoadingAdminTestimonials: false,
  })),

  on(adminActions.loadAdminTestimonialsFailure, (state) => ({
    ...state,
    isLoadingAdminTestimonials: false,
  })),

  on(
    adminActions.adminEditTestimonialStatusSuccess,
    (state, { id, status }) => {
      const finalState = {
        ...state,
        isLoadingAdmin: false,
      };

      if (finalState.testimonials?.userTestimonials?.data?.length) {
        const data = finalState.testimonials.userTestimonials.data.map(
          (testimonial: any) =>
            testimonial.sender.id === id
              ? {
                  ...testimonial,
                  status,
                }
              : testimonial
        );

        finalState.testimonials = {
          ...finalState.testimonials,
          userTestimonials: {
            ...finalState.testimonials.userTestimonials,
            data,
          },
        };
      }

      return finalState;
    }
  ),

  on(adminActions.adminEditTestimonialFeedback, (state) => ({
    ...state,
    isEditingFeedback: true,
  })),

  on(
    adminActions.adminEditTestimonialFeedbackSuccess,
    (state, { id, result }) => {
      const finalState = {
        ...state,
        isEditingFeedback: false,
      };

      if (finalState.testimonials?.userTestimonials?.data?.length) {
        const data = finalState.testimonials.userTestimonials.data.map(
          (testimonial: any) =>
            testimonial.sender.id === id
              ? {
                  ...testimonial,
                  ...camelcaseKeys(result?.feedbacks),
                }
              : testimonial
        );

        finalState.testimonials = {
          ...finalState.testimonials,
          userTestimonials: {
            ...finalState.testimonials.userTestimonials,
            data,
          },
        };
      }

      return finalState;
    }
  ),

  on(adminActions.adminEditTestimonialFeedbackFailure, (state) => ({
    ...state,
    isEditingFeedback: false,
  })),

  on(
    adminActions.loadAdminTestimonialFeedbackOptionsSuccess,
    (state, { feedbackOptions }) => ({
      ...state,
      feedbackOptions,
      isLoadingAdmin: false,
    })
  ),

  on(
    adminActions.loadAdminTutorApprovalRequestSuccess,
    (state, { tutorApprovalRequest }) => ({
      ...state,
      tutorApprovalRequest,
      isLoadingAdmin: false,
    })
  ),

  on(
    adminActions.adminChangeTutorAvailabilityStatusSuccess,
    (state, { status, id }) => {
      const finalState = {
        ...state,
        isLoadingAdmin: false,
      };

      if (finalState.tutorReAssignment?.completedCourses?.length) {
        const completedClasses =
          finalState.tutorReAssignment.completedCourses.map((course: any) =>
            course.id === id ? { ...course, teacherStatus: status } : course
          );

        finalState.tutorReAssignment = {
          ...finalState.tutorReAssignment,
          completedClasses,
        };
      }

      if (finalState.tutorReAssignment?.newlyRequestedCourses?.length) {
        const newlyRequestedCourses =
          finalState.tutorReAssignment.newlyRequestedCourses.map(
            (course: any) =>
              course.id === id ? { ...course, teacherStatus: status } : course
          );

        finalState.tutorReAssignment = {
          ...finalState.tutorReAssignment,
          newlyRequestedCourses,
        };
      }

      return finalState;
    }
  ),

  // COMMON LOADING
  on(
    adminActions.adminEditTestimonialStatus,
    adminActions.loadAdminTutorApprovalRequest,
    adminActions.adminChangeTutorAvailabilityStatus,
    adminActions.loadAdminTestimonialFeedbackOptions,
    (state) => ({
      ...state,
      isLoadingAdmin: true,
    })
  ),

  on(
    adminActions.adminEditTestimonialStatusFailure,
    adminActions.loadAdminTutorApprovalRequestFailure,
    adminActions.adminChangeTutorAvailabilityStatusFailure,
    adminActions.loadAdminTestimonialFeedbackOptionsFailure,
    (state) => ({
      ...state,
      isLoadingAdmin: false,
    })
  ),

  on(adminActions.loadAdminTutorSchedule, (state) => ({
    ...state,
    isLoadingTutorSchedule: true,
  })),

  on(adminActions.loadAdminTutorScheduleSuccess, (state, { schedule }) => ({
    ...state,
    tutorSchedule: schedule,
    isLoadingTutorSchedule: false,
  })),

  on(adminActions.loadAdminTutorScheduleFailure, (state) => ({
    ...state,
    isLoadingTutorSchedule: false,
  }))
);

export const selectAdminDocuments = (state: State): ITeacherDocument[] =>
  state.documents;

export const selectIsLoadingAdminDocs = (state: State): boolean =>
  state.isLoadingAdminDocs;

export const selectAdminTutors = (state: State): ITutor[] => state.tutors;

export const selectIsLoadingAdminTutors = (state: State): boolean =>
  state.isLoadingTutors;

export const selectIsRejectingAdminDocs = (state: State): boolean =>
  state.isRejectingDoc;

export const selectIsApprovingAdminDocs = (state: State): boolean =>
  state.isApprovingDoc;

export const selectIsLoadingWorkforceCapacity = (state: State): boolean =>
  state.isLoadingWorkforceCapacity;

export const selectWorkforceCapacity = (state: State): ICapacity[] =>
  state.workforceCapacity;

export const selectIsLoadingCourseBooking = (state: State): boolean =>
  state.isLoadingCourseBooking;

export const selectCourseBooking = (state: State): ISubject | null =>
  state.courseBooking;

export const selectIsLoadingBookings = (state: State): boolean =>
  state.isLoadingBookings;

export const selectBookings = (state: State): ICourse[] => state.bookings;

export const selectBookingCounts = (state: State): any => state.bookingCounts;

export const selectAdminBookingDetail = (state: State): ICourse[] =>
  state.bookingDetail;

export const selectIsLoadingAdminBookingDetail = (state: State): boolean =>
  state.isLoadingBookingDetail;

export const selectAdminCoursePreviousTutors = (state: State): ICourse[] =>
  state.previousTutors;

export const selectIsLoadingPreviousTutors = (state: State): boolean =>
  state.isLoadingPreviousTutors;

export const selectAdminStudentsFeedback = (state: State): any =>
  state.studentsFeedback;

export const selectIsLoadingAdminStudentsFeedback = (state: State): boolean =>
  state.isLoadingStudentsFeedback;

export const selectAdminStudentProfile = (state: State): any =>
  state.studentProfile;

export const selectAdminStudentTotalBooking = (state: State): any =>
  state.studentTotalBooking;

export const selectIsLoadingAdminStudentProfile = (state: State): boolean =>
  state.isLoadingStudentProfile;

export const selectAdminStudentAssignmentSummary = (state: State): any =>
  state.assignmentSummary;

export const selectIsLoadingStudentAssignmentSummary = (
  state: State
): boolean => state.isLoadingAssignmentSummary;

export const selectAdminViewFeedback = (state: State): any =>
  state.viewFeedback;

export const selectIsLoadingViewFeedback = (state: State): boolean =>
  state.isLoadingViewFeedback;

export const selectBookingPerCourse = (state: State): any =>
  state.bookingPerCourse;

export const selectIsLoadingBookingPerCourse = (state: State): boolean =>
  state.isLoadingBookingPerCourse;

export const selectAdminTutorReAssignment = (state: State): any =>
  state.tutorReAssignment;

export const selectIsLoadingAdminTutorReAssignment = (state: State): boolean =>
  state.isLoadingTutorReAssignment;

export const selectAdminTestimonials = (state: State): any =>
  state.testimonials;

export const selectAdminTestimonialFeedbackOptions = (state: State): any =>
  state.feedbackOptions;

export const selectAdminTutorApprovalRequest = (state: State): any =>
  state.tutorApprovalRequest;

export const selectIsLoadingAdmin = (state: State): boolean =>
  state.isLoadingAdmin;

export const selectIsLoadingAdminTestimonials = (state: State): boolean =>
  state.isLoadingAdminTestimonials;

export const selectIsEditingAdminTestimonialFeedback = (
  state: State
): boolean => state.isEditingFeedback;

export const selectAdminTutorSchedule = (state: State): ISchedule | null =>
  state.tutorSchedule;

export const selectIsLoadingTutorSchedule = (state: State): boolean =>
  state.isLoadingTutorSchedule;

export const selectAdminPagination = (state: State): IPagination =>
  state.pagination;

export const selectIsLoadingCancelledBookings = (state: State): boolean =>
  state.isLoadingCancelledBookings;

export const selectCancelledBookings = (state: State): ICourse[] =>
  state.cancelledBookings;

export const selectStudentCancelledBookings = (state: State): ICourse[] =>
  state.cancelledBookings.filter(
    (booking) => booking.cancelledBy === CourseStatus.studentCancelled
  );

export const selectAdminCancelledBookings = (state: State): ICourse[] =>
  state.cancelledBookings.filter(
    (booking) => booking.cancelledBy === CourseStatus.adminCancelled
  );

export const selectTeacherCancelledBookings = (state: State): ICourse[] =>
  state.cancelledBookings.filter(
    (booking) => booking.cancelledBy === CourseStatus.teacherCancelled
  );
