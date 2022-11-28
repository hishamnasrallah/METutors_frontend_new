import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatBackdrop } from './../CometChat-backdrop/cometchat-backdrop.module';
import { CometChatConfirmDialogComponent } from './cometchat-confirm-dialog/cometchat-confirm-dialog.component';

@NgModule({
  declarations: [CometChatConfirmDialogComponent],
  imports: [CommonModule, CometChatBackdrop],
  exports: [CometChatConfirmDialogComponent]
})
export class CometChatConfirmDialogModule {}
