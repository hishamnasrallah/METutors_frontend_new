import { createAction, props } from '@ngrx/store';

export const openAdminSendMeetingLinkModal = createAction(
  '[Admin Modal] Open Admin Send Meeting Link Modal'
);

export const closeAdminSendMeetingLinkModal = createAction(
  '[Admin Modal] Close Admin Send Meeting Link Modal'
);

export const openAdminHourlyRatePerSubjectModal = createAction(
  '[Admin Modal] Open Admin Hourly Rate Per Subject Modal'
);

export const closeAdminHourlyRatePerSubjectModal = createAction(
  '[Admin Modal] Close Admin Hourly Rate Per Subject Modal'
);

export const openAdminDeclineInterviewModal = createAction(
  '[Admin Modal] Open Admin Decline Interview Modal'
);

export const closeAdminDeclineInterviewModal = createAction(
  '[Admin Modal] Close Admin Decline Interview Modal'
);

export const openAdminInterviewAttachmentModal = createAction(
  '[Admin Modal] Open Admin Interview Attachment Modal'
);

export const closeAdminInterviewAttachmentModal = createAction(
  '[Admin Modal] Close Admin Interview Attachment Modal'
);

export const openAdminAddNewProgramModal = createAction(
  '[Admin Modal] Open Admin Add New Program Modal'
);

export const closeAdminAddNewProgramModal = createAction(
  '[Admin Modal] Close Admin Add New Program Modal'
);

export const openAdminAddNewFieldModal = createAction(
  '[Admin Modal] Open Admin Add New Field Modal'
);

export const closeAdminAddNewFieldModal = createAction(
  '[Admin Modal] Close Admin Add New Field Modal'
);

export const openAdminAddNewSubjectModal = createAction(
  '[Admin Modal] Open Admin Add New Subject Modal'
);

export const closeAdminAddNewSubjectModal = createAction(
  '[Admin Modal] Close Admin Add New Subject Modal'
);

export const openAdminAddNewCountryModal = createAction(
  '[Admin Modal] Open Admin Add New Country Modal'
);

export const closeAdminAddNewCountryModal = createAction(
  '[Admin Modal] Close Admin Add New Country Modal'
);

export const openAdminScheduleInterviewModal = createAction(
  '[Admin Modal] Open Admin Schedule Interview Modal'
);

export const closeAdminScheduleInterviewModal = createAction(
  '[Admin Modal] Close Admin schedule Interview Modal'
);

export const openAdminCourseBookingListModal = createAction(
  '[Admin Modal] Open Admin Course Booking List Modal'
);

export const closeAdminCourseBookingListModal = createAction(
  '[Admin Modal] Close Admin Course Booking List Modal'
);

export const openAdminTutorListModal = createAction(
  '[Admin Modal] Open Admin Tutor List Modal',
  props<{ tutorType: string; id: number }>()
);

export const closeAdminTutorListModal = createAction(
  '[Admin Modal] Close Admin Tutor List Modal'
);

export const openAdminStudentsFeedbackModal = createAction(
  '[Admin Modal] Open Admin Students Feedback Modal'
);

export const closeAdminStudentsFeedbackModal = createAction(
  '[Admin Modal] Close Admin Students Feedback Modal'
);

export const openAdminPreviousTeacherModal = createAction(
  '[Admin Modal] Open Admin Previous Teacher Modal'
);

export const closeAdminPreviousTeacherModal = createAction(
  '[Admin Modal] Close Admin Previous Teacher Modal'
);

export const openAdminReassigningTutorSelectionModal = createAction(
  '[Admin Modal] Open Admin Reassigning Tutor Selection Modal'
);

export const closeAdminReassigningTutorSelectionModal = createAction(
  '[Admin Modal] Close Admin Reassigning Tutor Selection Modal'
);

export const openAdminChangeStatusModal = createAction(
  '[Admin Modal] Open Admin Change Status Modal'
);

export const closeAdminChangeStatusModal = createAction(
  '[Admin Modal] Close Admin Change Status Modal'
);

export const openAdminStudentBookingModal = createAction(
  '[Admin Modal] Open Admin Student Booking Modal'
);

export const closeAdminStudentBookingModal = createAction(
  '[Admin Modal] Close Admin Student Booking Modal'
);

export const openAdminStudentViewAssignmentsModal = createAction(
  '[Admin Modal] Open Admin Student View Assignments Modal'
);

export const closeAdminStudentViewAssignmentsModal = createAction(
  '[Admin Modal] Close Admin Student View Assignments Modal'
);

export const openAdminStudentViewFeedbackModal = createAction(
  '[Admin Modal] Open Admin Student View Feedback Modal'
);

export const closeAdminStudentViewFeedbackModal = createAction(
  '[Admin Modal] Close Admin Student View Feedback Modal'
);
