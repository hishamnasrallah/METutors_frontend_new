import { IFAQTopics, ILanguage, ISubject } from '.';

export interface ILookups {
  ticketTypes: any;
  courseList: any;
  fields: IField[];
  courseField: IField[];
  topics: IFAQTopics[];
}

export interface IProgram {
  id: number;
  name: string;
  code: string;
  title: string;
  image: string;
  nameAr: string;
  nameEn: string;
  status: number;
  titleAr: string;
  titleEn: string;
  isoCode: string;
  createdAt: string;
  updatedAt: string;
  programCode: string;
  description: string;
  descriptionAr: string;
  descriptionEn: string;
}

export interface ICountry {
  id: number;
  name: string;
  flag: string;
  iso2?: string;
  status?: number;
  updatedAt?: string;
}

export interface ICity {
  id: number;
  name: string;
}
export interface ILevel {
  id: number;
  name: string;
}

export interface IField {
  id: number;
  name: string;
  nameAr: string;
  nameEn: string;
  code: string;
  icon: string;
  grade: number;
  image: string;
  countryId: number;
  programId: number;
  status: number;
  program: IProgram;
  country: ICountry;
}

export interface ITicketCategory {
  id: number;
  name: string;
}

export interface ITicketPriority {
  id: number;
  name: string;
}

export interface IDocument {
  id: number;
  url: string;
  size: string;
  status: string;
  document: string;
  originalName: string;
}

export interface IProgramFilters {
  title?: string;
  status?: string;
}

export interface IFieldFilters {
  title?: string;
  grade?: string;
  status?: string;
  program?: number;
  country?: number;
}

export interface ICountryFilters {
  title?: string;
  status?: string;
}

export interface IExploreTutorsFilters {
  search?: string;
  field?: number;
  program?: number;
  country_id?: number;
  page?: number;
  field_ids?: string;
}

export interface IExploreCoursesFilters {
  search?: string;
  field?: number;
  program?: number;
  country_id?: number;
  page?: number;
  field_ids?: string;
}
