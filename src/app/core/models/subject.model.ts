import { ICourse } from './course.model';
import { ICountry, IField, IProgram } from './lookups.model';

export class ISubject {
  id!: number;
  name!: string;
  description?: string;
  subject?: string;
  programId?: number;
  program?: IProgram;
  countryId?: number;
  country?: ICountry;
  field?: IField;
  grade?: number;
  status?: number;
  fieldId?: number;
  fieldName?: string;
  pricePerHour?: number;
  courses?: ICourse[];
  availableTutorsCount?: number;

  constructor(createDefault = false, subject: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.description = '';
      this.subject = '';
      this.fieldId = 0;
      this.programId = 0;
      this.countryId = 0;
      this.program = undefined;
      this.country = undefined;
      this.field = undefined;
      this.grade = 0;
      this.status = 0;
      this.fieldName = '';
      this.pricePerHour = 0;
      this.courses = [];
      this.availableTutorsCount = 0;
    }

    if (subject) {
      this.id = subject?.id;
      this.name = subject?.name || subject?.field?.name || '';
      this.description = subject?.description;
      this.subject = subject?.subject?.name || '';
      this.fieldId = subject?.field_id || subject?.field?.id || 0;
      this.programId = subject?.program_id || 0;
      this.program = subject?.program;
      this.countryId = subject?.country_id || 0;
      this.fieldName = subject?.field_name || subject?.field?.name || '';
      this.field = subject?.field;
      this.country = subject?.subject?.country || subject?.country;
      this.grade = subject?.grade || 0;
      this.status = subject?.status || 0;
      this.availableTutorsCount = subject?.available_teachers_count || 0;
      this.pricePerHour = subject?.price_per_hour || subject?.hourly_price || 0;
      this.courses =
        subject.courses && subject.courses.length
          ? subject.courses.map((course: any) => new ICourse(false, course))
          : [];
    }
  }
}

export interface ISubjectFilters {
  title?: string;
  grade?: string;
  status?: string;
  field?: number;
  program?: number;
  country?: number;
}
