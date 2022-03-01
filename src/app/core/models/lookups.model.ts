import { ICourseField, ICourseLevel, IFAQTopics, ILanguage, ISubject } from '.';

export interface ILookups {
  ticketTypes: any;
  courseList: any;
  fields: ICourseField[];
  courseField: ICourseField[];
  courseLevel: ICourseLevel[];
  courseSubjects: ISubject[];
  coursePrograms: IProgram[];
  topics: IFAQTopics[];
  languages: ILanguage[];
  countries: ICountry[];
  cities: ICity[];
}

export interface IProgram {
  id: number;
  name: string;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
}
