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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as fromAdmin from './state';
import { StoreModule } from '@ngrx/store';
import * as adminEffects from './state/effects';
import * as featureKeys from './state/feature-keys';

import {
  AdminComponent,
  AdminSubjectComponent,
  AdminCountryComponent,
  PerCourseGridComponent,
  AdminTutorListComponent,
  AdminStudentListComponent,
  AdminProgramListComponent,
  ReAssignmentGridComponent,
  AdminTestimonialsComponent,
  AdminFieldOfStudyComponent,
  AdminCurrentTutorsComponent,
  AdminPendingTutorsComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminFinanceOrdersComponent,
  AdminStudentProfileComponent,
  AdminTutorInterviewComponent,
  AdminBookingDetailsComponent,
  AdminClassroomsListComponent,
  AdminCourseRequestsComponent,
  AdminSuspendedTutorsComponent,
  AdminWorkforceCapacityComponent,
  AdminFinanceRefundOrdersComponent,
  AdminCancelledClassroomsComponent,
  AdminClassroomsPerCourseComponent,
  AdminStudentBookingDetailComponent,
  AdminTutorInterviewDetailsComponent,
  AdminTutorInterviewDocumentsComponent,
  AdminManagementTutorReAssignmentComponent,
} from './containers';

import {
  AdminNavbarComponent,
  AdminSidebarComponent,
  AdminFeedbackComponent,
  InterviewCardComponent,
  AdminTutorsListModalComponent,
  AdminChangeStatusModalComponent,
  AdminEditFeedbackModalComponent,
  AdminAddNewSubjectModalComponent,
  AdminAddNewProgramModalComponent,
  AdminAddNewCountryModalComponent,
  AdminSendMeetingLinkModalComponent,
  AdminPreviousTeachersModalComponent,
  AdminChangeTutorStatusModalComponent,
  AdminStudentsFeedbackModalComponent,
  AdminAddNewFieldStudyModalComponent,
  AdminDeclineInterviewModalComponent,
  AdminScheduleInterviewModalComponent,
  AdminCourseBookingListModalComponent,
  AdminStudentTotalBookingModalComponent,
  AdminStudentViewFeedbackModalComponent,
  AdminHourlyRatePerSubjectModalComponent,
  AdminStudentViewAssignmentsModalComponent,
  AdminTutorInterviewAttachmentModalComponent,
  AdminReassigningTutorSelectionModalComponent,
} from './components';

import { ReassignmentStatusPipe } from './pipes';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSubjectComponent,
    AdminCountryComponent,
    AdminSidebarComponent,
    InterviewCardComponent,
    PerCourseGridComponent,
    AdminFeedbackComponent,
    ReassignmentStatusPipe,
    AdminTutorListComponent,
    AdminStudentListComponent,
    AdminProgramListComponent,
    ReAssignmentGridComponent,
    AdminFieldOfStudyComponent,
    AdminTestimonialsComponent,
    AdminSupportTicketComponent,
    AdminTicketDetailsComponent,
    AdminCurrentTutorsComponent,
    AdminPendingTutorsComponent,
    AdminFinanceOrdersComponent,
    AdminTutorInterviewComponent,
    AdminBookingDetailsComponent,
    AdminStudentProfileComponent,
    AdminClassroomsListComponent,
    AdminCourseRequestsComponent,
    AdminTutorsListModalComponent,
    AdminSuspendedTutorsComponent,
    AdminWorkforceCapacityComponent,
    AdminEditFeedbackModalComponent,
    AdminChangeStatusModalComponent,
    AdminAddNewProgramModalComponent,
    AdminAddNewCountryModalComponent,
    AdminAddNewSubjectModalComponent,
    AdminCancelledClassroomsComponent,
    AdminClassroomsPerCourseComponent,
    AdminFinanceRefundOrdersComponent,
    AdminSendMeetingLinkModalComponent,
    AdminStudentBookingDetailComponent,
    AdminTutorInterviewDetailsComponent,
    AdminAddNewFieldStudyModalComponent,
    AdminDeclineInterviewModalComponent,
    AdminStudentsFeedbackModalComponent,
    AdminPreviousTeachersModalComponent,
    AdminChangeTutorStatusModalComponent,
    AdminScheduleInterviewModalComponent,
    AdminCourseBookingListModalComponent,
    AdminTutorInterviewDocumentsComponent,
    AdminStudentTotalBookingModalComponent,
    AdminStudentViewFeedbackModalComponent,
    AdminHourlyRatePerSubjectModalComponent,
    AdminStudentViewAssignmentsModalComponent,
    AdminManagementTutorReAssignmentComponent,
    AdminTutorInterviewAttachmentModalComponent,
    AdminReassigningTutorSelectionModalComponent,
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
    MatProgressSpinnerModule,
    BsDropdownModule.forRoot(),
    NgxMaterialTimepickerModule,
    EffectsModule.forFeature(Object.values(adminEffects)),
    StoreModule.forFeature(featureKeys.adminFeatureKey, fromAdmin.reducers),
  ],
})
export class AdminModule {}
