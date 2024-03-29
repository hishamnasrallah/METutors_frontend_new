import { IClass, IField, IProgram } from '.';
import { TuitionType } from 'src/app/config';
import { IPriceRange } from './price-range';
import {
  COURSE_TAGS_CONST,
  COURSE_TUITION_TYPES_CONST,
} from 'src/app/config/general';
import { ITutor } from './tutor.model';
import { IStudent } from './student.model';

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
  courseField?: IField;
  status?: string;
  courseCode?: string;
  courseName?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: string;
  totalHours?: string;
  totalClasses?: string;
  weekdays?: string;
  program?: IProgram;
  classes?: IClass[];
  tutor?: ITutor;
  student?: IStudent;
  createdAt?: string;
  cancelledBy?: string;

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
      this.status = '';
      this.courseCode = '';
      this.courseName = '';
      this.startDate = '';
      this.endDate = '';
      this.totalPrice = '';
      this.totalHours = '';
      this.totalClasses = '';
      this.weekdays = '';
      this.program = undefined;
      this.classes = [];
      this.tutor = undefined;
      this.student = undefined;
      this.createdAt = '';
      this.cancelledBy = '';
    }

    if (course) {
      this.id = course.id;
      this.picture = course.cover_pic;
      this.duration = course.duration || '';
      this.name = course.course_name || '';
      this.rate = course.rate || 0;
      this.reviewsCount = course.total_reviews_count || 0;
      this.tuitionType = course.tuition_type || 0;
      this.tuitionValue = getTuitionValue(course.tuition_type) || '';
      this.classroomNumber = course.number_of_classrooms || 0;
      this.tag = COURSE_TAGS_CONST[course.tag] || '';
      this.priceRange = course.price_range || {};
      this.description = course.course_description || '';
      this.courseField = course.course_field;
      this.status = course.status;
      this.courseCode = course.course_code;
      this.courseName = course.course_name;
      this.startDate = course.start_date;
      this.endDate = course.end_date;
      this.totalPrice = course.total_price;
      this.totalHours = course.total_hours;
      this.totalClasses = course.total_classes;
      this.weekdays = course.weekdays;
      this.program = course.program;
      this.classes = course.classes;
      this.tutor = new ITutor(false, course?.teacher);
      this.student = new IStudent(false, course?.student);
      this.createdAt = course?.created_at;
      this.cancelledBy = course?.cancelled_by;
    }
  }
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
