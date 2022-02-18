import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LearningEnvironmentComponent } from '.';

@NgModule({
  declarations: [LearningEnvironmentComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [LearningEnvironmentComponent],
})
export class LearningEnvironmentModule {}
