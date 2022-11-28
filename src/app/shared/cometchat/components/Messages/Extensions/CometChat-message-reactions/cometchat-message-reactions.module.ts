import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CometChatMessageReactionsComponent } from './cometchat-message-reactions/cometchat-message-reactions.component';

@NgModule({
  declarations: [CometChatMessageReactionsComponent],
  imports: [CommonModule, PickerModule, EmojiModule],
  exports: [CometChatMessageReactionsComponent]
})
export class CometChatMessageReactions {}
