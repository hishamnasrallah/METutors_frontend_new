import { NgModule } from '@angular/core';
import { TutorAuthGuard } from 'src/app/core/guards';
import { RouterModule, Routes } from '@angular/router';

import {
  TutorProfileComponent,
  CompleteTutorProfileComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'complete-profile',
    // canActivate: [TutorAuthGuard],
    component: CompleteTutorProfileComponent,
    data: {
      layout: {
        title: 'Complete tutor profile - MEtutors',
        showHeader: false,
        showFooter: false,
      },
    },
  },
  {
    path: 'tutor/:id',
    component: TutorProfileComponent,
    data: { layout: { title: 'Tutor profile' } },
  },
  {
    path: '',
    redirectTo: '/profile/complete-profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
