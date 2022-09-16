import { ITutor } from './tutor.model';

export class IInterview {
  id!: number;
  additionalComments: string;
  adminComments: string;
  createdAt: string;
  interviewDate: string;
  status: string;
  interviewTime: string;
  updatedAt: string;
  availabilityDays: any;
  tutor?: ITutor;

  constructor(createDefault = false, interview: any = null) {
    if (createDefault) {
      this.id = 0;
      this.additionalComments = '';
      this.adminComments = '';
      this.createdAt = '';
      this.interviewDate = '';
      this.status = '';
      this.interviewTime = '';
      this.updatedAt = '';
      this.availabilityDays = [];
      this.tutor = undefined;
    }

    if (interview) {
      this.id = interview.id;
      this.additionalComments = interview.addtional_comments;
      this.adminComments = interview.admin_comments;
      this.createdAt = interview.created_at;
      this.interviewDate = interview.date_for_interview;
      this.status = interview.status;
      this.interviewTime = interview.time_for_interview;
      this.availabilityDays = interview.availability_days;
      this.updatedAt = interview.updated_at;
      this.tutor = new ITutor(false, interview.user);
    }
  }
}

export interface IInterviewFilters {
  status?: string;
  title?: string;
}

export interface SubmitInterviewInput {
  notes?: string;
  interviewDate: string;
  interviewTime: string;
}
