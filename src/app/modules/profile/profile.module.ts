import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';

import { CompleteTutorProfileComponent } from './containers';

@NgModule({
  declarations: [CompleteTutorProfileComponent],
  imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
