import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatReadReceipt } from '../CometChat-read-receipt/cometchat-read-receipt.module';
import { CometChatMessageActions } from '../CometChat-message-actions/cometchat-message-actions.module';
import { CometChatMessageReactions } from '../Extensions/CometChat-message-reactions/cometchat-message-reactions.module';
import { CometChatThreadedMessageReplyCount } from '../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module';
import { CometChatSenderImageMessageBubbleComponent } from './cometchat-sender-image-message-bubble/cometchat-sender-image-message-bubble.component';

@NgModule({
  declarations: [CometChatSenderImageMessageBubbleComponent],
  imports: [
    CommonModule,
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount
  ],
  exports: [CometChatSenderImageMessageBubbleComponent]
})
export class CometChatSenderImageMessageBubble {}
