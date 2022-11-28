import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatBackdrop } from '../../Shared/CometChat-backdrop/cometchat-backdrop.module';
import { CometChatCreateGroupComponent } from './cometchat-create-group/cometchat-create-group.component';

@NgModule({
  declarations: [CometChatCreateGroupComponent],
  imports: [CommonModule, CometChatBackdrop],
  exports: [CometChatCreateGroupComponent]
})
export class CometChatCreateGroup {}
