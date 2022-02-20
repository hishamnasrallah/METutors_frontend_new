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

import {
  SigninComponent,
  SignupComponent,
  ConfirmEmailComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
} from './containers';

import { RolesSelectComponent, AuthOpinionsComponent } from './components';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    RolesSelectComponent,
    ConfirmEmailComponent,
    AuthOpinionsComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
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
    ReactiveFormsModule,
    AccountRoutingModule,
    NgxIntlTelInputModule,
  ],
  providers: [],
})
export class AccountModule {}
