import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatButtonModule } from '@angular/material/button';
import { PublicRoutingModule } from './public-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import {
  CourseItemModule,
  VideoPlayerModule,
  SuccessStoriesModule,
  StartLearningNowModule,
  LearningEnvironmentModule,
  CourseItemHorizentalModule,
  BenefitsOnlineTutoringModule,
} from 'src/app/shared/components';

import { DirectiveModule } from 'src/app/shared/directives';

import {
  HomeComponent,
  AboutComponent,
  WelcomeComponent,
  BecomeTutorComponent,
  StudentSuccessComponent,
  LanguagesCoursesComponent,
} from './containers';

import {
  HomeSlideComponent,
  AboutSlideComponent,
  WhyWeTeachComponent,
  FounderTeamComponent,
  AboutValuesComponent,
  WhyMetutorsComponent,
  HomeCoursesComponent,
  WhyTeachingUsComponent,
  GetYourClassesComponent,
  LanguagesSlideComponent,
  BecomeTutorsUsComponent,
  BecomeTutorSlideComponent,
  LearningMadeEasyComponent,
  LanguageCoursesComponent,
  HomeStudyMetutorsComponent,
  RequestPostCourseComponent,
  BecomeOnlineTutorComponent,
  InnovativeApproachComponent,
  HomeFeaturedTutorsComponent,
  TrustHappyStudentsComponent,
  StudentSuccessSlideComponent,
  LovingOpportunitiesComponent,
  LanguagesIntroducingComponent,
  LanguagesTestomonialComponent,
  ExceptionalOpportunitiesComponent,
} from './components';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    WelcomeComponent,
    HomeSlideComponent,
    AboutSlideComponent,
    WhyWeTeachComponent,
    AboutValuesComponent,
    FounderTeamComponent,
    WhyMetutorsComponent,
    HomeCoursesComponent,
    BecomeTutorComponent,
    WhyTeachingUsComponent,
    BecomeTutorsUsComponent,
    StudentSuccessComponent,
    LanguagesSlideComponent,
    GetYourClassesComponent,
    LanguageCoursesComponent,
    LanguagesCoursesComponent,
    BecomeTutorSlideComponent,
    LearningMadeEasyComponent,
    HomeStudyMetutorsComponent,
    RequestPostCourseComponent,
    BecomeOnlineTutorComponent,
    InnovativeApproachComponent,
    HomeFeaturedTutorsComponent,
    TrustHappyStudentsComponent,
    StudentSuccessSlideComponent,
    LovingOpportunitiesComponent,
    LanguagesIntroducingComponent,
    LanguagesTestomonialComponent,
    ExceptionalOpportunitiesComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    CarouselModule,
    MatButtonModule,
    DirectiveModule,
    CourseItemModule,
    VideoPlayerModule,
    PublicRoutingModule,
    SuccessStoriesModule,
    RatingModule.forRoot(),
    StartLearningNowModule,
    LearningEnvironmentModule,
    CourseItemHorizentalModule,
    BenefitsOnlineTutoringModule,
  ],
})
export class PublicModule {}
