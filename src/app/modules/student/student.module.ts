import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
// import { EffectsModule } from '@ngrx/effects';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// import * as tutorEffects from './state/effects';
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
  StudentDashboardComponent,
  StudentClassroomsComponent,
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
  StudentSettingsUserPrefrencesComponent,
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
    FaqAboutStudentsComponent,
    StudentDashboardComponent,
    StudentClassroomsComponent,
    StudentCreateTicketComponent,
    StudentCertificatesComponent,
    StudentTicketDetailsComponent,
    StudentSupportTicketComponent,
    StudentFeedbackModalComponent,
    FaqStillHaveQuestionsComponent,
    StudentAttendanceModalComponent,
    StudentSettingsAccountComponent,
    StudentClassDashboardComponent,
    StudentSettingsSecurityComponent,
    StudentSettingsUserPrefrencesComponent,
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
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    StudentRoutingModule,
    MatProgressBarModule,
    NgxIntlTelInputModule,
    RatingModule.forRoot(),
    // EffectsModule.forFeature(Object.values(tutorEffects)),
    StoreModule.forFeature(featureKeys.studentFeatureKey, fromStudent.reducers),
  ],
})
export class StudentModule {}
