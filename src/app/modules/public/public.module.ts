import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'ngx-bootstrap/rating';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatIconModule } from '@angular/material/icon';
import { ContactService } from 'src/app/core/services';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SharedModule } from '@metutor/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

// import * as publicEffects from './state/effects';
import * as fromPublic from '@metutor/modules/public/state';
import * as featureKeys from '@metutor/modules/public/state/feature-keys';

import {
  FaqComponent,
  HomeComponent,
  AboutComponent,
  ContactComponent,
  WelcomeComponent,
  FaqTicketComponent,
  AllCoursesComponent,
  BecomeTutorComponent,
  StudentSuccessComponent,
  TermsConditionsComponent,
  LanguagesCoursesComponent,
} from './containers';

import {
  ViewPricesDialog,
  HomeSlideComponent,
  FaqSearchComponent,
  CourseCardComponent,
  AboutSlideComponent,
  WhyWeTeachComponent,
  ChooseCountryDialog,
  FounderTeamComponent,
  AboutValuesComponent,
  WhyMetutorsComponent,
  HomeCoursesComponent,
  WhyTeachingUsComponent,
  GetYourClassesComponent,
  ExploreCoursesComponent,
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
  HomeServicesFeaturesComponent,
  LanguagesIntroducingComponent,
  LanguagesTestomonialComponent,
  RequestNewCourseModalComponent,
  HomeStudyMoreReadMoreComponent,
  BenefitsOnlineTutoringComponent,
  ViewSubjectDetailsModalComponent,
  BenefitsAcademicTutoringComponent,
  ExceptionalOpportunitiesComponent,
  AcademicLearningEnvironmentComponent,
} from './components';

@NgModule({
  declarations: [
    FaqComponent,
    HomeComponent,
    AboutComponent,
    WelcomeComponent,
    ContactComponent,
    ViewPricesDialog,
    FaqSearchComponent,
    HomeSlideComponent,
    FaqTicketComponent,
    AboutSlideComponent,
    WhyWeTeachComponent,
    ChooseCountryDialog,
    AllCoursesComponent,
    CourseCardComponent,
    AboutValuesComponent,
    FounderTeamComponent,
    WhyMetutorsComponent,
    HomeCoursesComponent,
    BecomeTutorComponent,
    WhyTeachingUsComponent,
    SelectFaqTopicComponent,
    BecomeTutorsUsComponent,
    StudentSuccessComponent,
    LanguagesSlideComponent,
    SuccessStoriesComponent,
    GetYourClassesComponent,
    ExploreCoursesComponent,
    LanguageCoursesComponent,
    TermsConditionsComponent,
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
    HomeServicesFeaturesComponent,
    HomeStudyMoreReadMoreComponent,
    RequestNewCourseModalComponent,
    BenefitsOnlineTutoringComponent,
    ViewSubjectDetailsModalComponent,
    ExceptionalOpportunitiesComponent,
    BenefitsAcademicTutoringComponent,
    AcademicLearningEnvironmentComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    MatIconModule,
    CarouselModule,
    MatButtonModule,
    MatSelectModule,
    NgxSliderModule,
    GoogleMapsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    RatingModule.forRoot(),
    // EffectsModule.forFeature(Object.values(publicEffects)),
    StoreModule.forFeature(featureKeys.publicFeatureKey, fromPublic.reducers),
  ],
  providers: [ContactService],
})
export class PublicModule {}
