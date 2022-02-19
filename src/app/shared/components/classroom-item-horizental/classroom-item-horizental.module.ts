import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomItemHorizentalComponent } from './classroom-item-horizental.component';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClassroomDetailsPopupModule } from '../../popups';
import { DirectiveModule } from '../../directives';

@NgModule({
  declarations: [ClassroomItemHorizentalComponent],
  imports: [
    FormsModule,
    CommonModule,
    RatingModule,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatTooltipModule,
    ClassroomDetailsPopupModule,
  ],
  exports: [ClassroomItemHorizentalComponent],
})
export class ClassroomItemHorizentalModule {}
