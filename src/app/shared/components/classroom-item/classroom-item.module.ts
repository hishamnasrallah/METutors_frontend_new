import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomItemComponent } from './classroom-item.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { DirectiveModule } from '../../directives';

@NgModule({
  declarations: [ClassroomItemComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    DirectiveModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  exports: [ClassroomItemComponent],
})
export class ClassroomItemModule {}
