import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';

// Popups
import {
  DialogCourseDetailsPopup,
  CourseDetailsPopupComponent,
  DialogClassroomDetailsPopup,
  ClassroomDetailsPopupComponent,
} from '@metutor/shared/popups';

// Components
import {
  ModalComponent,
  CourseItemComponent,
  VideoPlayerComponent,
  SubmitButtonComponent,
  ModalComponentTemplate,
  ClassroomItemComponent,
  CardPlaceholderComponent,
  GridPlaceholderComponent,
  UploadedFilesListComponent,
  FileUploadProgressComponent,
  CourseItemHorizentalComponent,
  ClassroomItemHorizentalComponent,
} from '@metutor/shared/components';

// Directives
import {
  LetDirective,
  TrimInputDirective,
  OnlyNumberDirective,
  DefaultCoverDirective,
  DefaultAvatarDirective,
  DefaultCourseDirective,
} from '@metutor/shared/directives';

@NgModule({
  declarations: [
    CourseItemComponent,
    VideoPlayerComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    UploadedFilesListComponent,
    FileUploadProgressComponent,
    CourseItemHorizentalComponent,
    ClassroomItemHorizentalComponent,

    // Modal
    ModalComponent,
    ModalComponentTemplate,

    // Popups
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    VgCoreModule,
    RatingModule,
    RouterModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  exports: [
    CourseItemComponent,
    VideoPlayerComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    CourseItemHorizentalComponent,
    ClassroomItemHorizentalComponent,

    // Modal
    ModalComponent,
    ModalComponentTemplate,

    // Popups
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
    FileUploadProgressComponent,
  ],
})
export class SharedModule {}
