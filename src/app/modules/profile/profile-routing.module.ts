import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard, TutorAuthGuard } from 'src/app/core/guards';

import {
  TutorProfileComponent,
  CompleteTutorProfileComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'complete-profile',
    canActivate: [TutorAuthGuard, ProfileGuard],
    component: CompleteTutorProfileComponent,
    data: {
      layout: {
        title: 'COMPLETE_TUTOR_PROFILE',
        showHeader: false,
        showFooter: false,
      },
    },
  },
  {
    path: 'tutor/:id',
    component: TutorProfileComponent,
    data: { layout: { title: 'TUTOR_PROFILE' } },
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
