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
  status: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface ICountry {
  id: number;
  name: string;
  flag: string;
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
  code: string;
  icon: string;
  grade: number;
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
