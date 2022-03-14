import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedModule } from '@metutor/shared/shared.module';

import {
  SigninComponent,
  SignupComponent,
  ConfirmEmailComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
} from './containers';

import {
  OtpVerifyComponent,
  RolesSelectComponent,
  AuthOpinionsComponent,
  SignupUploadDocumentsComponent,
  SignupEmailVerificationComponent,
} from './components';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    OtpVerifyComponent,
    RolesSelectComponent,
    ConfirmEmailComponent,
    AuthOpinionsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    SignupUploadDocumentsComponent,
    SignupEmailVerificationComponent,
  ],
  imports: [
    FormsModule,
    RatingModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgOtpInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    NgxIntlTelInputModule,
  ],
  providers: [],
})
export class AccountModule {}
