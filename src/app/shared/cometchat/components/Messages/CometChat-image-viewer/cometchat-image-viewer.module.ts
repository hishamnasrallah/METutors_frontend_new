import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CometChatBackdrop } from '../../Shared/CometChat-backdrop/cometchat-backdrop.module';
import { CometChatImageViewerComponent } from './cometchat-image-viewer/cometchat-image-viewer.component';

@NgModule({
  declarations: [CometChatImageViewerComponent],
  imports: [CommonModule, CometChatBackdrop],
  exports: [CometChatImageViewerComponent]
})
export class CometChatImageViewer {}
