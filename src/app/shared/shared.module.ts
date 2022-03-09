import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Popups
import {
  DialogCourseDetailsPopup,
  CourseDetailsPopupComponent,
  DialogClassroomDetailsPopup,
  ClassroomDetailsPopupComponent,
} from '@metutor/shared/popups';

// Components
import {
  ModalComponent,
  CourseItemComponent,
  ModalComponentTemplate,
  SubmitButtonComponent,
  ClassroomItemComponent,
  CardPlaceholderComponent,
  GridPlaceholderComponent,
  CourseItemHorizentalComponent,
  ClassroomItemHorizentalComponent,
} from '@metutor/shared/components';

// Directives
import {
  LetDirective,
  TrimInputDirective,
  OnlyNumberDirective,
  DefaultCoverDirective,
  DefaultAvatarDirective,
  DefaultCourseDirective,
} from '@metutor/shared/directives';

@NgModule({
  declarations: [
    CourseItemComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    CourseItemHorizentalComponent,
    ClassroomItemHorizentalComponent,

    // Modal
    ModalComponent,
    ModalComponentTemplate,

    // Popups
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RatingModule,
    RouterModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  exports: [
    CourseItemComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    CourseItemHorizentalComponent,
    ClassroomItemHorizentalComponent,

    // Modal
    ModalComponent,
    ModalComponentTemplate,

    // Popups
    DialogCourseDetailsPopup,
    CourseDetailsPopupComponent,
    DialogClassroomDetailsPopup,
    ClassroomDetailsPopupComponent,

    // Directives
    LetDirective,
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
})
export class SharedModule {}
