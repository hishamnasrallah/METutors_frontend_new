import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatMessagesComponent } from './cometchat-messages/cometchat-messages.component';
import { CometChatMessageList } from '../CometChat-message-list/cometchat-message-list.module';
import { CometChatMessageHeader } from '../CometChat-message-header/cometchat-message-header.module';
import { CometChatLiveReactions } from '../CometChat-live-reactions/cometchat-live-reactions.module';
import { CometChatMessageComposer } from '../CometChat-message-composer/cometchat-message-composer.module';

@NgModule({
  declarations: [CometChatMessagesComponent],
  imports: [
    CommonModule,
    CometChatMessageHeader,
    CometChatMessageComposer,
    CometChatMessageList,
    CometChatLiveReactions
  ],
  exports: [CometChatMessagesComponent]
})
export class CometChatMessages {}
