import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SupportService } from 'src/app/core/services';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import {
  ClassroomAttendancesPopupModule,
  LeaveFeedbackPopupModule,
} from 'src/app/shared/popups';

import {
  ClassroomItemModule,
  ClassroomPlaceholderModule,
} from 'src/app/shared/components';

import {
  StudentComponent,
  StudentFaqComponent,
  StudentHelpComponent,
  StudentClassesComponent,
  StudentSyllabusComponent,
  StudentClassroomsComponent,
  StudentCreateTicketComponent,
  StudentSupportTicketComponent,
  StudentTicketDetailsComponent,
} from './containers';

import {
  StudentSidebarComponent,
  FaqAboutStudentsComponent,
  FaqListQuestionsComponent,
  FaqStillHaveQuestionsComponent,
} from './components';

@NgModule({
  declarations: [
    StudentComponent,
    StudentFaqComponent,
    StudentHelpComponent,
    StudentClassesComponent,
    StudentSidebarComponent,
    StudentSyllabusComponent,
    FaqListQuestionsComponent,
    FaqAboutStudentsComponent,
    StudentClassroomsComponent,
    StudentCreateTicketComponent,
    StudentTicketDetailsComponent,
    StudentSupportTicketComponent,
    FaqStillHaveQuestionsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ClassroomItemModule,
    NgxAutoScrollModule,
    StudentRoutingModule,
    MatProgressBarModule,
    LeaveFeedbackPopupModule,
    ClassroomPlaceholderModule,
    ClassroomAttendancesPopupModule,
  ],
  providers: [SupportService],
})
export class StudentModule {}
