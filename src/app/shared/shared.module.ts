import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

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
  UserAvatarComponent,
  VideoPlayerComponent,
  SendFeedbackComponent,
  SubmitButtonComponent,
  ModalComponentTemplate,
  ClassroomItemComponent,
  CardPlaceholderComponent,
  GridPlaceholderComponent,
  SupportTicketCardComponent,
  UploadedFilesListComponent,
  FileUploadProgressComponent,
  TutorAvailableSlotsComponent,
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
    UserAvatarComponent,
    VideoPlayerComponent,
    SendFeedbackComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    SupportTicketCardComponent,
    UploadedFilesListComponent,
    FileUploadProgressComponent,
    TutorAvailableSlotsComponent,
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
    SendFeedbackComponent,
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
    BsDropdownModule.forRoot(),
  ],
  exports: [
    CourseItemComponent,
    VideoPlayerComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    SupportTicketCardComponent,
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
    TutorAvailableSlotsComponent,
    UserAvatarComponent,
    SendFeedbackComponent,
  ],
})
export class SharedModule {}
