import { NgModule } from '@angular/core';
import { NotAuthGuard } from '@metutor/core/guards';
import { RouterModule, Routes } from '@angular/router';

import {
  SigninComponent,
  SignupComponent,
  AccessDeniedComponent,
  ConfirmEmailComponent,
  ResetPasswordComponent,
  ForgetPasswordComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [NotAuthGuard],
    data: {
      layout: {
        title: 'SIGN_IN',
        showHeader: false,
        showFooter: false,
      },
    },
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NotAuthGuard],
    data: {
      layout: {
        title: 'SIGN_UP',
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
        title: 'FORGET_PASSWORD',
        showFooter: false,
      },
    },
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      layout: {
        title: 'RESET_PASSWORD',
        showFooter: false,
      },
    },
  },
  {
    path: 'reset-password/:token/:email',
    component: ResetPasswordComponent,
    data: {
      layout: {
        title: 'RESET_PASSWORD',
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
        title: 'CONFIRM_EMAIL',
        showFooter: false,
      },
    },
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    data: {
      layout: {
        title: 'ACCESS_DENIED',
        showHeader: false,
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
