import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '../../directives';
import { SuccessStoriesComponent } from '.';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CarouselModule,
    DirectiveModule,
    RatingModule.forRoot(),
  ],
  declarations: [SuccessStoriesComponent],
  exports: [SuccessStoriesComponent],
})
export class SuccessStoriesModule {}
