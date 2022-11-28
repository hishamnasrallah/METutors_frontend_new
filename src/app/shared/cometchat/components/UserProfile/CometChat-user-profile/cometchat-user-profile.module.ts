import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatAvatar } from '../../Shared/CometChat-avatar/cometchat-avatar.module';
import { CometChatUserProfileComponent } from './cometchat-user-profile/cometchat-user-profile.component';

@NgModule({
  declarations: [CometChatUserProfileComponent],
  imports: [CommonModule, CometChatAvatar],
  exports: [CometChatUserProfileComponent]
})
export class CometChatUserProfile {}
