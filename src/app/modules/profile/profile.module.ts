import { NgModule } from '@angular/core';
import { MomentModule } from 'ngx-moment';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

import * as fromProfile from './state';
import { StoreModule } from '@ngrx/store';
import * as featureKeys from './state/feature-keys';

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
  TutorProfileVideoPreviewComponent,
  TutorProfileSpecializationComponent,
  TutorProfileFeedbackRatingsComponent,
  TutorProfileAvailablityTutoringComponent,
  CompleteTutorProfileProfilePictureComponent,
  CompleteTutorProfileTutoringCoursesComponent,
  CompleteTutorProfilePersonalInformationComponent,
  CompleteTutorProfileQualificationDetailsComponent,
  CompleteTutorProfileTeachingSpecificationsComponent,
} from './components';
import { AccountModule } from '@metutor/modules/account/account.module';

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
    TutorProfileVideoPreviewComponent,
    TutorProfileSpecializationComponent,
    TutorProfileFeedbackRatingsComponent,
    TutorProfileAvailablityTutoringComponent,
    CompleteTutorProfileProfilePictureComponent,
    CompleteTutorProfileTutoringCoursesComponent,
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
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    ShareButtonsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ProfileRoutingModule,
    StoreModule.forFeature(featureKeys.profileFeatureKey, fromProfile.reducers),
    AccountModule,
  ],
})
export class ProfileModule {}
