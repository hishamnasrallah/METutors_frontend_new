import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AngularSvgIconModule, SvgIconRegistryService } from 'angular-svg-icon';
import { CometChatUI } from 'src/cometchat-pro-angular-ui-kit/CometChatWorkspace/src/public-api';

import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';

import icons from '../../assets/svg/svg-icons';

// Modals
import {
  PaymentModalComponent,
  ConfirmModalComponent,
  DocViewerModalComponent,
  DialogCourseDetailsPopup,
  CourseDetailsPopupComponent,
  DialogClassroomDetailsPopup,
  SignatureCanvasModalComponent,
  ClassroomDetailsPopupComponent,
  SignatureCanvasTemplateComponent,
  TeacherAvailabilityModalComponent
} from '@metutor/shared/modals';

// Components
import {
  ModalComponent,
  CometChatComponent,
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
  ChooseCountryDialogComponent,
  CourseItemHorizentalComponent,
  PaymentInvoiceDetailsComponent,
  ClassroomItemHorizentalComponent
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
  GridSerialNumberDirective
} from '@metutor/shared/directives';

import {
  DaysPipe,
  MoneyPipe,
  UppercasePipe,
  TimeDifferencePipe
} from './pipes';

@NgModule({
  declarations: [
    // Pipes
    DaysPipe,
    MoneyPipe,
    UppercasePipe,
    TimeDifferencePipe,

    // Components
    ModalComponent,
    CometChatComponent,
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
    ChooseCountryDialogComponent,
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
    SignatureCanvasModalComponent,
    ClassroomDetailsPopupComponent,
    SignatureCanvasTemplateComponent,
    TeacherAvailabilityModalComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    LettersOnlyDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
    GridSerialNumberDirective
  ],
  imports: [
    CometChatUI,
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
    TranslateModule,
    MatTooltipModule,
    VgControlsModule,
    VgBufferingModule,
    MatCheckboxModule,
    NgxDocViewerModule,
    SignaturePadModule,
    VgOverlayPlayModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    RatingModule.forRoot(),
    NgxMatSelectSearchModule,
    BsDropdownModule.forRoot(),
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    // Pipes
    DaysPipe,
    MoneyPipe,
    UppercasePipe,
    TimeDifferencePipe,

    // Components
    ModalComponent,
    CometChatComponent,
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
    ChooseCountryDialogComponent,
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
    CometChatUI,
    MomentModule,
    MatChipsModule,
    TranslateModule,
    AngularSvgIconModule,
    NgxMatSelectSearchModule
  ]
})
export class SharedModule {
  constructor(private _iconReg: SvgIconRegistryService) {
    for (const iconKey in icons) {
      if (Object.prototype.hasOwnProperty.call(icons, iconKey)) {
        this._iconReg.addSvg(iconKey, icons[iconKey]);
      }
    }
  }
}
