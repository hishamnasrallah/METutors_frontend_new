import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatMessages } from '../../Messages/CometChat-messages/cometchat-messages.module';
import { CometChatUserDetails } from '../../Users/CometChat-user-details/cometchat-user-details.module';
import { CometChatImageViewer } from '../../Messages/CometChat-image-viewer/cometchat-image-viewer.module';
import { CometChatIncomingCall } from '../../Calls/CometChat-incoming-call/cometchat-incoming-call.module';
import { CometChatOutgoingCall } from '../../Calls/CometChat-outgoing-call/cometchat-outgoing-call.module';
import { CometChatGroupDetails } from '../../Groups/CometChat-group-details/cometchat-group-details.module';
import { CometChatConversationList } from '../CometChat-conversation-list/cometchat-conversation-list.module';
import { CometChatMessageThread } from '../../Messages/CometChat-message-thread/cometchat-message-thread.module';
import { CometChatOutgoingDirectCall } from '../../Calls/CometChatOutgoingDirectCall/cometchat-outgoing-direct-call.module';
import { CometChatConversationListWithMessagesComponent } from './cometchat-conversation-list-with-messages/cometchat-conversation-list-with-messages.component';
@NgModule({
  declarations: [CometChatConversationListWithMessagesComponent],
  imports: [
    CommonModule,
    CometChatMessages,
    CometChatUserDetails,
    CometChatImageViewer,
    CometChatGroupDetails,
    CometChatIncomingCall,
    CometChatOutgoingCall,
    CometChatMessageThread,
    CometChatConversationList,
    CometChatOutgoingDirectCall
  ],
  exports: [CometChatConversationListWithMessagesComponent]
})
export class CometChatConversationListWithMessages {}
