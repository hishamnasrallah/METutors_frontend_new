import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AdminComponent } from './containers';

import { AdminSidebarComponent } from './components';

@NgModule({
  declarations: [AdminComponent, AdminSidebarComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
