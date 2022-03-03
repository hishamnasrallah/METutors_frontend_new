import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SupportService } from 'src/app/core/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatRadioModule } from '@angular/material/radio';
import {
  ClassroomAttendancesPopupModule,
  LeaveFeedbackPopupModule,
} from 'src/app/shared/popups';

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
} from './containers';

import {
  StudentNavbarComponent,
  StudentSidebarComponent,
  FaqAboutStudentsComponent,
  FaqListQuestionsComponent,
  FaqStillHaveQuestionsComponent,
  StudentSettingsAccountComponent,
  StudentSettingsSecurityComponent,
  StudentSettingsUserPrefrencesComponent,
  StudentSettingsPaymentInformationComponent,
} from './components';
import { SharedModule } from '@metutor/shared/shared.module';

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
    FaqStillHaveQuestionsComponent,
    StudentSettingsAccountComponent,
    StudentSettingsSecurityComponent,
    StudentSettingsUserPrefrencesComponent,
    StudentSettingsPaymentInformationComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
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
    LeaveFeedbackPopupModule,
    ClassroomAttendancesPopupModule,
  ]
})
export class StudentModule {}
