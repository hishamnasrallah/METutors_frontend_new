import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './containers';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    data: { layout: { title: 'Sign in - METutors', showFooter: false } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
