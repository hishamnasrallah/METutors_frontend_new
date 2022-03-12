import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';

import {
  AdminComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
} from './containers';

import { AdminSidebarComponent, AdminNavbarComponent } from './components';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminSupportTicketComponent,
    AdminTicketDetailsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxAutoScrollModule,
  ],
})
export class AdminModule {}
