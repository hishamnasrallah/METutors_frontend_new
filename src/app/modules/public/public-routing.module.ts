import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  FaqComponent,
  HomeComponent,
  AboutComponent,
  StudyComponent,
  ContactComponent,
  WelcomeComponent,
  FaqTicketComponent,
  AllCoursesComponent,
  BecomeTutorComponent,
  PrivacyPolicyComponent,
  LanguagesCoursesComponent,
  TutorTermsConditionsComponent,
  StudentTermsConditionsComponent,
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
    path: 'study',
    component: StudyComponent,
    data: { layout: { title: 'Study - Metutors' } },
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
    path: 'contact',
    component: ContactComponent,
    data: { layout: { title: 'Contact - Metutors' } },
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { layout: { title: 'FAQ - Metutors' } },
  },
  {
    path: 'faq/:topic',
    component: FaqTicketComponent,
    data: { layout: { title: 'FAQ - Metutors' } },
  },
  {
    path: 'languages-courses',
    component: LanguagesCoursesComponent,
    data: { layout: { title: 'Languages - Metutors' } },
  },
  {
    path: 'all-courses/:programId',
    component: AllCoursesComponent,
    data: { layout: { title: 'Courses - Metutors' } },
  },
  {
    path: 'student-terms-conditions',
    component: StudentTermsConditionsComponent,
    data: { layout: { title: 'Terms and Conditions - Metutors' } },
  },
  {
    path: 'tutor-terms-conditions',
    component: TutorTermsConditionsComponent,
    data: { layout: { title: 'Terms and Conditions - Metutors' } },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { layout: { title: 'Privacy Policy - Metutors' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
