import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ClassroomDetailsPopupComponent,
  DialogClassroomDetailsPopup,
} from './classroom-details-popup.component';

@NgModule({
  declarations: [ClassroomDetailsPopupComponent, DialogClassroomDetailsPopup],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [ClassroomDetailsPopupComponent],
})
export class ClassroomDetailsPopupModule {}
