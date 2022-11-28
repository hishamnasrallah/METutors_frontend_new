import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatMessageHeaderComponent } from './cometchat-message-header/cometchat-message-header.component';
import { CometChatOutgoingDirectCall } from '../../Calls/CometChatOutgoingDirectCall/cometchat-outgoing-direct-call.module';
import { CometChatIncomingDirectCall } from '../../Calls/CometChatIncomingDirectCall/cometchat-incoming-direct-call.module';

@NgModule({
  declarations: [CometChatMessageHeaderComponent],
  imports: [
    CommonModule,
    CometChatAvatar,
    CometChatOutgoingDirectCall,
    CometChatIncomingDirectCall
  ],
  exports: [CometChatMessageHeaderComponent],
  providers: [DatePipe]
})
export class CometChatMessageHeader {}
