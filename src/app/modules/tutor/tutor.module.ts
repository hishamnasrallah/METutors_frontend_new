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
import { DirectiveModule } from '@metutor/shared/directives';
import {
  ClassroomItemModule,
  ClassroomPlaceholderModule,
} from '@metutor/shared/components';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import {
  TutorComponent,
  TutorClassesComponent,
  TutorSettingsComponent,
  TutorSyllabusComponent,
  TutorDashboardComponent,
  TutorClassroomsComponent,
  TutorPaymentRecordsComponent,
} from './containers';

import {
  TutorNavbarComponent,
  TutorSidebarComponent,
  TutorSettingsAccountComponent,
  TutorSettingsSecurityComponent,
  TutorSettingsUserPreferencesComponent,
  TutorSettingsPaymentInformationComponent,
} from './components';
import {
  ClassroomAttendancesPopupModule,
  LeaveFeedbackPopupModule,
} from '@metutor/shared/popups';

@NgModule({
  declarations: [
    TutorComponent,
    TutorNavbarComponent,
    TutorSidebarComponent,
    TutorClassesComponent,
    TutorSyllabusComponent,
    TutorSettingsComponent,
    TutorDashboardComponent,
    TutorClassroomsComponent,
    TutorPaymentRecordsComponent,
    TutorSettingsAccountComponent,
    TutorSettingsSecurityComponent,
    TutorSettingsUserPreferencesComponent,
    TutorSettingsPaymentInformationComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    CarouselModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    DirectiveModule,
    MatFormFieldModule,
    TutorRoutingModule,
    ClassroomItemModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    RatingModule.forRoot(),
    LeaveFeedbackPopupModule,
    ClassroomPlaceholderModule,
    ClassroomAttendancesPopupModule,
  ],
})
export class TutorModule {}
