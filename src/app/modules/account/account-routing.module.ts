import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  SigninComponent,
  SignupComponent,
  ConfirmEmailComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    data: {
      layout: {
        title: 'Sign in - MEtutors',
        showHeader: false,
        showFooter: false,
      },
    },
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      layout: {
        title: 'Sign up - MEtutors',
        showHeader: false,
        showFooter: false,
      },
    },
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    data: {
      layout: {
        title: 'Forget password - MEtutors',
        showFooter: false,
      },
    },
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      layout: {
        title: 'Reset password - MEtutors',
        showFooter: false,
      },
    },
  },
  {
    path: 'reset-password/:token/:email',
    component: ResetPasswordComponent,
    data: {
      layout: {
        title: 'Reset password - MEtutors',
        showHeader: false,
        showFooter: false,
      },
    },
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
    data: {
      layout: {
        title: 'Confirm email - MEtutors',
        showFooter: false,
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
