import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

// Modals
import {
  PaymentModalComponent,
  ConfirmModalComponent,
  DocViewerModalComponent,
  DialogCourseDetailsPopup,
  CourseDetailsPopupComponent,
  DialogClassroomDetailsPopup,
  ClassroomDetailsPopupComponent,
  TeacherAvailabilityModalComponent,
} from '@metutor/shared/modals';

// Components
import {
  ModalComponent,
  ReviewRateComponent,
  CourseItemComponent,
  UserAvatarComponent,
  SearchInputComponent,
  VideoPlayerComponent,
  CharCounterComponent,
  SendFeedbackComponent,
  SubmitButtonComponent,
  UploadedFilesComponent,
  ModalComponentTemplate,
  ClassroomItemComponent,
  SpokenLanguagesComponent,
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
  LettersOnlyDirective,
  DefaultCoverDirective,
  DefaultAvatarDirective,
  DefaultCourseDirective,
  GridSerialNumberDirective,
} from '@metutor/shared/directives';

import { MoneyPipe, DaysPipe } from './pipes';

@NgModule({
  declarations: [
    // Pipes
    DaysPipe,
    MoneyPipe,

    // Components
    ModalComponent,
    ReviewRateComponent,
    CourseItemComponent,
    UserAvatarComponent,
    SearchInputComponent,
    VideoPlayerComponent,
    CharCounterComponent,
    SendFeedbackComponent,
    SendFeedbackComponent,
    SubmitButtonComponent,
    UploadedFilesComponent,
    ClassroomItemComponent,
    ModalComponentTemplate,
    SpokenLanguagesComponent,
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
    DocViewerModalComponent,
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,
    TeacherAvailabilityModalComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    LettersOnlyDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
    GridSerialNumberDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MomentModule,
    VgCoreModule,
    RouterModule,
    MatIconModule,
    MatTabsModule,
    TooltipModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    VgControlsModule,
    VgBufferingModule,
    NgxDocViewerModule,
    VgOverlayPlayModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    RatingModule.forRoot(),
    NgxMatSelectSearchModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    // Pipes
    DaysPipe,
    MoneyPipe,

    // Components
    MomentModule,
    ModalComponent,
    UserAvatarComponent,
    CourseItemComponent,
    ReviewRateComponent,
    CharCounterComponent,
    VideoPlayerComponent,
    SearchInputComponent,
    SendFeedbackComponent,
    SubmitButtonComponent,
    UploadedFilesComponent,
    ModalComponentTemplate,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    SpokenLanguagesComponent,
    GridPlaceholderComponent,
    SupportTicketCardComponent,
    CourseItemHorizentalComponent,
    PaymentInvoiceDetailsComponent,
    ClassroomItemHorizentalComponent,

    // Modals
    ConfirmModalComponent,
    PaymentModalComponent,
    DocViewerModalComponent,
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,
    TeacherAvailabilityModalComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    LettersOnlyDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
    GridSerialNumberDirective,
    FileUploadProgressComponent,
    TutorAvailableSlotsComponent,

    // Modules
    NgxMatSelectSearchModule,
  ],
})
export class SharedModule {}
