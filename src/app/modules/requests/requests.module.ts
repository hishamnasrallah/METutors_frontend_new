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
import { DirectiveModule } from 'src/app/shared/directives';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';

import { RequestTutorComponent } from './containers';

import {
  DialogEditClassroom,
  DialogRemoveClassroom,
  ReviewRequestComponent,
  SelectTutorFormComponent,
  ClassroomInfoFormComponent,
  ListClassroomsFormComponent,
  CourseInformationFormComponent,
} from './components';

@NgModule({
  declarations: [
    DialogEditClassroom,
    DialogRemoveClassroom,
    RequestTutorComponent,
    ReviewRequestComponent,
    SelectTutorFormComponent,
    ClassroomInfoFormComponent,
    ListClassroomsFormComponent,
    CourseInformationFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    DirectiveModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RequestsRoutingModule,
    RatingModule.forRoot(),
  ],
})
export class RequestsModule {}
