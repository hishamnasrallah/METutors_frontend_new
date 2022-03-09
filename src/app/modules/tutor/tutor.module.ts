import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TwillioModule } from '@metutor/core/components';

import { TutorRoutingModule } from './tutor-routing.module';
import { SharedModule } from '@metutor/shared/shared.module';

import {
  TutorComponent,
  TutorInboxComponent,
  TutorBadgesComponent,
  TutorClassesComponent,
  TutorSettingsComponent,
  TutorSyllabusComponent,
  TutorDashboardComponent,
  TutorClassroomsComponent,
  TutorPaymentRecordsComponent,
  TutorClassDashboardComponent,
} from './containers';

import {
  TutorNavbarComponent,
  TutorSidebarComponent,
  TutorFeedbackModalComponent,
  TutorAttendanceModalComponent,
  TutorSettingsAccountComponent,
  TutorSettingsSecurityComponent,
  TutorSettingsUserPreferencesComponent,
  TutorSettingsPaymentInformationComponent,
} from './components';

@NgModule({
  declarations: [
    TutorComponent,
    TutorInboxComponent,
    TutorNavbarComponent,
    TutorBadgesComponent,
    TutorSidebarComponent,
    TutorClassesComponent,
    TutorSyllabusComponent,
    TutorSettingsComponent,
    TutorDashboardComponent,
    TutorClassroomsComponent,
    TutorFeedbackModalComponent,
    TutorClassDashboardComponent,
    TutorPaymentRecordsComponent,
    TutorSettingsAccountComponent,
    TutorAttendanceModalComponent,
    TutorSettingsSecurityComponent,
    TutorSettingsUserPreferencesComponent,
    TutorSettingsPaymentInformationComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    TwillioModule,
    MatTabsModule,
    MatIconModule,
    CarouselModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    TutorRoutingModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    RatingModule.forRoot(),
  ],
})
export class TutorModule {}
