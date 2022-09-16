import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StudentRoutingModule } from './student-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import * as studentEffects from './state/effects';
import * as fromStudent from '@metutor/modules/student/state';
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
  DialogEditClassroom,
  DialogRemoveClassroom,
  StudentNavbarComponent,
  StudentSidebarComponent,
  FaqAboutStudentsComponent,
  FaqListQuestionsComponent,
  StudentFeedbackModalComponent,
  StudentAddCourseModalComponent,
  FaqStillHaveQuestionsComponent,
  StudentAttendanceModalComponent,
  StudentSettingsAccountComponent,
  StudentSettingsSecurityComponent,
  StudentMakeupClassModalComponent,
  StudentViewResourceModalComponent,
  StudentCancelCourseModalComponent,
  StudentSubmitAssignmentModalComponent,
  StudentSettingsUserPrefrencesComponent,
  StudentAssignmentDetailsModalComponent,
  StudentTutorReAssignmentModalComponent,
  StudentCancelCourseSuccessModalComponent,
  StudentSettingsPaymentInformationComponent,
  StudentViewSubmittedAssignmentModalComponent,
} from './components';

@NgModule({
  declarations: [
    StudentComponent,
    StudentFaqComponent,
    DialogEditClassroom,
    StudentHelpComponent,
    DialogRemoveClassroom,
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
    StudentClassDashboardComponent,
    StudentAddCourseModalComponent,
    StudentAttendanceModalComponent,
    StudentSettingsAccountComponent,
    StudentSettingsSecurityComponent,
    StudentMakeupClassModalComponent,
    StudentViewResourceModalComponent,
    StudentCancelCourseModalComponent,
    StudentSubmitAssignmentModalComponent,
    StudentSettingsUserPrefrencesComponent,
    StudentAssignmentDetailsModalComponent,
    StudentTutorReAssignmentModalComponent,
    StudentCancelCourseSuccessModalComponent,
    StudentSettingsPaymentInformationComponent,
    StudentViewSubmittedAssignmentModalComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    MatTabsModule,
    TooltipModule,
    MatRadioModule,
    CarouselModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    BsDropdownModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgxAutoScrollModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StudentRoutingModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    NgxIntlTelInputModule,
    RatingModule.forRoot(),
    NgxMaterialTimepickerModule,
    EffectsModule.forFeature(Object.values(studentEffects)),
    StoreModule.forFeature(featureKeys.studentFeatureKey, fromStudent.reducers),
  ],
  exports: [StudentMakeupClassModalComponent],
})
export class StudentModule {}
