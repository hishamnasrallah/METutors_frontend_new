import { HttpEventType } from '@angular/common/http';
import {
  CountryStatus,
  CourseRequestStatus,
  FieldStatus,
  ProgramStatus,
  StudentStatus,
  SubjectStatus,
  TicketStatus,
  TutorStatus,
} from './enums';

export const generalConstants = {
  nationalId: 3,
  tutorTopicId: 2,
  studentTopicId: 1,
  uploadComplete: HttpEventType.Response,
  defaultCoverPath: 'assets/defaults/cover.png',
  defaultAvatarPath: 'assets/defaults/avatar.png',
  defaultCoursePath: 'assets/defaults/course.jpg',
  classroomTimeDuration: {
    min: 0.5,
    max: 3,
  },
  subjectsIcons: [
    'assets/svg/engineering.svg',
    'assets/svg/science.svg',
    'assets/svg/humanities.svg',
    'assets/svg/math.svg',
  ],
};

export const TICKET_STATUSES_CONST: any = [
  TicketStatus.open,
  TicketStatus.closed,
  TicketStatus.inprogress,
];

export const TUTOR_STATUSES_CONST: any = [
  TutorStatus.active,
  TutorStatus.deactive,
  TutorStatus.pending,
];

export const COURSE_REQUEST_STATUSES_CONST: any = [
  CourseRequestStatus.offered,
  CourseRequestStatus.notOffered,
];

export const STUDENT_STATUSES_CONST: any = [
  StudentStatus.active,
  StudentStatus.enrolled,
  StudentStatus.suspended,
];

export const PROGRAM_STATUSES_CONST: any = [
  {
    id: ProgramStatus.active,
    name: 'Active',
  },
  {
    id: ProgramStatus.inActive,
    name: 'Inactive',
  },
];

export const FIELD_STATUSES_CONST: any = [
  {
    id: FieldStatus.active,
    name: 'Active',
  },
  {
    id: FieldStatus.inActive,
    name: 'Inactive',
  },
];

export const SUBJECT_STATUSES_CONST: any = [
  {
    id: SubjectStatus.active,
    name: 'Active',
  },
  {
    id: SubjectStatus.inActive,
    name: 'Inactive',
  },
];

export const COUNTRY_STATUSES_CONST: any = [
  {
    id: CountryStatus.active,
    name: 'Active',
  },
  {
    id: CountryStatus.inActive,
    name: 'Inactive',
  },
];

export const AVAILABILITY_HOURS_CONST = [
  {
    startTime: '12:00 pm',
    endTime: '12:30 pm',
  },
  {
    startTime: '12:30 pm',
    endTime: '01:00 pm',
  },
  {
    startTime: '01:00 pm',
    endTime: '01:30 pm',
  },
  {
    startTime: '01:30 pm',
    endTime: '02:00 pm',
  },
  {
    startTime: '02:00 pm',
    endTime: '02:30 pm',
  },
  {
    startTime: '02:30 pm',
    endTime: '03:00 pm',
  },
  {
    startTime: '03:00 pm',
    endTime: '03:30 pm',
  },
  {
    startTime: '03:30 pm',
    endTime: '04:00 pm',
  },
  {
    startTime: '04:00 pm',
    endTime: '04:30 pm',
  },
  {
    startTime: '04:30 pm',
    endTime: '05:00 pm',
  },
  {
    startTime: '05:00 pm',
    endTime: '05:30 pm',
  },
  {
    startTime: '05:30 pm',
    endTime: '06:00 pm',
  },
  {
    startTime: '06:00 pm',
    endTime: '06:30 pm',
  },
  {
    startTime: '06:30 pm',
    endTime: '07:00 pm',
  },
];

export const LANGUAGES_LEVELS_CONST = {
  beginner: 'Beginner',
  elementary: 'Elementary',
  intermediate: 'Intermediate',
  upperIntermediate: 'Upper Intermediate',
  advanced: 'Advanced',
  proficient: 'Proficient',
};

export const COURSE_TAGS_CONST: any = {
  new: 'New',
  pop: 'Popular',
  top: 'Top Rated',
};

export const COURSE_TUITION_TYPES_CONST = {
  one: 'One-on-One',
  group: 'Group Study',
  both: 'Both',
};

export const TEXTBOOK_EDITION_CONST: any = {
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: '4th',
  5: '5th',
  6: '6th',
  7: '7th',
  8: '8th',
  9: '9th',
  10: '10th',
  11: '11th',
  12: '12th',
  13: '13th',
  14: '14th',
  15: '15th',
  16: '16th',
  17: '17th',
  18: '18th',
  19: '19th',
  20: '20th',
};

export const CLASSROOM_TYPES_CONST: any = {
  '01': COURSE_TUITION_TYPES_CONST.one,
  '02': COURSE_TUITION_TYPES_CONST.group,
};

export const COURSE_FILTER_TAGS_CONST = {
  top: 'Top Rated',
  new: 'New course',
  pop: 'Popular course',
};

export const COURSE_FILTER_START_CONST = {
  today: 'Today',
  week: 'This week',
  month: 'This month',
};

export const COURSE_FILTER_TYPE_CONST = {
  '01': 'Student groups',
  '02': 'One to one sessions',
  '03': 'Both',
};

export const WEEK_DAYS: any = {
  1: 'Sun',
  2: 'Mon',
  3: 'Tues',
  4: 'Wed',
  5: 'Thu',
  6: 'Fri',
  7: 'Sat',
};

export const WEEK_FULL_DAYS: any = {
  1: 'Sunday',
  2: 'Monday',
  3: 'Tuesday',
  4: 'Wednesday',
  5: 'Thursday',
  6: 'Friday',
  7: 'Saturday',
};

export const WEEK_DAYS_LONG: any = {
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
  Saturday: 7,
};

export const courseStatusLabel = {
  active: {
    short: 'Active',
    long: 'Active',
  },
  refunded: {
    short: 'Refunded',
    long: 'Refunded',
  },
  rejected: {
    short: 'Rejected',
    long: 'Rejected',
  },
  canceled: {
    short: 'Canceled',
    long: 'Canceled',
  },
  inprogress: {
    short: 'Running',
    long: 'Running',
  },
  requested: {
    short: 'Requested',
    long: 'Requested',
  },
  completed: {
    short: 'Completed',
    long: 'Completed',
  },
  pending: {
    short: 'Pending',
    long: 'Pending Tutor Approval',
  },
  payment_pending: {
    short: 'Payment Pending',
    long: 'Payment Pending',
  },
  cancelled_by_teacher: {
    short: 'On Hold',
    long: 'On Hold (Tutor Re-Assignment by MeTutors)',
  },
  cancelled_by_student: {
    short: 'Cancelled',
    long: 'Cancelled & Refunded',
  },
  requested_to_metutors: {
    short: 'Re-Assigned',
    long: 'Tutor Re-Assignment by MEtutors',
  },
};

export const testimonialStatus = ['public', 'private'];
