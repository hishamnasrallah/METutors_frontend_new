import { HttpEventType } from '@angular/common/http';
import {
  FieldStatus,
  TutorStatus,
  TicketStatus,
  CountryStatus,
  ProgramStatus,
  StudentStatus,
  SubjectStatus,
  CourseRequestStatus,
} from './enums';

export const generalConstants = {
  nationalId: 3,
  tutorTopicId: 2,
  studentTopicId: 1,
  uploadComplete: HttpEventType.Response,
  defaultCoverPath: 'assets/defaults/cover.png',
  defaultAvatarPath: 'assets/defaults/avatar.png',
  defaultCoursePath: 'assets/defaults/course.jpg',
  startingHoursLimit: 24,
  classroomTimeDuration: {
    min: 0.5,
    max: 3,
  },
  regex: {
    url: '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$',
  },
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
  TutorStatus.suspended,
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
    displayTime: '12:00 - 12:30 PM',
  },
  {
    startTime: '12:30 pm',
    endTime: '01:00 pm',
    displayTime: '12:30 - 01:00 PM',
  },
  {
    startTime: '01:00 pm',
    endTime: '01:30 pm',
    displayTime: '01:00 - 01:30 PM',
  },
  {
    startTime: '01:30 pm',
    endTime: '02:00 pm',
    displayTime: '01:30 - 02:00 PM',
  },
  {
    startTime: '02:00 pm',
    endTime: '02:30 pm',
    displayTime: '02:00 - 02:30 PM',
  },
  {
    startTime: '02:30 pm',
    endTime: '03:00 pm',
    displayTime: '02:30 - 03:00 PM',
  },
  {
    startTime: '03:00 pm',
    endTime: '03:30 pm',
    displayTime: '03:00 - 03:30 PM',
  },
  {
    startTime: '03:30 pm',
    endTime: '04:00 pm',
    displayTime: '03:30 - 04:00 PM',
  },
  {
    startTime: '04:00 pm',
    endTime: '04:30 pm',
    displayTime: '04:00 - 04:30 PM',
  },
  {
    startTime: '04:30 pm',
    endTime: '05:00 pm',
    displayTime: '04:30 - 05:00 PM',
  },
  {
    startTime: '05:00 pm',
    endTime: '05:30 pm',
    displayTime: '05:00 - 05:30 PM',
  },
  {
    startTime: '05:30 pm',
    endTime: '06:00 pm',
    displayTime: '05:30 - 06:00 PM',
  },
  {
    startTime: '06:00 pm',
    endTime: '06:30 pm',
    displayTime: '06:00 - 06:30 PM',
  },
  {
    startTime: '06:30 pm',
    endTime: '07:00 pm',
    displayTime: '06:30 - 07:00 PM',
  },
  {
    startTime: '07:00 pm',
    endTime: '07:30 pm',
    displayTime: '07:00 - 07:30 PM',
  },
  {
    startTime: '07:30 pm',
    endTime: '08:00 pm',
    displayTime: '07:30 - 08:00 PM',
  },
  {
    startTime: '08:00 pm',
    endTime: '08:30 pm',
    displayTime: '08:00 - 08:30 PM',
  },
  {
    startTime: '08:30 pm',
    endTime: '09:00 pm',
    displayTime: '08:30 - 09:00 PM',
  },
  {
    startTime: '09:00 pm',
    endTime: '09:30 pm',
    displayTime: '09:00 - 09:30 PM',
  },
  {
    startTime: '09:30 pm',
    endTime: '10:00 pm',
    displayTime: '09:30 - 10:00 PM',
  },
  {
    startTime: '10:00 pm',
    endTime: '10:30 pm',
    displayTime: '10:00 - 10:30 PM',
  },
  {
    startTime: '10:30 pm',
    endTime: '11:00 pm',
    displayTime: '10:30 - 11:00 PM',
  },
  {
    startTime: '11:00 pm',
    endTime: '11:30 pm',
    displayTime: '11:00 - 11:30 PM',
  },
  {
    startTime: '11:30 pm',
    endTime: '12:00 am',
    displayTime: '11:30 PM - 12:00 AM',
  },
  {
    startTime: '12:00 am',
    endTime: '12:30 am',
    displayTime: '12:00 - 12:30 AM',
  },
  {
    startTime: '12:30 am',
    endTime: '01:00 am',
    displayTime: '12:30 - 01:00 AM',
  },
  {
    startTime: '01:00 am',
    endTime: '01:30 am',
    displayTime: '01:00 - 01:30 AM',
  },
  {
    startTime: '01:30 am',
    endTime: '02:00 am',
    displayTime: '01:30 - 02:00 AM',
  },
  {
    startTime: '02:00 am',
    endTime: '02:30 am',
    displayTime: '12:00 - 02:30 AM',
  },
  {
    startTime: '02:30 am',
    endTime: '03:00 am',
    displayTime: '02:30 - 03:00 AM',
  },
  {
    startTime: '03:00 am',
    endTime: '03:30 am',
    displayTime: '03:00 - 03:30 AM',
  },
  {
    startTime: '03:30 am',
    endTime: '04:00 am',
    displayTime: '03:30 - 04:00 AM',
  },
  {
    startTime: '04:00 am',
    endTime: '04:30 am',
    displayTime: '04:00 - 04:30 AM',
  },
  {
    startTime: '04:30 am',
    endTime: '05:00 am',
    displayTime: '04:30 - 05:00 AM',
  },
  {
    startTime: '05:00 am',
    endTime: '05:30 am',
    displayTime: '05:00 - 05:30 AM',
  },
  {
    startTime: '05:30 am',
    endTime: '06:00 am',
    displayTime: '05:30 - 06:00 AM',
  },
  {
    startTime: '06:00 am',
    endTime: '06:30 am',
    displayTime: '06:00 - 06:30 AM',
  },
  {
    startTime: '06:30 am',
    endTime: '07:00 am',
    displayTime: '06:30 - 07:00 AM',
  },
  {
    startTime: '07:00 am',
    endTime: '07:30 am',
    displayTime: '07:00 - 07:30 AM',
  },
  {
    startTime: '07:30 am',
    endTime: '08:00 am',
    displayTime: '07:30 - 08:00 AM',
  },
  {
    startTime: '08:00 am',
    endTime: '08:30 am',
    displayTime: '08:00 - 08:30 AM',
  },
  {
    startTime: '08:30 am',
    endTime: '09:00 am',
    displayTime: '08:30 - 09:00 AM',
  },
  {
    startTime: '09:00 am',
    endTime: '09:30 am',
    displayTime: '09:00 - 09:30 AM',
  },
  {
    startTime: '09:30 am',
    endTime: '10:00 am',
    displayTime: '09:30 - 10:00 AM',
  },
  {
    startTime: '10:00 am',
    endTime: '10:30 am',
    displayTime: '10:00 - 10:30 AM',
  },
  {
    startTime: '10:30 am',
    endTime: '11:00 am',
    displayTime: '10:30 - 11:00 AM',
  },
  {
    startTime: '11:00 am',
    endTime: '11:30 am',
    displayTime: '11:00 - 11:30 AM',
  },
  {
    startTime: '11:30 am',
    endTime: '12:00 pm',
    displayTime: '11:30 AM - 12:00 PM',
  },
];

export const CLASSROOM_TOPICS_SCALE_NUM = {
  1: 'Unconfident',
  2: 'Confident',
  3: 'Very Confident',
};

export const CLASSROOM_TOPICS_SCALE_STRING = {
  Unconfident: 1,
  Confident: 2,
  'Very Confident': 3,
};

export const LANGUAGES_LEVELS_CONST = {
  beginner: 'Beginner',
  elementary: 'Elementary',
  intermediate: 'Intermediate',
  upperIntermediate: 'Upper Intermediate',
  advanced: 'Advanced',
  proficient: 'Proficient',
  native: 'Native',
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
    short: 'Payment',
    long: 'Payment Pending',
  },
  cancelled_by_teacher: {
    short: 'On Hold',
    long: 'On Hold (Action Required By Student)',
  },
  cancelled_by_student: {
    short: 'Cancelled',
    long: 'Cancelled & Refunded',
  },
  requested_to_metutors: {
    short: 'Re-Assigned',
    long: 'Tutor Re-Assignment by MEtutors',
  },
  declined_by_teacher: {
    short: 'Declined',
    long: 'Declined by Tutor',
  },
};

export const testimonialStatus = ['public', 'private'];
