import { IProgram } from '.';
import { ILanguage } from './language.model';
import { ICountry } from './lookups.model';

export class ICourseRequest {
  id!: number;
  program?: IProgram;
  studentName?: string;
  grade?: number;
  email?: string;
  status: string;
  subject?: string;
  language?: ILanguage;
  gender?: string;
  country?: ICountry;
  description?: string;
  updatedAt?: string;
  programId?: number;

  constructor(createDefault = false, request: any = null) {
    if (createDefault) {
      this.id = 0;
      this.program = undefined;
      this.studentName = '';
      this.grade = 0;
      this.email = '';
      this.status = '';
      this.subject = '';
      this.gender = '';
      this.description = '';
      this.language = undefined;
      this.country = undefined;
      this.updatedAt = '';
      this.programId = 0;
    }

    if (request) {
      this.id = request.id;
      this.program = request?.program;
      this.studentName = request?.student_name;
      this.grade = request?.grade;
      this.email = request?.email;
      this.status = request?.status;
      this.subject = request?.subject;
      this.language = request?.language;
      this.country = request?.country;
      this.gender = request?.gender_preference;
      this.description = request?.course_description;
      this.updatedAt = request?.updated_at;
      this.programId = +request?.program_id || 0;
    }
  }
}
