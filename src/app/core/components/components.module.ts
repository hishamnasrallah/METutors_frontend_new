import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer';
import { NavbarComponent } from './navbar';
import { NavbarMobileComponent } from './navbar-mobile';

@NgModule({
  declarations: [FooterComponent, NavbarComponent, NavbarMobileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    SidebarModule,
    MatButtonModule,
  ],
  exports: [FooterComponent, NavbarComponent, NavbarMobileComponent],
})
export class ComponentsModule {}
