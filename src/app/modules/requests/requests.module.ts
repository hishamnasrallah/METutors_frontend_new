import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RequestsRoutingModule } from './requests-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharedModule } from '@metutor/shared/shared.module';

import { RequestTutorComponent, InvoiceDetailsComponent } from './containers';

import {
  DialogEditClassroom,
  DialogRemoveClassroom,
  ReviewRequestComponent,
  SelectTutorFormComponent,
  ClassroomInfoFormComponent,
  ListClassroomsFormComponent,
  CourseInformationFormComponent,
  InvoiceClassroomDetailsComponent,
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
    ListClassroomsFormComponent,
    CourseInformationFormComponent,
    InvoiceClassroomDetailsComponent,
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
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RequestsRoutingModule,
    RatingModule.forRoot(),
    NgxMaterialTimepickerModule,
  ],
})
export class RequestsModule {}
