import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultAvatarDirective } from './default-avatar.directive';
import { DefaultCoverDirective } from './default-cover.directive';
import { DefaultCourseDirective } from './default-course.directive';
import { TrimInputDirective } from './trim-input.directive';

@NgModule({
  declarations: [
    TrimInputDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
  imports: [CommonModule],
  exports: [
    TrimInputDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
})
export class DirectiveModule {}
