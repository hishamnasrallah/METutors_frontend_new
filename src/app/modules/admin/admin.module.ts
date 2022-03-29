import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromAdmin from './state';
import { StoreModule } from '@ngrx/store';
// import * as adminEffects from './state/effects';
import * as featureKeys from './state/feature-keys';

import {
  AdminComponent,
  AdminTutorListComponent,
  AdminStudentListComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminTutorInterviewComponent,
  AdminTutorInterviewDetailsComponent,
  AdminTutorInterviewDocumentsComponent,
} from './containers';

import {
  AdminNavbarComponent,
  AdminSidebarComponent,
  InterviewCardComponent,
  AdminSendMeetingLinkModalComponent,
  AdminHourlyRatePerSubjectModalComponent,
  AdminTutorInterviewAttachmentModalComponent,
} from './components';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    InterviewCardComponent,
    AdminTutorListComponent,
    AdminStudentListComponent,
    AdminSupportTicketComponent,
    AdminTicketDetailsComponent,
    AdminTutorInterviewComponent,
    AdminSendMeetingLinkModalComponent,
    AdminTutorInterviewDetailsComponent,
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
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    BsDropdownModule.forRoot(),
    // EffectsModule.forFeature(Object.values(adminEffects)),
    StoreModule.forFeature(featureKeys.adminFeatureKey, fromAdmin.reducers),
  ],
})
export class AdminModule {}
