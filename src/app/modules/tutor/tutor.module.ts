import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TutorRoutingModule } from './tutor-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import * as fromTutor from './state';
import * as tutorEffects from './state/effects';
import * as featureKeys from './state/feature-keys';

import {
  TutorComponent,
  TutorFaqComponent,
  TutorHelpComponent,
  TutorBadgesComponent,
  TutorClassesComponent,
  TutorSettingsComponent,
  TutorSyllabusComponent,
  TutorDashboardComponent,
  TutorResourcesComponent,
  TutorAssignmentComponent,
  TutorClassroomsComponent,
  TutorCreateTicketComponent,
  TutorSupportTicketComponent,
  TutorTicketDetailsComponent,
  TutorPaymentRecordsComponent,
  TutorClassDashboardComponent,
} from './containers';

import {
  TutorNavbarComponent,
  TutorSidebarComponent,
  FaqListQuestionsComponent,
  FaqAboutStudentsComponent,
  TutorDisputeModalComponent,
  TutorFeedbackModalComponent,
  TutorSettingsProfileComponent,
  TutorAttendanceModalComponent,
  FaqStillHaveQuestionsComponent,
  TutorSettingsSecurityComponent,
  DialogSelectAvailabilityDialog,
  TutorRejectCourseModalComponent,
  TutorCancelCourseModalComponent,
  TutorAddAssignmentModalComponent,
  TutorDisputePaymentModalComponent,
  TutorPaymentSuccessModalComponent,
  TutorRescheduleClassModalComponent,
  TutorAddSyllabusTopicModalComponent,
  TutorViewKudosPointsDetailComponent,
  TutorAddClassResourceModalComponent,
  TutorAssignmentDetailsModalComponent,
  TutorSettingsUserPreferencesComponent,
  TutorPaymentConfirmationModalComponent,
  TutorSettingsPaymentInformationComponent,
  TutorAcceptRejectAssignmentModalComponent,
  TutorSubmitInterviewRequestModalComponent,
  TutorResourcesUploadDocumentModalComponent,
  TutorViewSubmittedAssignmentModalComponent,
  TutorSettingsProfileTeachingCoursesComponent,
} from './components';

@NgModule({
  declarations: [
    TutorComponent,
    TutorFaqComponent,
    TutorHelpComponent,
    TutorNavbarComponent,
    TutorBadgesComponent,
    TutorSidebarComponent,
    TutorClassesComponent,
    TutorSyllabusComponent,
    TutorSettingsComponent,
    TutorDashboardComponent,
    TutorResourcesComponent,
    TutorAssignmentComponent,
    TutorClassroomsComponent,
    FaqListQuestionsComponent,
    FaqAboutStudentsComponent,
    TutorCreateTicketComponent,
    TutorDisputeModalComponent,
    TutorSupportTicketComponent,
    TutorTicketDetailsComponent,
    TutorFeedbackModalComponent,
    TutorClassDashboardComponent,
    TutorPaymentRecordsComponent,
    TutorAttendanceModalComponent,
    TutorSettingsProfileComponent,
    DialogSelectAvailabilityDialog,
    TutorSettingsSecurityComponent,
    FaqStillHaveQuestionsComponent,
    TutorRejectCourseModalComponent,
    TutorCancelCourseModalComponent,
    TutorAddAssignmentModalComponent,
    TutorDisputePaymentModalComponent,
    TutorPaymentSuccessModalComponent,
    TutorRescheduleClassModalComponent,
    TutorAddSyllabusTopicModalComponent,
    TutorAddClassResourceModalComponent,
    TutorViewKudosPointsDetailComponent,
    TutorAssignmentDetailsModalComponent,
    TutorSettingsUserPreferencesComponent,
    TutorPaymentConfirmationModalComponent,
    TutorSettingsPaymentInformationComponent,
    TutorAcceptRejectAssignmentModalComponent,
    TutorSubmitInterviewRequestModalComponent,
    TutorViewSubmittedAssignmentModalComponent,
    TutorResourcesUploadDocumentModalComponent,
    TutorSettingsProfileTeachingCoursesComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    CarouselModule,
    MatRadioModule,
    MatInputModule,
    MatChipsModule,
    MatDialogModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    BsDropdownModule,
    MatTooltipModule,
    PaginationModule,
    MatCheckboxModule,
    MatFormFieldModule,
    TutorRoutingModule,
    NgxAutoScrollModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    RatingModule.forRoot(),
    NgxMaterialTimepickerModule,
    EffectsModule.forFeature(Object.values(tutorEffects)),
    StoreModule.forFeature(featureKeys.tutorFeatureKey, fromTutor.reducers),
  ],
})
export class TutorModule {}
