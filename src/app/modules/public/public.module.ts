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
import { CarouselModule as NGXCarouselModule } from 'ngx-bootstrap/carousel';

// import * as publicEffects from './state/effects';
import * as fromPublic from '@metutor/modules/public/state';
import * as featureKeys from '@metutor/modules/public/state/feature-keys';

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
  StudentTermsConditionsComponent
} from './containers';

import {
  ViewPricesDialog,
  HomeSlideComponent,
  FaqSearchComponent,
  TutorCardComponent,
  CourseCardComponent,
  AboutSlideComponent,
  WhyWeTeachComponent,
  StudySlideComponent,
  FounderTeamComponent,
  AboutValuesComponent,
  WhyMetutorsComponent,
  HomeCoursesComponent,
  OurPartnersComponent,
  WhyTeachingUsComponent,
  GetYourClassesComponent,
  ExploreHeadingComponent,
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
  ChooseCountryDialogComponent,
  LearningEnvironmentComponent,
  LovingOpportunitiesComponent,
  HomeServicesFeaturesComponent,
  LanguagesIntroducingComponent,
  LanguagesTestomonialComponent,
  RequestNewCourseModalComponent,
  HomeStudyMoreReadMoreComponent,
  SelectProgramCategoryComponent,
  BenefitsOnlineTutoringComponent,
  ViewSubjectDetailsModalComponent,
  BenefitsAcademicTutoringComponent,
  ExceptionalOpportunitiesComponent,
  AcademicLearningEnvironmentComponent
} from './components';

@NgModule({
  declarations: [
    FaqComponent,
    HomeComponent,
    StudyComponent,
    AboutComponent,
    WelcomeComponent,
    ContactComponent,
    ViewPricesDialog,
    FaqSearchComponent,
    HomeSlideComponent,
    TutorCardComponent,
    FaqTicketComponent,
    AboutSlideComponent,
    WhyWeTeachComponent,
    AllCoursesComponent,
    CourseCardComponent,
    StudySlideComponent,
    AboutValuesComponent,
    FounderTeamComponent,
    WhyMetutorsComponent,
    HomeCoursesComponent,
    BecomeTutorComponent,
    OurPartnersComponent,
    WhyTeachingUsComponent,
    PrivacyPolicyComponent,
    ExploreTutorsComponent,
    SelectFaqTopicComponent,
    BecomeTutorsUsComponent,
    LanguagesSlideComponent,
    SuccessStoriesComponent,
    GetYourClassesComponent,
    ExploreHeadingComponent,
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
    LearningEnvironmentComponent,
    LovingOpportunitiesComponent,
    ChooseCountryDialogComponent,
    LanguagesIntroducingComponent,
    LanguagesTestomonialComponent,
    HomeServicesFeaturesComponent,
    TutorTermsConditionsComponent,
    HomeStudyMoreReadMoreComponent,
    SelectProgramCategoryComponent,
    RequestNewCourseModalComponent,
    StudentTermsConditionsComponent,
    BenefitsOnlineTutoringComponent,
    ViewSubjectDetailsModalComponent,
    ExceptionalOpportunitiesComponent,
    BenefitsAcademicTutoringComponent,
    AcademicLearningEnvironmentComponent
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
    NGXCarouselModule.forRoot(),
    // EffectsModule.forFeature(Object.values(publicEffects)),
    StoreModule.forFeature(featureKeys.publicFeatureKey, fromPublic.reducers)
  ],
  providers: [ContactService]
})
export class PublicModule {}
