import { IFAQTopics, ILanguage, ISubject } from '.';

export interface ILookups {
  ticketTypes: any;
  courseList: any;
  fields: IField[];
  courseField: IField[];
  topics: IFAQTopics[];
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
export interface ILevel {
  id: number;
  name: string;
}

export interface IField {
  id: number;
  name: string;
  code: string;
  icon: string;
  programId: number;
}
