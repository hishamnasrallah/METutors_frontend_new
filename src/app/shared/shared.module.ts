import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DirectiveModule } from '@metutor/shared/directives';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  CourseDetailsPopupModule,
  ClassroomDetailsPopupModule,
} from '@metutor/shared/popups';

import {
  CourseItemComponent,
  SubmitButtonComponent,
  ClassroomItemComponent,
  CardPlaceholderComponent,
  GridPlaceholderComponent,
  CourseItemHorizentalComponent,
  ClassroomItemHorizentalComponent,
} from '@metutor/shared/components';

@NgModule({
  declarations: [
    CourseItemComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    CourseItemHorizentalComponent,
    ClassroomItemHorizentalComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RatingModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatTooltipModule,
    MatProgressBarModule,
    CourseDetailsPopupModule,
    ClassroomDetailsPopupModule,
  ],
  exports: [
    CourseItemComponent,
    SubmitButtonComponent,
    ClassroomItemComponent,
    CardPlaceholderComponent,
    GridPlaceholderComponent,
    CourseItemHorizentalComponent,
    ClassroomItemHorizentalComponent,
  ],
})
export class SharedModule {}
