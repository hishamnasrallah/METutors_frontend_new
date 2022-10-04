import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { SharedModule } from '@metutor/shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AccountRoutingModule } from './account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromAccount from './state';
import { StoreModule } from '@ngrx/store';
import * as featureKeys from './state/feature-keys';

import {
  SigninComponent,
  SignupComponent,
  ConfirmEmailComponent,
  AccessDeniedComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
} from './containers';

import {
  OtpVerifyComponent,
  RolesSelectComponent,
  AuthOpinionsComponent,
  SignupEmailVerificationComponent,
  SigninEmailVerificationModalComponent,
} from './components';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    OtpVerifyComponent,
    RolesSelectComponent,
    ConfirmEmailComponent,
    AuthOpinionsComponent,
    AccessDeniedComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    SignupEmailVerificationComponent,
    SigninEmailVerificationModalComponent,
  ],
  imports: [
    FormsModule,
    RatingModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NgOtpInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    NgxIntlTelInputModule,
    StoreModule.forFeature(featureKeys.accountFeatureKey, fromAccount.reducers),
  ],
  providers: [],
  exports: [ConfirmEmailComponent],
})
export class AccountModule {}
