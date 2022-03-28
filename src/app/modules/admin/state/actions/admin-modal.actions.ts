import { createAction } from '@ngrx/store';

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

export const openAdminInterviewAttachmentModal = createAction(
  '[Admin Modal] Open Admin Interview Attachment Modal'
);

export const closeAdminInterviewAttachmentModal = createAction(
  '[Admin Modal] Close Admin Interview Attachment Modal'
);
