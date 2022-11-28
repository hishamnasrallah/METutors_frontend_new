import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatUserListComponent } from './cometchat-user-list/cometchat-user-list.component';

@NgModule({
  declarations: [CometChatUserListComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatUserListComponent]
})
export class CometChatUserList {}
