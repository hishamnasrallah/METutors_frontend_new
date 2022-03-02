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
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '@metutor/shared/shared.module';

import {
  TutorProfileComponent,
  CompleteTutorProfileComponent,
} from './containers';

import {
  TutorProfileShareComponent,
  TutorProfileHeaderComponent,
  TutorProfileAboutMeComponent,
  TutorProfileLanguagesComponent,
  DialogSelectAvailabilityDialog,
  TutorProfileTutorBadgesComponent,
  TutorProfileSpecializationComponent,
  TutorProfileFeedbackRatingsComponent,
  CompleteTutorProfileProfilePictureComponent,
  CompleteTutorProfilePersonalInformationComponent,
  CompleteTutorProfileQualificationDetailsComponent,
  CompleteTutorProfileTeachingSpecificationsComponent,
} from './components';

@NgModule({
  declarations: [
    TutorProfileComponent,
    TutorProfileShareComponent,
    TutorProfileHeaderComponent,
    TutorProfileAboutMeComponent,
    CompleteTutorProfileComponent,
    TutorProfileLanguagesComponent,
    DialogSelectAvailabilityDialog,
    TutorProfileTutorBadgesComponent,
    TutorProfileSpecializationComponent,
    TutorProfileFeedbackRatingsComponent,
    CompleteTutorProfileProfilePictureComponent,
    CompleteTutorProfilePersonalInformationComponent,
    CompleteTutorProfileQualificationDetailsComponent,
    CompleteTutorProfileTeachingSpecificationsComponent,
  ],
  imports: [
    FormsModule,
    MomentModule,
    CommonModule,
    SharedModule,
    RatingModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatRadioModule,
    DirectiveModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ShareButtonsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {}
