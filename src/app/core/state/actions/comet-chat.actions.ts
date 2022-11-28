import { createAction, props } from '@ngrx/store';

export const initCometChat = createAction('[CometChat] Initiate CometChat');

export const initCometChatSuccess = createAction(
  '[CometChat] Initiate CometChat Success',
  props<{ accessToken: string }>()
);

export const initCometChatError = createAction(
  '[CometChat] Initiate CometChat Error'
);

export const initCometChatEnded = createAction(
  '[CometChat] Initiate CometChat Ended'
);

export const disconnectCometChat = createAction(
  '[CometChat] Disconnect CometChat'
);
