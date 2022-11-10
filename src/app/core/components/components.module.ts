import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@metutor/shared/shared.module';

import { FooterComponent } from './footer';
import { NavbarComponent } from './navbar';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    TranslateModule,
    BsDropdownModule.forRoot()
  ],
  exports: [FooterComponent, NavbarComponent]
})
export class ComponentsModule {}
