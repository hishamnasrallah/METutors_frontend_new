import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RequestsRoutingModule } from './requests-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import * as fromRequests from './state';
import { StoreModule } from '@ngrx/store';
import * as featureKeys from './state/feature-keys';

import {
  RequestTutorComponent,
  InvoiceDetailsComponent,
  PaymentProcessingComponent,
} from './containers';

import {
  DialogEditClassroom,
  DialogRemoveClassroom,
  ReviewRequestComponent,
  SelectTutorFormComponent,
  ClassroomInfoFormComponent,
  ListClassroomsFormComponent,
  CourseInformationFormComponent,
  InvoiceClassroomDetailsComponent,
  ChangeCourseScheduleModalComponent,
} from './components';

@NgModule({
  declarations: [
    DialogEditClassroom,
    DialogRemoveClassroom,
    RequestTutorComponent,
    ReviewRequestComponent,
    InvoiceDetailsComponent,
    SelectTutorFormComponent,
    ClassroomInfoFormComponent,
    PaymentProcessingComponent,
    ListClassroomsFormComponent,
    CourseInformationFormComponent,
    InvoiceClassroomDetailsComponent,
    ChangeCourseScheduleModalComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RequestsRoutingModule,
    RatingModule.forRoot(),
    NgxMaterialTimepickerModule,
    StoreModule.forFeature(
      featureKeys.requestsFeatureKey,
      fromRequests.reducers
    ),
  ],
})
export class RequestsModule {}
