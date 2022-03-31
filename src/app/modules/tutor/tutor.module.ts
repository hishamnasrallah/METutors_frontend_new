import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatNativeDateModule } from '@angular/material/core';
import { TutorRoutingModule } from './tutor-routing.module';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatInputModule } from '@angular/material/input';

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
  TutorFeedbackModalComponent,
  TutorAttendanceModalComponent,
  TutorSettingsAccountComponent,
  FaqStillHaveQuestionsComponent,
  TutorSettingsSecurityComponent,
  TutorRejectCourseModalComponent,
  TutorCancelCourseModalComponent,
  TutorAddAssignmentModalComponent,
  TutorAddSyllabusTopicModalComponent,
  TutorAddClassResourceModalComponent,
  TutorAssignmentDetailsModalComponent,
  TutorSettingsUserPreferencesComponent,
  TutorSettingsPaymentInformationComponent,
  TutorAcceptRejectAssignmentModalComponent,
  TutorViewSubmittedAssignmentModalComponent,
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
    TutorSupportTicketComponent,
    TutorTicketDetailsComponent,
    TutorFeedbackModalComponent,
    TutorClassDashboardComponent,
    TutorPaymentRecordsComponent,
    TutorSettingsAccountComponent,
    TutorAttendanceModalComponent,
    TutorSettingsSecurityComponent,
    FaqStillHaveQuestionsComponent,
    TutorRejectCourseModalComponent,
    TutorCancelCourseModalComponent,
    TutorAddAssignmentModalComponent,
    TutorAddSyllabusTopicModalComponent,
    TutorAddClassResourceModalComponent,
    TutorAssignmentDetailsModalComponent,
    TutorSettingsUserPreferencesComponent,
    TutorSettingsPaymentInformationComponent,
    TutorAcceptRejectAssignmentModalComponent,
    TutorViewSubmittedAssignmentModalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    CarouselModule,
    MatRadioModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonModule,
    BsDropdownModule,
    MatFormFieldModule,
    TutorRoutingModule,
    NgxAutoScrollModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    RatingModule.forRoot(),
    EffectsModule.forFeature(Object.values(tutorEffects)),
    StoreModule.forFeature(featureKeys.tutorFeatureKey, fromTutor.reducers),
  ],
})
export class TutorModule {}
