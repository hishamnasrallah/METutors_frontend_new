import camelcaseKeys from 'camelcase-keys';
import { generalConstants, GRADES, InterviewStatus } from 'src/app/config';

import {
  IProgram,
  ISubject,
  IDocument,
  ILanguage,
  IInterview,
  IAvailability,
  IQualification,
  ISpecification,
} from '.';

import { ITutorFeedback } from './tutor-feedback.model';

export class ITutor {
  id!: number;
  name?: string;
  idNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  createdAt?: string;
  dateOfBirth?: string;
  address?: string;
  address2?: string;
  email?: string;
  mobile?: string;
  roleName?: string;
  status?: string;
  verified?: number;
  languages?: ILanguage[];
  availability?: IAvailability[];
  qualifications?: IQualification;
  specifications?: ISpecification;
  teacherAvailability?: any[];
  subjects?: ISubject[];
  sortedSubjects?: any[];
  country?: any;
  city?: string;
  gender?: string;
  nationality?: string;
  postalCode?: string;
  approvedTutor?: boolean;
  adminApproval?: string;
  interviewRequest?: IInterview;
  totalFeedbacks?: number;
  averageRating?: number;
  studentsTeaching?: number;
  coursesCreated?: number;
  expertRating?: number;
  complexityRating?: number;
  skillfullRating?: number;
  onTimeRating?: number;
  feedbacks?: any[];
  feedbackRating?: any;
  badges?: any[];
  bookings?: number;
  amount?: number;
  programs?: IProgram[];
  classes: any;
  preferences: any;
  completedStep: number;
  availabilityDays: any;
  userResume: IDocument[];
  userDegrees: IDocument[];
  userCertificates: IDocument[];

  constructor(createDefault = false, tutor: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.idNumber = '';
      this.firstName = '';
      this.middleName = '';
      this.lastName = '';
      this.avatar = generalConstants.defaultAvatarPath;
      this.cover = generalConstants.defaultCoverPath;
      this.bio = '';
      this.adminApproval = '';
      this.createdAt = '';
      this.dateOfBirth = '';
      this.address = '';
      this.address2 = '';
      this.email = '';
      this.mobile = '';
      this.roleName = '';
      this.status = '';
      this.verified = 0;
      this.languages = [];
      this.availability = [];
      this.gender = '';
      this.city = '';
      this.nationality = '';
      this.qualifications = undefined;
      this.specifications = undefined;
      this.teacherAvailability = [];
      this.subjects = [];
      this.sortedSubjects = [];
      this.country = '';
      this.feedbacks = [];
      this.postalCode = '';
      this.approvedTutor = false;
      this.interviewRequest = undefined;
      this.totalFeedbacks = 0;
      this.averageRating = 0;
      this.studentsTeaching = 0;
      this.coursesCreated = 0;
      this.expertRating = 0;
      this.complexityRating = 0;
      this.skillfullRating = 0;
      this.onTimeRating = 0;
      this.feedbackRating = undefined;
      this.badges = [];
      this.bookings = 0;
      this.amount = 0;
      this.programs = [];
      this.classes = {};
      this.preferences = {};
      this.completedStep = 0;
      this.userResume = [];
      this.userDegrees = [];
      this.userCertificates = [];
      this.availabilityDays = [];
    }

    if (tutor) {
      this.id = tutor?.id;
      this.idNumber = tutor?.id_number;
      this.name = tutor?.first_name + ' ' + tutor?.last_name;
      this.firstName = tutor?.first_name || '';
      this.middleName = tutor?.middle_name || '';
      this.lastName = tutor?.last_name || '';
      this.avatar = tutor?.avatar
        ? tutor?.avatar
        : generalConstants.defaultAvatarPath;
      this.cover = tutor?.cover_img
        ? tutor?.cover_img
        : generalConstants.defaultCoverPath;
      this.bio = tutor?.bio || '';
      this.adminApproval = tutor?.admin_approval;
      this.createdAt = tutor?.created_at || '';
      this.dateOfBirth = tutor?.date_of_birth || '';
      this.address = tutor?.address;
      this.address2 = tutor?.address2;
      this.email = tutor?.email || '';
      this.mobile = tutor?.mobile || '';
      this.roleName = tutor?.role_name || '';
      this.status = tutor?.status || '';
      this.verified = tutor?.verified || 0;
      this.postalCode = tutor?.postal_code || '';
      this.preferences = tutor?.preferences || {};
      this.languages =
        tutor?.spoken_languages && tutor?.spoken_languages?.length
          ? tutor?.spoken_languages.map(
              (item: any) => new ILanguage(false, item)
            )
          : [];
      this.availability =
        tutor?.teacher_availability && tutor?.teacher_availability?.length
          ? tutor?.teacher_availability.map(
              (item: any) => new IAvailability(false, item)
            )
          : [];
      this.qualifications = tutor?.teacher_qualifications
        ? new IQualification(false, tutor?.teacher_qualifications)
        : tutor?.teacher_qualification
        ? new IQualification(false, tutor?.teacher_qualification)
        : undefined;
      this.specifications = new ISpecification(
        false,
        tutor?.teacher_specifications
      );
      this.subjects =
        tutor?.teacher_subjects && tutor?.teacher_subjects?.length
          ? tutor?.teacher_subjects.map(
              (item: any) => new ISubject(false, item)
            )
          : tutor?.subjects && tutor?.subjects?.length
          ? tutor?.subjects.map((item: any) => new ISubject(false, item))
          : [];
      this.sortedSubjects = sortSubjects(this.subjects);
      this.country = tutor?.country || '';
      this.teacherAvailability = tutor?.teacher_availability || [];
      this.city = tutor?.city || '';
      this.gender = tutor?.gender || '';
      this.nationality = tutor?.nationality || '';
      this.approvedTutor = checkApprovedTutor(tutor?.teacher_interview_request);
      this.interviewRequest = tutor?.teacher_interview_request
        ? new IInterview(false, tutor?.teacher_interview_request)
        : undefined;
      this.totalFeedbacks =
        tutor?.teacher_feedbacks_count || tutor?.reviews_count;
      this.averageRating = tutor?.average_rating;
      this.studentsTeaching =
        tutor?.teacher_students_count || tutor?.classes_taught || tutor?.students_taught;
      this.coursesCreated = tutor?.teacher_course_count;
      this.expertRating = tutor?.expert_rating;
      this.complexityRating = tutor?.complexity_rating;
      this.skillfullRating = tutor?.skillfull_rating;
      this.onTimeRating = tutor?.onTime_rating;
      this.feedbacks =
        tutor?.teacher_feedbacks && tutor?.teacher_feedbacks.length
          ? filterTeacherFeedbacks(tutor?.teacher_feedbacks)
          : [];
      this.feedbackRating = tutor?.feedback_rating;
      this.badges = tutor?.badges || [];
      this.bookings = tutor?.bookings;
      this.amount = tutor?.amount;
      this.programs = tutor?.programs || [];
      this.availabilityDays = tutor?.availability_days || [];
      this.classes = camelcaseKeys(tutor?.scheduled_classes, {
        deep: true,
      });
      this.completedStep = tutor?.profile_completed_step || 0;
      this.userResume = camelcaseKeys(tutor?.user_resume, {
        deep: true,
      });
      this.userDegrees = camelcaseKeys(tutor?.user_degrees, {
        deep: true,
      });
      this.userCertificates = camelcaseKeys(tutor?.user_certificates, {
        deep: true,
      });
    }
  }
}

export interface ITutorFilters {
  name: string;
  status?: string;
}

export function sortSubjects(subjects?: ISubject[]): any[] {
  const output: any[] = [];

  subjects?.forEach((item: any) => {
    const existing = output.filter((v, i) => v.fieldId == item.fieldId);

    if (existing.length) {
      const existingIndex = output.indexOf(existing[0]);

      output[existingIndex].subjects = [
        ...output[existingIndex].subjects,
        { ...item, gradeName: GRADES[item.grade - 1] },
      ];
    } else {
      output.push({
        fieldId: item.fieldId,
        fieldName: item?.field?.name,
        programName: item?.program?.name,
        programId: item?.program?.id,
        countryName: item?.country?.name,
        countryFlag: item?.country?.flag,
        programCode: item?.program?.code,
        subjects: [
          {
            ...item,
            gradeName: GRADES[item.grade - 1],
          },
        ],
      });
    }
  });

  return output;
}

export function checkApprovedTutor(request: any): boolean {
  if (!request) {
    return false;
  }

  return !(
    request &&
    request.status &&
    (request.status === InterviewStatus.rejected ||
      request.status === InterviewStatus.pending ||
      request.status === InterviewStatus.scheduled)
  );
}

export function filterTeacherFeedbacks(feedbacks: any): ITutorFeedback[] {
  const list = feedbacks.map((item: any) => new ITutorFeedback(false, item));
  const output: ITutorFeedback[] = [];

  list.forEach((feedback: any) => {
    const existing = output.filter(
      (item: any) =>
        item.courseId === feedback.courseId &&
        item.studentId === feedback.studentId
    );

    if (!existing.length) {
      output.push(feedback);
    }
  });

  return output;
}
