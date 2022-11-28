import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatBackdrop } from '../../Shared/CometChat-backdrop/cometchat-backdrop.module';
import { CometChatBanGroupMemberList } from '../CometChat-ban-group-member-list/cometchat-ban-group-member-list.module';
import { CometChatBanGroupMemberListItemComponent } from './cometchat-ban-group-member-list-item/cometchat-ban-group-member-list-item.component';

@NgModule({
  declarations: [CometChatBanGroupMemberListItemComponent],
  imports: [CommonModule, CometChatBackdrop, CometChatBanGroupMemberList],
  exports: [CometChatBanGroupMemberListItemComponent]
})
export class CometChatBanGroupMemberListItem {}
