import { createAction } from '@ngrx/store';

export const openAdminSendMeetingLinkModal = createAction(
  '[Admin Modal] Open Admin Send Meeting Link Modal'
);

export const closeAdminSendMeetingLinkModal = createAction(
  '[Admin Modal] Close Admin Send Meeting Link Modal'
);
