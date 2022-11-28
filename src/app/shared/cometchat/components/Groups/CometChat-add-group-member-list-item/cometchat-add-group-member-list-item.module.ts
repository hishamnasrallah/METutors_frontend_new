import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatAddGroupMemberListItemComponent } from './cometchat-add-group-member-list-item/cometchat-add-group-member-list-item.component';

@NgModule({
  declarations: [CometChatAddGroupMemberListItemComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatAddGroupMemberListItemComponent]
})
export class CometChatAddGroupMemberListItem {}
