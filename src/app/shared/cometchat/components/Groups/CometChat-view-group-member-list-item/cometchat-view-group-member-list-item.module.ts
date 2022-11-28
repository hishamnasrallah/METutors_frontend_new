import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatViewGroupMemberListItemComponent } from './cometchat-view-group-member-list-item/cometchat-view-group-member-list-item.component';

@NgModule({
  declarations: [CometChatViewGroupMemberListItemComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatViewGroupMemberListItemComponent]
})
export class CometChatViewGroupMemberListItem {}
