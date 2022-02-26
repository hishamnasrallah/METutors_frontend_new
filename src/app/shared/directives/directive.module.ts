import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultAvatarDirective } from './default-avatar.directive';
import { DefaultCoverDirective } from './default-cover.directive';
import { DefaultCourseDirective } from './default-course.directive';
import { TrimInputDirective } from './trim-input.directive';
import { OnlyNumberDirective } from './only-numbers.directive';

@NgModule({
  declarations: [
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
  imports: [CommonModule],
  exports: [
    TrimInputDirective,
    OnlyNumberDirective,
    DefaultCoverDirective,
    DefaultAvatarDirective,
    DefaultCourseDirective,
  ],
})
export class DirectiveModule {}
