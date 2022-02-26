import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DirectiveModule } from 'src/app/shared/directives';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubmitButtonModule } from 'src/app/shared/components/';

import {
  SigninComponent,
  SignupComponent,
  ConfirmEmailComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
} from './containers';

import {
  RolesSelectComponent,
  AuthOpinionsComponent,
  SignupUploadDocumentsComponent,
  SignupEmailVerificationComponent,
} from './components';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DirectiveModule,
    NgOtpInputModule,
    MatCheckboxModule,
    SubmitButtonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    NgxIntlTelInputModule,
  ],
  providers: [],
})
export class AccountModule {}
