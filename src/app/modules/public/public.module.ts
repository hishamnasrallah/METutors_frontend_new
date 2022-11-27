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
import { PaginationModule } from 'ngx-bootstrap/pagination';
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
  TutorTermsComponent,
  BecomeTutorComponent,
  WebsiteTermsComponent,
  CookieNoticeComponent,
  StudentTermsComponent,
  PrivacyNoticeComponent,
  ExploreTutorsComponent,
  CommunityTermsComponent,
  LanguagesCoursesComponent
} from './containers';

import {
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
  TermsHeaderComponent,
  TermsSidebarComponent,
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
  ViewPricesDialogComponent,
  ContactHelpToHereComponent,
  RequestPostCourseComponent,
  BecomeOnlineTutorComponent,
  StillHaveQuestionsComponent,
  InnovativeApproachComponent,
  ContactSendMessageComponent,
  HomeFeaturedTutorsComponent,
  TrustHappyStudentsComponent,
  HomeworkProjectHelpComponent,
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
  AcademicLearningEnvironmentComponent,
  SelectProgramStudyingDialogComponent
} from './components';

import { RemoveTextPipe } from './pipes';

@NgModule({
  declarations: [
    FaqComponent,
    HomeComponent,
    StudyComponent,
    AboutComponent,
    RemoveTextPipe,
    WelcomeComponent,
    ContactComponent,
    FaqSearchComponent,
    HomeSlideComponent,
    TutorCardComponent,
    FaqTicketComponent,
    AboutSlideComponent,
    WhyWeTeachComponent,
    AllCoursesComponent,
    CourseCardComponent,
    StudySlideComponent,
    TutorTermsComponent,
    AboutValuesComponent,
    FounderTeamComponent,
    WhyMetutorsComponent,
    HomeCoursesComponent,
    BecomeTutorComponent,
    OurPartnersComponent,
    TermsHeaderComponent,
    TermsSidebarComponent,
    StudentTermsComponent,
    CookieNoticeComponent,
    WebsiteTermsComponent,
    WhyTeachingUsComponent,
    PrivacyNoticeComponent,
    ExploreTutorsComponent,
    SelectFaqTopicComponent,
    BecomeTutorsUsComponent,
    LanguagesSlideComponent,
    SuccessStoriesComponent,
    GetYourClassesComponent,
    ExploreHeadingComponent,
    CommunityTermsComponent,
    LanguageCoursesComponent,
    FactsStatisticsComponent,
    StartLearningNowComponent,
    LanguagesCoursesComponent,
    BecomeTutorSlideComponent,
    LearningMadeEasyComponent,
    FaqListQuestionsComponent,
    ViewPricesDialogComponent,
    ContactHelpToHereComponent,
    RequestPostCourseComponent,
    BecomeOnlineTutorComponent,
    ContactSendMessageComponent,
    InnovativeApproachComponent,
    StillHaveQuestionsComponent,
    HomeFeaturedTutorsComponent,
    TrustHappyStudentsComponent,
    HomeworkProjectHelpComponent,
    LearningEnvironmentComponent,
    LovingOpportunitiesComponent,
    LanguagesIntroducingComponent,
    LanguagesTestomonialComponent,
    HomeServicesFeaturesComponent,
    HomeStudyMoreReadMoreComponent,
    SelectProgramCategoryComponent,
    RequestNewCourseModalComponent,
    BenefitsOnlineTutoringComponent,
    ViewSubjectDetailsModalComponent,
    ExceptionalOpportunitiesComponent,
    BenefitsAcademicTutoringComponent,
    AcademicLearningEnvironmentComponent,
    SelectProgramStudyingDialogComponent
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
    PaginationModule.forRoot(),
    NGXCarouselModule.forRoot(),
    // EffectsModule.forFeature(Object.values(publicEffects)),
    StoreModule.forFeature(featureKeys.publicFeatureKey, fromPublic.reducers)
  ],
  providers: [ContactService]
})
export class PublicModule {}
