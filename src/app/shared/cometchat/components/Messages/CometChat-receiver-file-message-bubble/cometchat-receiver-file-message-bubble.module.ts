import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatReadReceipt } from '../CometChat-read-receipt/cometchat-read-receipt.module';
import { CometChatMessageActions } from '../CometChat-message-actions/cometchat-message-actions.module';
import { CometChatMessageReactions } from '../Extensions/CometChat-message-reactions/cometchat-message-reactions.module';
import { CometChatThreadedMessageReplyCount } from '../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module';
import { CometChatReceiverFileMessageBubbleComponent } from './cometchat-receiver-file-message-bubble/cometchat-receiver-file-message-bubble.component';

@NgModule({
  declarations: [CometChatReceiverFileMessageBubbleComponent],
  imports: [
    CommonModule,
    CometChatAvatar,
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount
  ],
  exports: [CometChatReceiverFileMessageBubbleComponent]
})
export class CometChatReceiverFileMessageBubble {}
