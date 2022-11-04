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
  ExploreTutorsComponent,
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
    data: { layout: { title: 'WELCOME' } },
  },
  {
    path: 'study',
    component: StudyComponent,
    data: { layout: { title: 'STUDY' } },
  },
  {
    path: 'become-tutor',
    component: BecomeTutorComponent,
    data: { layout: { title: 'BECOME_TUTOR' } },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { layout: { title: 'ABOUT_US' } },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { layout: { title: 'CONTACT_US' } },
  },
  {
    path: 'faq',
    component: FaqComponent,
    data: { layout: { title: 'FAQS' } },
  },
  {
    path: 'faq/:topic',
    component: FaqTicketComponent,
    data: { layout: { title: 'FAQS' } },
  },
  {
    path: 'languages-courses',
    component: LanguagesCoursesComponent,
    data: { layout: { title: 'LANGUAGES' } },
  },
  {
    path: 'all-courses/:programId',
    component: AllCoursesComponent,
    data: { layout: { title: 'COURSES' } },
  },
  {
    path: 'explore-tutors',
    component: ExploreTutorsComponent,
    data: { layout: { title: 'EXPLORE_TUTORS' } },
  },
  {
    path: 'student-terms-conditions',
    component: StudentTermsConditionsComponent,
    data: { layout: { title: 'TERMS_CONDITIONS' } },
  },
  {
    path: 'tutor-terms-conditions',
    component: TutorTermsConditionsComponent,
    data: { layout: { title: 'TERMS_CONDITIONS' } },
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: { layout: { title: 'PRIVACY_POLICY' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
