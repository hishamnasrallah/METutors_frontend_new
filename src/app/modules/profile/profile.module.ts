import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { DirectiveModule } from 'src/app/shared/directives';
import { MomentModule } from 'ngx-moment';

import {
  TutorProfileComponent,
  CompleteTutorProfileComponent,
} from './containers';

import {
  TutorProfileShareComponent,
  TutorProfileHeaderComponent,
  TutorProfileAboutMeComponent,
  TutorProfileLanguagesComponent,
  TutorProfileTutorBadgesComponent,
  TutorProfileSpecializationComponent,
  TutorProfileFeedbackRatingsComponent,
} from './components';

@NgModule({
  declarations: [
    TutorProfileComponent,
    TutorProfileShareComponent,
    TutorProfileHeaderComponent,
    TutorProfileAboutMeComponent,
    CompleteTutorProfileComponent,
    TutorProfileLanguagesComponent,
    TutorProfileTutorBadgesComponent,
    TutorProfileSpecializationComponent,
    TutorProfileFeedbackRatingsComponent,
  ],
  imports: [
    FormsModule,
    MomentModule,
    CommonModule,
    RatingModule,
    MatIconModule,
    DirectiveModule,
    MatButtonModule,
    ShareButtonsModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
