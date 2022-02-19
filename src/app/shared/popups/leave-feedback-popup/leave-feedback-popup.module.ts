import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule } from '@angular/forms';
import {
  LeaveFeedbackPopupComponent,
  DialogLeaveFeedbackPopup,
} from './leave-feedback-popup.component';

@NgModule({
  declarations: [LeaveFeedbackPopupComponent, DialogLeaveFeedbackPopup],
  imports: [
    CommonModule,
    RatingModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [LeaveFeedbackPopupComponent],
})
export class LeaveFeedbackPopupModule {}
