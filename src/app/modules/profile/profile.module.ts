import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { DirectiveModule } from 'src/app/shared/directives';
import { MomentModule } from 'ngx-moment';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    MatChipsModule,
    MatInputModule,
    DirectiveModule,
    MatButtonModule,
    MatSelectModule,
    ShareButtonsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
