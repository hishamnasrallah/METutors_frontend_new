import { createReducer, on } from '@ngrx/store';

import {
  ITutor,
  ICourse,
  ISubject,
  ICapacity,
  ITeacherDocument,
} from '@models';

import { CourseStatus } from '@metutor/config';
import * as adminActions from '../actions/admin.actions';

export interface State {
  tutors: ITutor[];
  viewFeedback: [];
  bookingDetail: [];
  studentProfile: [];
  previousTutors: [];
  bookingsCounts: any;
  studentsFeedback: [];
  tutorReAssignment: [];
  assignmentSummary: [];
  studentTotalBooking: [];
  isApprovingDoc: boolean;
  isRejectingDoc: boolean;
  isLoadingTutors: boolean;
  studentBookingDetail: [];
  isLoadingAdminDocs: boolean;
  documents: ITeacherDocument[];
  isLoadingViewFeedback: boolean;
  isLoadingBookingDetail: boolean;
  isLoadingStudentProfile: boolean;
  isLoadingPreviousTutors: boolean;
  isLoadingStudentsFeedback: boolean;
  isLoadingAssignmentSummary: boolean;
  isLoadingTutorReAssignment: boolean;

  // Loading workforce capacity
  workforceCapacity: ICapacity[];
  isLoadingWorkforceCapacity: boolean;

  // Loading course booking list
  courseBooking: ISubject | null;
  isLoadingCourseBooking: boolean;

  // Classroom Bookings
  allBookings: ICourse[];
  runningBookings: ICourse[];
  completedBookings: ICourse[];
  cancelledBookings: ICourse[];
  isLoadingAllBookings: boolean;
  isLoadingRunningBookings: boolean;
  isLoadingCompletedBookings: boolean;
  isLoadingCancelledBookings: boolean;

  // Booking per course
  bookingPerCourse: any;
  isLoadingBookingPerCourse: boolean;
}

export const initialState: State = {
  tutors: [],
  documents: [],
  allBookings: [],
  viewFeedback: [],
  bookingDetail: [],
  bookingsCounts: {},
  studentProfile: [],
  previousTutors: [],
  runningBookings: [],
  courseBooking: null,
  bookingPerCourse: [],
  studentsFeedback: [],
  tutorReAssignment: [],
  assignmentSummary: [],
  completedBookings: [],
  cancelledBookings: [],
  isApprovingDoc: false,
  isRejectingDoc: false,
  workforceCapacity: [],
  isLoadingTutors: false,
  studentTotalBooking: [],
  studentBookingDetail: [],
  isLoadingAdminDocs: false,
  isLoadingAllBookings: false,
  isLoadingViewFeedback: false,
  isLoadingCourseBooking: false,
  isLoadingBookingDetail: false,
  isLoadingPreviousTutors: false,
  isLoadingStudentProfile: false,
  isLoadingRunningBookings: false,
  isLoadingBookingPerCourse: false,
  isLoadingStudentsFeedback: false,
  isLoadingWorkforceCapacity: false,
  isLoadingCompletedBookings: false,
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

  on(adminActions.adminRejectDocumentSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isRejectingDoc: false,
    };

    if (finalState.documents.length) {
      finalState.documents = finalState.documents.map(
        (document: ITeacherDocument) =>
          document.id === id ? { ...document, status: 'rejected' } : document
      );
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

  on(adminActions.adminApproveDocumentSuccess, (state, { id }) => {
    const finalState = {
      ...state,
      isRejectingDoc: false,
    };

    if (finalState.documents.length) {
      finalState.documents = finalState.documents.map(
        (document: ITeacherDocument) =>
          document.id === id ? { ...document, status: 'approved' } : document
      );
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
    (state, { workforceCapacity }) => ({
      ...state,
      workforceCapacity,
      isLoadingWorkforceCapacity: false,
    })
  ),

  on(
    adminActions.loadWorkforceCapacityEnded,
    adminActions.loadWorkforceCapacityFailure,
    (state) => ({
      ...state,
      isLoadingWorkforceCapacity: false,
    })
  ),

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

  on(adminActions.loadAllBookings, (state) => ({
    ...state,
    isLoadingAllBookings: true,
  })),

  on(
    adminActions.loadAllBookingsSuccess,
    (state, { allBookings, bookingsCounts }) => ({
      ...state,
      allBookings,
      bookingsCounts: {
        ...state.bookingsCounts,
        ...bookingsCounts,
      },
      isLoadingAllBookings: false,
    })
  ),

  on(
    adminActions.loadAllBookingsEnded,
    adminActions.loadAllBookingsFailure,
    (state) => ({
      ...state,
      isLoadingAllBookings: false,
    })
  ),

  on(adminActions.loadCompletedBookings, (state) => ({
    ...state,
    isLoadingCompletedBookings: true,
  })),

  on(
    adminActions.loadCompletedBookingsSuccess,
    (state, { completedBookings }) => ({
      ...state,
      completedBookings,
      isLoadingCompletedBookings: false,
    })
  ),

  on(
    adminActions.loadCompletedBookingsEnded,
    adminActions.loadCompletedBookingsFailure,
    (state) => ({
      ...state,
      isLoadingCompletedBookings: false,
    })
  ),

  on(adminActions.loadRunningBookings, (state) => ({
    ...state,
    isLoadingRunningBookings: true,
  })),

  on(adminActions.loadRunningBookingsSuccess, (state, { runningBookings }) => ({
    ...state,
    runningBookings,
    isLoadingRunningBookings: false,
  })),

  on(
    adminActions.loadRunningBookingsEnded,
    adminActions.loadRunningBookingsFailure,
    (state) => ({
      ...state,
      isLoadingRunningBookings: false,
    })
  ),

  on(adminActions.loadCancelledBookings, (state) => ({
    ...state,
    isLoadingCancelledBookings: true,
  })),

  on(
    adminActions.loadCancelledBookingsSuccess,
    (state, { cancelledBookings, bookingsCounts }) => ({
      ...state,
      cancelledBookings,
      bookingsCounts: {
        ...state.bookingsCounts,
        ...bookingsCounts,
      },
      isLoadingCancelledBookings: false,
    })
  ),

  on(
    adminActions.loadCancelledBookingsEnded,
    adminActions.loadCancelledBookingsFailure,
    (state) => ({
      ...state,
      isLoadingCancelledBookings: false,
    })
  ),

  on(adminActions.loadBookingDetail, (state) => ({
    ...state,
    isLoadingBookingDetail: true,
  })),

  on(adminActions.loadBookingDetailSuccess, (state, { bookingDetail }) => ({
    ...state,
    bookingDetail,
    isLoadingBookingDetail: false,
  })),

  on(adminActions.loadBookingDetailFailure, (state) => ({
    ...state,
    isLoadingBookingDetail: false,
  })),

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

  on(adminActions.loadAdminStudentBookingDetail, (state) => ({
    ...state,
    isLoadingBookingDetail: true,
  })),

  on(
    adminActions.loadAdminStudentBookingDetailSuccess,
    (state, { studentBookingDetail }) => ({
      ...state,
      studentBookingDetail,
      isLoadingBookingDetail: false,
    })
  ),

  on(adminActions.loadAdminStudentBookingDetailFailure, (state) => ({
    ...state,
    isLoadingBookingDetail: false,
  })),

  on(adminActions.loadAdminStudentTotalBooking, (state) => ({
    ...state,
    isLoadingBookingDetail: true,
  })),

  on(
    adminActions.loadAdminStudentTotalBookingSuccess,
    (state, { studentTotalBooking }) => ({
      ...state,
      studentTotalBooking,
      isLoadingBookingDetail: false,
    })
  ),

  on(adminActions.loadAdminStudentTotalBookingFailure, (state) => ({
    ...state,
    isLoadingBookingDetail: false,
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

  on(adminActions.loadAdminStudentViewFeedback, (state) => ({
    ...state,
    isLoadingViewFeedback: true,
  })),

  on(
    adminActions.loadAdminStudentViewFeedbackSuccess,
    (state, { viewFeedback }) => ({
      ...state,
      viewFeedback,
      isLoadingViewFeedback: false,
    })
  ),

  on(adminActions.loadAdminStudentViewFeedbackFailure, (state) => ({
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

export const selectIsLoadingAllBookings = (state: State): boolean =>
  state.isLoadingAllBookings;

export const selectAllBookings = (state: State): ICourse[] => state.allBookings;

export const selectIsLoadingRunningBookings = (state: State): boolean =>
  state.isLoadingRunningBookings;

export const selectRunningBookings = (state: State): ICourse[] =>
  state.runningBookings;

export const selectIsLoadingCompletedBookings = (state: State): boolean =>
  state.isLoadingCompletedBookings;

export const selectCompletedBookings = (state: State): ICourse[] =>
  state.completedBookings;

export const selectIsLoadingCancelledBookings = (state: State): boolean =>
  state.isLoadingCancelledBookings;

export const selectCancelledBookings = (state: State): ICourse[] =>
  state.cancelledBookings;

export const selectBookingsCounts = (state: State): any => state.bookingsCounts;

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

export const selectAdminStudentBookingDetail = (state: State): any =>
  state.studentBookingDetail;

export const selectAdminStudentTotalBooking = (state: State): any =>
  state.studentTotalBooking;

export const selectIsLoadingAdminStudentProfile = (state: State): boolean =>
  state.isLoadingStudentProfile;

export const selectAdminStudentAssignmentSummary = (state: State): any =>
  state.assignmentSummary;

export const selectIsLoadingStudentAssignmentSummary = (
  state: State
): boolean => state.isLoadingAssignmentSummary;

export const selectAdminStudentViewFeedback = (state: State): any =>
  state.viewFeedback;

export const selectIsLoadingStudentViewFeedback = (state: State): boolean =>
  state.isLoadingViewFeedback;

export const selectBookingPerCourse = (state: State): any =>
  state.bookingPerCourse;

export const selectIsLoadingBookingPerCourse = (state: State): boolean =>
  state.isLoadingBookingPerCourse;

export const selectAdminTutorReAssignment = (state: State): any =>
  state.tutorReAssignment;

export const selectIsLoadingAdminTutorReAssignment = (state: State): boolean =>
  state.isLoadingTutorReAssignment;

export const selectFilteredWorkforceCapacity = (
  state: State,
  props?: any
): ICapacity[] | null => {
  let workforceCapacity: ICapacity[] = [];

  if (state.workforceCapacity && state.workforceCapacity.length && props) {
    workforceCapacity = getFilteredWorkforceCapacity(
      state.workforceCapacity,
      props
    );
  }

  return workforceCapacity;
};

const getFilteredWorkforceCapacity = (
  workforceCapacity: ICapacity[],
  props: any
) => {
  if (props?.name) {
    workforceCapacity = workforceCapacity?.filter((tutor) =>
      tutor?.subject?.name?.toLowerCase()?.includes(props.name.toLowerCase())
    );
  }

  return workforceCapacity;
};

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
