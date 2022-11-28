import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatGroupListItemComponent } from './cometchat-group-list-item/cometchat-group-list-item.component';
@NgModule({
  declarations: [CometChatGroupListItemComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatGroupListItemComponent]
})
export class CometChatGroupListItem {}
