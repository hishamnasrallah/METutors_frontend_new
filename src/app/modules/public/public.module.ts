import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatButtonModule } from '@angular/material/button';
import { PublicRoutingModule } from './public-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import {
  CourseItemModule,
  CourseItemHorizentalModule,
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
  VideoPlayerComponent,
  WhyTeachingUsComponent,
  GetYourClassesComponent,
  LanguagesSlideComponent,
  SuccessStoriesComponent,
  BecomeTutorsUsComponent,
  StartLearningNowComponent,
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
  LearningEnvironmentComponent,
  LovingOpportunitiesComponent,
  LanguagesIntroducingComponent,
  LanguagesTestomonialComponent,
  BenefitsOnlineTutoringComponent,
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
    VideoPlayerComponent,
    BecomeTutorComponent,
    WhyTeachingUsComponent,
    BecomeTutorsUsComponent,
    StudentSuccessComponent,
    LanguagesSlideComponent,
    SuccessStoriesComponent,
    GetYourClassesComponent,
    LanguageCoursesComponent,
    StartLearningNowComponent,
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
    LearningEnvironmentComponent,
    LovingOpportunitiesComponent,
    LanguagesIntroducingComponent,
    LanguagesTestomonialComponent,
    BenefitsOnlineTutoringComponent,
    ExceptionalOpportunitiesComponent,
  ],
  imports: [
    FormsModule,
    VgCoreModule,
    CommonModule,
    MatIconModule,
    CarouselModule,
    MatButtonModule,
    DirectiveModule,
    CourseItemModule,
    VgControlsModule,
    VgBufferingModule,
    PublicRoutingModule,
    VgOverlayPlayModule,
    RatingModule.forRoot(),
    CourseItemHorizentalModule,
  ],
})
export class PublicModule {}
