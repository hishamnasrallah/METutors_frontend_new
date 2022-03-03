import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

// Popups
import {
  CourseDetailsPopupModule,
  ClassroomDetailsPopupModule,
} from '@metutor/shared/popups';

// Components
import {
  CourseItemComponent,
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
    MatButtonModule,
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
