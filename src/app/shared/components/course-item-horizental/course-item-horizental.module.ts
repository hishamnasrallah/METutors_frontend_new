import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemHorizentalComponent } from './course-item-horizental.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from '../../directives';
import { CourseDetailsPopupModule } from '../../popups';

@NgModule({
  declarations: [CourseItemHorizentalComponent],
  imports: [
    FormsModule,
    CommonModule,
    RatingModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatTooltipModule,
    CourseDetailsPopupModule,
  ],
  exports: [CourseItemHorizentalComponent],
})
export class CourseItemHorizentalModule {}
