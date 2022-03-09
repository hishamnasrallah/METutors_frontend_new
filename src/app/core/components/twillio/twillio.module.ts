import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  HomeComponent,
  RoomsComponent,
  CameraComponent,
  SettingsComponent,
  DeviceSelectComponent,
  ParticipantsComponent,
} from './components';

@NgModule({
  declarations: [
    HomeComponent,
    RoomsComponent,
    CameraComponent,
    SettingsComponent,
    ParticipantsComponent,
    DeviceSelectComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [HomeComponent],
})
export class TwillioModule {}
