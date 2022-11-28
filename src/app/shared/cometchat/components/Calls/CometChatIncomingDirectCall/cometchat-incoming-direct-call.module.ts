import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatIncomingDirectCallComponent } from './cometchat-incoming-direct-call/cometchat-incoming-direct-call.component';

@NgModule({
  declarations: [CometChatIncomingDirectCallComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatIncomingDirectCallComponent]
})
export class CometChatIncomingDirectCall {}
