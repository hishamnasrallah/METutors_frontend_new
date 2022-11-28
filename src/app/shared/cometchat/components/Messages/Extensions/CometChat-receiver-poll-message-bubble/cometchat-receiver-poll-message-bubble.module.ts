import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatReadReceipt } from '../../CometChat-read-receipt/cometchat-read-receipt.module';
import { CometChatMessageActions } from '../../CometChat-message-actions/cometchat-message-actions.module';
import { CometChatMessageReactions } from '../CometChat-message-reactions/cometchat-message-reactions.module';
import { CometChatThreadedMessageReplyCount } from '../../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module';
import { CometChatReceiverPollMessageBubbleComponent } from './cometchat-receiver-poll-message-bubble/cometchat-receiver-poll-message-bubble.component';

@NgModule({
  declarations: [CometChatReceiverPollMessageBubbleComponent],
  imports: [
    CommonModule,
    CometChatAvatar,
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount
  ],
  exports: [CometChatReceiverPollMessageBubbleComponent]
})
export class CometChatReceiverPollMessageBubble {}
