import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  NotAuthGuard,
  StudentAuthGuard,
  TutorAuthGuard,
} from '@guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: '',
    canActivate: [NotAuthGuard],
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'requests',
    loadChildren: () =>
      import('./modules/requests/requests.module').then(
        (m) => m.RequestsModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'student',
    canActivate: [StudentAuthGuard],
    loadChildren: () =>
      import('./modules/student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'tutor',
    canActivate: [TutorAuthGuard],
    loadChildren: () =>
      import('./modules/tutor/tutor.module').then((m) => m.TutorModule),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [NotAuthGuard, AuthGuard, TutorAuthGuard, StudentAuthGuard],
})
export class AppRoutingModule {}
