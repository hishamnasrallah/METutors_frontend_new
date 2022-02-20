import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  HomeComponent,
  AboutComponent,
  WelcomeComponent,
  BecomeTutorComponent,
  StudentSuccessComponent,
  LanguagesCoursesComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { layout: { title: 'MEtutors' } },
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { layout: { title: 'Welcome - Metutors' } },
  },
  {
    path: 'student-success',
    component: StudentSuccessComponent,
    data: { layout: { title: 'Student Success - Metutors' } },
  },
  {
    path: 'become-tutor',
    component: BecomeTutorComponent,
    data: { layout: { title: 'Become A Tutor - Metutors' } },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { layout: { title: 'About - Metutors' } },
  },
  {
    path: 'languages-courses',
    component: LanguagesCoursesComponent,
    data: { layout: { title: 'Languages - Metutors' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
