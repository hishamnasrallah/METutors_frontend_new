import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { MatButtonModule } from '@angular/material/button';
import { PublicRoutingModule } from './public-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { ContactService, SupportService } from 'src/app/core/services';
import { GoogleMapsModule } from '@angular/google-maps';

import { SharedModule } from '@metutor/shared/shared.module';
import {
  FaqComponent,
  HomeComponent,
  AboutComponent,
  ContactComponent,
  WelcomeComponent,
  FaqTicketComponent,
  BecomeTutorComponent,
  StudentSuccessComponent,
  LanguagesCoursesComponent,
} from './containers';

import {
  HomeSlideComponent,
  FaqSearchComponent,
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
  SelectFaqTopicComponent,
  SuccessStoriesComponent,
  BecomeTutorsUsComponent,
  FactsStatisticsComponent,
  LanguageCoursesComponent,
  StartLearningNowComponent,
  BecomeTutorSlideComponent,
  LearningMadeEasyComponent,
  FaqListQuestionsComponent,
  ContactHelpToHereComponent,
  RequestPostCourseComponent,
  BecomeOnlineTutorComponent,
  StillHaveQuestionsComponent,
  InnovativeApproachComponent,
  ContactSendMessageComponent,
  HomeFeaturedTutorsComponent,
  TrustHappyStudentsComponent,
  StudentSuccessSlideComponent,
  LearningEnvironmentComponent,
  LovingOpportunitiesComponent,
  LanguagesIntroducingComponent,
  LanguagesTestomonialComponent,
  BenefitsOnlineTutoringComponent,
  BenefitsAcademicTutoringComponent,
  ExceptionalOpportunitiesComponent,
} from './components';

@NgModule({
  declarations: [
    FaqComponent,
    HomeComponent,
    AboutComponent,
    WelcomeComponent,
    ContactComponent,
    FaqSearchComponent,
    HomeSlideComponent,
    FaqTicketComponent,
    AboutSlideComponent,
    WhyWeTeachComponent,
    AboutValuesComponent,
    FounderTeamComponent,
    WhyMetutorsComponent,
    HomeCoursesComponent,
    VideoPlayerComponent,
    BecomeTutorComponent,
    WhyTeachingUsComponent,
    SelectFaqTopicComponent,
    BecomeTutorsUsComponent,
    StudentSuccessComponent,
    LanguagesSlideComponent,
    SuccessStoriesComponent,
    GetYourClassesComponent,
    LanguageCoursesComponent,
    FactsStatisticsComponent,
    StartLearningNowComponent,
    LanguagesCoursesComponent,
    BecomeTutorSlideComponent,
    LearningMadeEasyComponent,
    FaqListQuestionsComponent,
    ContactHelpToHereComponent,
    RequestPostCourseComponent,
    BecomeOnlineTutorComponent,
    ContactSendMessageComponent,
    InnovativeApproachComponent,
    StillHaveQuestionsComponent,
    HomeFeaturedTutorsComponent,
    TrustHappyStudentsComponent,
    StudentSuccessSlideComponent,
    LearningEnvironmentComponent,
    LovingOpportunitiesComponent,
    LanguagesIntroducingComponent,
    LanguagesTestomonialComponent,
    BenefitsOnlineTutoringComponent,
    ExceptionalOpportunitiesComponent,
    BenefitsAcademicTutoringComponent,
  ],
  imports: [
    FormsModule,
    VgCoreModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    CarouselModule,
    MatButtonModule,
    GoogleMapsModule,
    VgControlsModule,
    VgBufferingModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    VgOverlayPlayModule,
    RatingModule.forRoot(),
  ],
  providers: [ContactService],
})
export class PublicModule {}
