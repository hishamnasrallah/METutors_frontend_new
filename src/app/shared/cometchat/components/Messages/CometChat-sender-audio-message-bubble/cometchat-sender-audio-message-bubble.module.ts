import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatReadReceipt } from '../CometChat-read-receipt/cometchat-read-receipt.module';
import { CometChatMessageActions } from '../CometChat-message-actions/cometchat-message-actions.module';
import { CometChatMessageReactions } from '../Extensions/CometChat-message-reactions/cometchat-message-reactions.module';
import { CometChatThreadedMessageReplyCount } from '../CometChat-threaded-message-reply-count/cometchat-threaded-message-reply-count.module';
import { CometChatSenderAudioMessageBubbleComponent } from './cometchat-sender-audio-message-bubble/cometchat-sender-audio-message-bubble.component';

@NgModule({
  declarations: [CometChatSenderAudioMessageBubbleComponent],
  imports: [
    CommonModule,
    CometChatReadReceipt,
    CometChatMessageActions,
    CometChatMessageReactions,
    CometChatThreadedMessageReplyCount
  ],
  exports: [CometChatSenderAudioMessageBubbleComponent]
})
export class CometChatSenderAudioMessageBubble {}
