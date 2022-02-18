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
  SuccessStoriesModule,
  LearningEnvironmentModule,
} from 'src/app/shared/components';

import { DirectiveModule } from 'src/app/shared/directives';

import { HomeComponent } from './containers';

import {
  HomeSlideComponent,
  HomeCoursesComponent,
  HomeStudyMetutorsComponent,
  HomeFeaturedTutorsComponent,
} from './components';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSlideComponent,
    HomeCoursesComponent,
    HomeStudyMetutorsComponent,
    HomeFeaturedTutorsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    CarouselModule,
    MatButtonModule,
    DirectiveModule,
    CourseItemModule,
    PublicRoutingModule,
    SuccessStoriesModule,
    RatingModule.forRoot(),
    LearningEnvironmentModule,
  ],
})
export class PublicModule {}
