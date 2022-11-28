import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatReadReceipt } from '../../CometChat-read-receipt/cometchat-read-receipt.module';
import { CometChatMessageActions } from '../../CometChat-message-actions/cometchat-message-actions.module';
import { CometChatMessageReactions } from '../CometChat-message-reactions/cometchat-message-reactions.module';
import { CometChatThreadedMessageReplyCount } from '../../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module';
import { CometChatSenderPollMessageBubbleComponent } from './cometchat-sender-poll-message-bubble/cometchat-sender-poll-message-bubble.component';

@NgModule({
  declarations: [CometChatSenderPollMessageBubbleComponent],
  imports: [
    CommonModule,
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount
  ],
  exports: [CometChatSenderPollMessageBubbleComponent]
})
export class CometChatSenderPollMessageBubble {}
