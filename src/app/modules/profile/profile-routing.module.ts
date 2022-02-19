import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompleteTutorProfileComponent } from './containers';

const routes: Routes = [
  {
    path: 'complete-profile',
    component: CompleteTutorProfileComponent,
    data: { layout: { title: 'Complete tutor profile', showFooter: false } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
