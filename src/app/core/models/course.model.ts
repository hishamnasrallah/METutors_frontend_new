import { TuitionType } from 'src/app/config';
import {
  COURSE_TAGS_CONST,
  COURSE_TUITION_TYPES_CONST,
} from 'src/app/config/general';
import { IPriceRange } from './price-range';

export class ICourse {
  id!: number;
  picture?: string;
  name?: string;
  duration?: number | string;
  rate?: number;
  reviewsCount?: number;
  tuitionType?: number;
  tuitionValue?: string;
  classroomNumber?: number;
  tag?: string;
  priceRange?: IPriceRange;
  description?: string;
  courseField?: ICourseField;

  constructor(createDefault = false, course: any = null) {
    if (createDefault) {
      this.id = 0;
      this.picture = '';
      this.duration = '';
      this.name = '';
      this.rate = 0;
      this.reviewsCount = 0;
      this.tuitionType = 0;
      this.tuitionValue = '';
      this.classroomNumber = 0;
      this.tag = '';
      this.priceRange = undefined;
      this.description = '';
      this.courseField = undefined;
    }

    if (course) {
      this.id = course.id;
      this.picture = course.cover_pic;
      this.duration = course.duration || '';
      this.name = course.name || '';
      this.rate = course.rate || 0;
      this.reviewsCount = course.total_reviews_count || 0;
      this.tuitionType = course.tuition_type || 0;
      this.tuitionValue = getTuitionValue(course.tuition_type) || '';
      this.classroomNumber = course.number_of_classrooms || 0;
      this.tag = COURSE_TAGS_CONST[course.tag] || '';
      this.priceRange = course.price_range || {};
      this.description = course.course_description || '';
      this.courseField = course.course_field;
    }
  }
}

export interface ICourseLevel {
  id: number;
  name: string;
}

export interface ICourseField {
  id: number;
  name: string;
  code: string;
  icon: string;
  programId: number;
}

export function getTuitionValue(type: number): string {
  switch (type) {
    case TuitionType.one:
      return COURSE_TUITION_TYPES_CONST.one;
    case TuitionType.group:
      return COURSE_TUITION_TYPES_CONST.group;
    case TuitionType.both:
      return COURSE_TUITION_TYPES_CONST.both;
    default:
      return '';
  }
}
