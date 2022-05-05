import { ICountry, IField, IProgram } from './lookups.model';

export class ISubject {
  id!: number;
  name!: string;
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

  constructor(createDefault = false, subject: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
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
    }

    if (subject) {
      this.id = subject?.id;
      this.name = subject?.name || subject?.field?.name || '';
      this.subject = subject?.subject?.name || '';
      this.fieldId = subject?.field_id || 0;
      this.programId = subject?.program_id || 0;
      this.program = subject?.program;
      this.countryId = subject?.country_id || 0;
      this.fieldName = subject?.field_name;
      this.field = subject?.field;
      this.country = subject?.country;
      this.grade = subject?.grade || 0;
      this.status = subject?.status || 0;
      this.pricePerHour = subject?.price_per_hour || subject?.hourly_price || 0;
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
