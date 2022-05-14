import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import * as fromAdmin from './state';
import { StoreModule } from '@ngrx/store';
import * as adminEffects from './state/effects';
import * as featureKeys from './state/feature-keys';

import {
  AdminComponent,
  AdminSubjectComponent,
  AdminCountryComponent,
  AdminTutorListComponent,
  AdminStudentListComponent,
  AdminProgramListComponent,
  AdminFieldOfStudyComponent,
  AdminCurrentTutorsComponent,
  AdminPendingTutorsComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminTutorInterviewComponent,
  AdminBookingDetailsComponent,
  AdminSuspendedTutorsComponent,
  AdminWorkforceCapacityComponent,
  AdminCancelledClassroomsComponent,
  AdminAllBookingClassroomsComponent,
  AdminTutorInterviewDetailsComponent,
  AdminTutorInterviewDocumentsComponent,
} from './containers';

import {
  AdminNavbarComponent,
  AdminSidebarComponent,
  InterviewCardComponent,
  AdminTutorsListModalComponent,
  AdminAddNewSubjectModalComponent,
  AdminAddNewProgramModalComponent,
  AdminAddNewCountryModalComponent,
  AdminSendMeetingLinkModalComponent,
  AdminStudentsFeedbackModalComponent,
  AdminAddNewFieldStudyModalComponent,
  AdminDeclineInterviewModalComponent,
  AdminScheduleInterviewModalComponent,
  AdminCourseBookingListModalComponent,
  AdminHourlyRatePerSubjectModalComponent,
  AdminTutorInterviewAttachmentModalComponent,
} from './components';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSubjectComponent,
    AdminCountryComponent,
    AdminSidebarComponent,
    InterviewCardComponent,
    AdminTutorListComponent,
    AdminStudentListComponent,
    AdminProgramListComponent,
    AdminFieldOfStudyComponent,
    AdminSupportTicketComponent,
    AdminTicketDetailsComponent,
    AdminCurrentTutorsComponent,
    AdminPendingTutorsComponent,
    AdminTutorInterviewComponent,
    AdminBookingDetailsComponent,
    AdminTutorsListModalComponent,
    AdminSuspendedTutorsComponent,
    AdminWorkforceCapacityComponent,
    AdminAddNewProgramModalComponent,
    AdminAddNewCountryModalComponent,
    AdminAddNewSubjectModalComponent,
    AdminCancelledClassroomsComponent,
    AdminSendMeetingLinkModalComponent,
    AdminAllBookingClassroomsComponent,
    AdminTutorInterviewDetailsComponent,
    AdminAddNewFieldStudyModalComponent,
    AdminDeclineInterviewModalComponent,
    AdminStudentsFeedbackModalComponent,
    AdminScheduleInterviewModalComponent,
    AdminCourseBookingListModalComponent,
    AdminTutorInterviewDocumentsComponent,
    AdminHourlyRatePerSubjectModalComponent,
    AdminTutorInterviewAttachmentModalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    AdminRoutingModule,
    NgxDocViewerModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    RatingModule.forRoot(),
    NgxMaterialTimepickerModule,
    BsDropdownModule.forRoot(),
    EffectsModule.forFeature(Object.values(adminEffects)),
    StoreModule.forFeature(featureKeys.adminFeatureKey, fromAdmin.reducers),
  ],
})
export class AdminModule {}
