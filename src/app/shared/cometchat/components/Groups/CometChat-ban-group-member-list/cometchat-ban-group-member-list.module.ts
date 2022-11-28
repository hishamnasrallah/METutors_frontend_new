import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatBanGroupMemberListComponent } from './cometchat-ban-group-member-list/cometchat-ban-group-member-list.component';

@NgModule({
  declarations: [CometChatBanGroupMemberListComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatBanGroupMemberListComponent]
})
export class CometChatBanGroupMemberList {}
