import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
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

// Modals
import {
  PaymentModalComponent,
  ConfirmModalComponent,
  DialogCourseDetailsPopup,
  CourseDetailsPopupComponent,
  DialogClassroomDetailsPopup,
  ClassroomDetailsPopupComponent,
  TeacherAvailabilityModalComponent,
} from '@metutor/shared/modals';

// Components
import {
  ModalComponent,
  CourseItemComponent,
  UserAvatarComponent,
  SearchInputComponent,
  VideoPlayerComponent,
  SendFeedbackComponent,
  SubmitButtonComponent,
  UploadedFilesComponent,
  ModalComponentTemplate,
  ClassroomItemComponent,
  CardPlaceholderComponent,
  GridPlaceholderComponent,
  SupportTicketCardComponent,
  FileUploadProgressComponent,
  TutorAvailableSlotsComponent,
  CourseItemHorizentalComponent,
  PaymentInvoiceDetailsComponent,
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
    // Components
    ModalComponent,
    CourseItemComponent,
    UserAvatarComponent,
    SearchInputComponent,
    VideoPlayerComponent,
    SendFeedbackComponent,
    SendFeedbackComponent,
    SubmitButtonComponent,
    UploadedFilesComponent,
    ClassroomItemComponent,
    ModalComponentTemplate,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    SupportTicketCardComponent,
    FileUploadProgressComponent,
    TutorAvailableSlotsComponent,
    CourseItemHorizentalComponent,
    PaymentInvoiceDetailsComponent,
    ClassroomItemHorizentalComponent,

    // Modals
    ConfirmModalComponent,
    PaymentModalComponent,
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,
    TeacherAvailabilityModalComponent,

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
    RouterModule,
    MatIconModule,
    MatTabsModule,
    TooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    RatingModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    // Components
    ModalComponent,
    UserAvatarComponent,
    CourseItemComponent,
    VideoPlayerComponent,
    SearchInputComponent,
    SendFeedbackComponent,
    SubmitButtonComponent,
    UploadedFilesComponent,
    ModalComponentTemplate,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    SupportTicketCardComponent,
    CourseItemHorizentalComponent,
    PaymentInvoiceDetailsComponent,
    ClassroomItemHorizentalComponent,

    // Modals
    ConfirmModalComponent,
    PaymentModalComponent,
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,
    TeacherAvailabilityModalComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
    FileUploadProgressComponent,
    TutorAvailableSlotsComponent,
  ],
})
export class SharedModule {}
