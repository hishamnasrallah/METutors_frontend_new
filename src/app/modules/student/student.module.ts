import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import * as tutorEffects from './state/effects';
import { SharedModule } from '@metutor/shared/shared.module';
import * as fromStudent from '@metutor/modules/student/state';
import { StudentRoutingModule } from './student-routing.module';
import * as featureKeys from '@metutor/modules/student/state/feature-keys';

import {
  StudentComponent,
  StudentFaqComponent,
  StudentHelpComponent,
  StudentClassesComponent,
  StudentSyllabusComponent,
  StudentSettingsComponent,
  StudentResourcesComponent,
  StudentDashboardComponent,
  StudentClassroomsComponent,
  StudentAssignmentsComponent,
  StudentCreateTicketComponent,
  StudentCertificatesComponent,
  StudentSupportTicketComponent,
  StudentTicketDetailsComponent,
  StudentClassDashboardComponent,
} from './containers';

import {
  StudentNavbarComponent,
  StudentSidebarComponent,
  FaqAboutStudentsComponent,
  FaqListQuestionsComponent,
  StudentFeedbackModalComponent,
  FaqStillHaveQuestionsComponent,
  StudentAttendanceModalComponent,
  StudentSettingsAccountComponent,
  StudentSettingsSecurityComponent,
  StudentViewResourceModalComponent,
  StudentSubmitAssignmentModalComponent,
  StudentSettingsUserPrefrencesComponent,
  StudentAssignmentDetailsModalComponent,
  StudentSettingsPaymentInformationComponent,
} from './components';

@NgModule({
  declarations: [
    StudentComponent,
    StudentFaqComponent,
    StudentHelpComponent,
    StudentNavbarComponent,
    StudentClassesComponent,
    StudentSidebarComponent,
    StudentSettingsComponent,
    StudentSyllabusComponent,
    FaqListQuestionsComponent,
    StudentResourcesComponent,
    FaqAboutStudentsComponent,
    StudentDashboardComponent,
    StudentClassroomsComponent,
    StudentAssignmentsComponent,
    StudentCreateTicketComponent,
    StudentCertificatesComponent,
    StudentTicketDetailsComponent,
    StudentSupportTicketComponent,
    StudentFeedbackModalComponent,
    FaqStillHaveQuestionsComponent,
    StudentAttendanceModalComponent,
    StudentClassDashboardComponent,
    StudentSettingsAccountComponent,
    StudentSettingsSecurityComponent,
    StudentViewResourceModalComponent,
    StudentSubmitAssignmentModalComponent,
    StudentSettingsUserPrefrencesComponent,
    StudentAssignmentDetailsModalComponent,
    StudentSettingsPaymentInformationComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatRadioModule,
    CarouselModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    BsDropdownModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    StudentRoutingModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    NgxIntlTelInputModule,
    RatingModule.forRoot(),
    EffectsModule.forFeature(Object.values(tutorEffects)),
    StoreModule.forFeature(featureKeys.studentFeatureKey, fromStudent.reducers),
  ],
})
export class StudentModule {}
