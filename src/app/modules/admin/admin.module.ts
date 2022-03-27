import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { MatTabsModule } from '@angular/material/tabs';

import { StoreModule } from '@ngrx/store';
import * as fromAdmin from './state';
// import * as adminEffects from './state/effects';
import * as featureKeys from './state/feature-keys';

import {
  AdminComponent,
  AdminTutorListComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminTutorInterviewComponent,
} from './containers';

import {
  AdminNavbarComponent,
  AdminSidebarComponent,
  InterviewCardComponent,
  AdminSendMeetingLinkModalComponent,
} from './components';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    InterviewCardComponent,
    AdminTutorListComponent,
    AdminSupportTicketComponent,
    AdminTicketDetailsComponent,
    AdminTutorInterviewComponent,
    AdminSendMeetingLinkModalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
    // EffectsModule.forFeature(Object.values(adminEffects)),
    StoreModule.forFeature(featureKeys.adminFeatureKey, fromAdmin.reducers),
  ],
})
export class AdminModule {}
