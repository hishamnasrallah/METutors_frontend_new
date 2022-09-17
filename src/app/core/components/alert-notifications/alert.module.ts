import { MaxPipe } from './max.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertItemComponent } from './alert-item.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [AlertComponent, AlertItemComponent, MaxPipe],
  exports: [AlertComponent, AlertItemComponent],
})
export class AlertNotificationsModule {}
