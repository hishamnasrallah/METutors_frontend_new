import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorRoutingModule } from './tutor-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
  ClassroomAttendancesPopupModule,
  LeaveFeedbackPopupModule,
} from '@metutor/shared/popups';

import { SharedModule } from '@metutor/shared/shared.module';

import {
  TutorComponent,
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
  TutorSettingsAccountComponent,
  TutorSettingsSecurityComponent,
  TutorSettingsUserPreferencesComponent,
  TutorSettingsPaymentInformationComponent,
} from './components';

@NgModule({
  declarations: [
    TutorComponent,
    TutorNavbarComponent,
    TutorBadgesComponent,
    TutorSidebarComponent,
    TutorClassesComponent,
    TutorSyllabusComponent,
    TutorSettingsComponent,
    TutorDashboardComponent,
    TutorClassroomsComponent,
    TutorClassDashboardComponent,
    TutorPaymentRecordsComponent,
    TutorSettingsAccountComponent,
    TutorSettingsSecurityComponent,
    TutorSettingsUserPreferencesComponent,
    TutorSettingsPaymentInformationComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    CarouselModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    TutorRoutingModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    RatingModule.forRoot(),
    LeaveFeedbackPopupModule,
    ClassroomAttendancesPopupModule,
  ],
})
export class TutorModule {}
