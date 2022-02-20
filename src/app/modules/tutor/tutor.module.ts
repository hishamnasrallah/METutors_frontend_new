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

import {
  TutorComponent,
  TutorSettingsComponent,
  TutorDashboardComponent,
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

@NgModule({
  declarations: [
    TutorComponent,
    TutorNavbarComponent,
    TutorSidebarComponent,
    TutorSettingsComponent,
    TutorDashboardComponent,
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
    MatFormFieldModule,
    TutorRoutingModule,
    MatProgressBarModule,
    RatingModule.forRoot(),
  ],
})
export class TutorModule {}
