import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SubmitButtonComponent } from './submit-button.component';

@NgModule({
  declarations: [SubmitButtonComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [SubmitButtonComponent],
})
export class SubmitButtonModule {}
