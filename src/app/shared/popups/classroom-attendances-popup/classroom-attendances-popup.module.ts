import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ClassroomAttendancesPopupComponent,
  DialogClassroomAttendancesPopup,
} from './classroom-attendances-popup.component';

@NgModule({
  declarations: [
    DialogClassroomAttendancesPopup,
    ClassroomAttendancesPopupComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [ClassroomAttendancesPopupComponent],
})
export class ClassroomAttendancesPopupModule {}
