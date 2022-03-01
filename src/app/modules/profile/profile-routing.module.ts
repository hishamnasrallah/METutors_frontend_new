import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorAuthGuard } from 'src/app/core/guards';

import {
  TutorProfileComponent,
  CompleteTutorProfileComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'complete-profile',
    canActivate: [TutorAuthGuard],
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
    path: 'tutor-profile/:id',
    component: TutorProfileComponent,
    data: { layout: { title: 'Tutor profile' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
