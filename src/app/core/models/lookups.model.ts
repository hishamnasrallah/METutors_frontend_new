import { ICourseField, ICourseLevel, IFAQTopics, ILanguage, ISubject } from '.';

export interface ILookups {
  ticketTypes: any;
  courseList: any;
  courseField: ICourseField[];
  courseFieldSubject: any;
  courseLevel: ICourseLevel[];
  courseSubjects: ISubject[];
  coursePrograms: IProgram[];
  topics: IFAQTopics[];
  languages: ILanguage[];
}

export interface IProgram {
  id: number;
  name: string;
}

export interface ICountry {
  id: number;
  name: string;
}
