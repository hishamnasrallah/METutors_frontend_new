import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
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
  ProgramComponent,
  BookingGridComponent,
  PerCourseGridComponent,
  AdminDashboardComponent,
  SupportFiltersComponent,
  AdminTutorListComponent,
  ProgramCountryComponent,
  ProgramSubjectComponent,
  AdminStudentListComponent,
  SupportStatsCardComponent,
  AdminProgramHomeComponent,
  ReAssignmentGridComponent,
  TutorApprovalGridComponent,
  AdminTutorProfileComponent,
  AdminTestimonialsComponent,
  AdminCurrentTutorsComponent,
  AdminBookingDetailComponent,
  AdminPendingTutorsComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminFinanceOrdersComponent,
  AdminFinanceCouponsComponent,
  AdminStudentProfileComponent,
  ProgramFieldOfStudyComponent,
  AdminTutorInterviewComponent,
  AdminClassroomsListComponent,
  AdminCourseRequestsComponent,
  AdminFinanceCoursesComponent,
  TutorApprovalRequestComponent,
  AdminSuspendedTutorsComponent,
  AdminTeacherScheduleComponent,
  AdminWorkforceCapacityComponent,
  AdminFinanceRefundOrdersComponent,
  AdminTutorBookingDetailsComponent,
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
  AdminAddCouponComponent,
  AdminSuccessModalComponent,
  AdminTutorsListModalComponent,
  AdminChangeStatusModalComponent,
  AdminEditFeedbackModalComponent,
  AdminViewFeedbackModalComponent,
  AdminAddNewSubjectModalComponent,
  AdminAddNewProgramModalComponent,
  AdminAddNewCountryModalComponent,
  AdminRequestDetailsModalComponent,
  AdminSendMeetingLinkModalComponent,
  AdminPreviousTeachersModalComponent,
  AdminStudentsFeedbackModalComponent,
  AdminAddNewFieldStudyModalComponent,
  AdminDeclineInterviewModalComponent,
  AdminScheduleInterviewModalComponent,
  AdminChangeTutorStatusModalComponent,
  AdminCourseBookingListModalComponent,
  AdminStudentTotalBookingModalComponent,
  AdminFinanceRefundDetailModalComponent,
  AdminViewRejectionReasonModalComponent,
  AdminFinanceRefundPaymentModalComponent,
  AdminHourlyRatePerSubjectModalComponent,
  AdminStudentViewAssignmentsModalComponent,
  AdminReassigningTutorSelectionModalComponent,
} from './components';

@NgModule({
  declarations: [
    ProgramComponent,
    BookingGridComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    InterviewCardComponent,
    PerCourseGridComponent,
    AdminFeedbackComponent,
    ProgramSubjectComponent,
    AdminTutorListComponent,
    SupportFiltersComponent,
    ProgramCountryComponent,
    AdminDashboardComponent,
    AdminAddCouponComponent,
    SupportStatsCardComponent,
    AdminStudentListComponent,
    AdminProgramHomeComponent,
    ReAssignmentGridComponent,
    AdminTutorProfileComponent,
    AdminSuccessModalComponent,
    AdminTestimonialsComponent,
    TutorApprovalGridComponent,
    AdminSupportTicketComponent,
    AdminTicketDetailsComponent,
    AdminCurrentTutorsComponent,
    AdminPendingTutorsComponent,
    AdminFinanceOrdersComponent,
    AdminBookingDetailComponent,
    ProgramFieldOfStudyComponent,
    AdminTutorInterviewComponent,
    AdminStudentProfileComponent,
    AdminClassroomsListComponent,
    AdminCourseRequestsComponent,
    AdminFinanceCoursesComponent,
    AdminFinanceCouponsComponent,
    AdminTutorsListModalComponent,
    AdminSuspendedTutorsComponent,
    AdminTeacherScheduleComponent,
    TutorApprovalRequestComponent,
    AdminWorkforceCapacityComponent,
    AdminEditFeedbackModalComponent,
    AdminChangeStatusModalComponent,
    AdminViewFeedbackModalComponent,
    AdminAddNewProgramModalComponent,
    AdminAddNewCountryModalComponent,
    AdminAddNewSubjectModalComponent,
    AdminTutorBookingDetailsComponent,
    AdminCancelledClassroomsComponent,
    AdminClassroomsPerCourseComponent,
    AdminFinanceRefundOrdersComponent,
    AdminRequestDetailsModalComponent,
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
    AdminFinanceRefundDetailModalComponent,
    AdminViewRejectionReasonModalComponent,
    AdminHourlyRatePerSubjectModalComponent,
    AdminFinanceRefundPaymentModalComponent,
    AdminStudentViewAssignmentsModalComponent,
    AdminManagementTutorReAssignmentComponent,
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
    MatSliderModule,
    MatSelectModule,
    PaginationModule,
    MatFormFieldModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    RatingModule.forRoot(),
    TooltipModule.forRoot(),
    MatProgressSpinnerModule,
    BsDropdownModule.forRoot(),
    NgxMaterialTimepickerModule,
    EffectsModule.forFeature(Object.values(adminEffects)),
    StoreModule.forFeature(featureKeys.adminFeatureKey, fromAdmin.reducers),
  ],
})
export class AdminModule {}
