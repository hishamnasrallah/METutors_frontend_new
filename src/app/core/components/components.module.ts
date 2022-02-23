import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer';
import { NavbarComponent } from './navbar';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [FooterComponent, NavbarComponent],
})
export class ComponentsModule {}
