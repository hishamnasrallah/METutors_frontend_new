import camelcaseKeys from 'camelcase-keys';
import { generalConstants, GRADES, InterviewStatus } from 'src/app/config';
import { environment } from 'src/environments/environment';
import {
  ISubject,
  ILanguage,
  IInterview,
  IAvailability,
  IQualification,
  ISpecification,
} from '.';

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

  badges?: any[];
  teachingExperienceYears?: number;
  onlineTeachingExperienceYears?: number;
  expertInTheSubjectRate?: number;
  presentComplexTopicsClearlyAndEasilyRate?: number;
  skillfulInEngagingStudentsRate?: number;
  alwaysOnTimeRate?: number;

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
      this.subjects = [];
      this.sortedSubjects = [];
      this.badges = [];
      this.country = '';
      this.teachingExperienceYears = 0;
      this.onlineTeachingExperienceYears = 0;
      this.expertInTheSubjectRate = 0;
      this.presentComplexTopicsClearlyAndEasilyRate = 0;
      this.skillfulInEngagingStudentsRate = 0;
      this.alwaysOnTimeRate = 0;
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
    }

    if (tutor) {
      this.id = tutor?.id;
      this.idNumber = tutor?.id_number;
      this.name = tutor?.first_name + ' ' + tutor?.last_name;
      this.firstName = tutor?.first_name || '';
      this.middleName = tutor?.middle_name || '';
      this.lastName = tutor?.last_name || '';
      this.avatar = tutor?.avatar
        ? environment.imageURL + tutor?.avatar
        : generalConstants.defaultAvatarPath;
      this.cover = tutor?.cover_img
        ? environment.imageURL + tutor?.cover_img
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
      this.qualifications = new IQualification(
        false,
        tutor?.teacher_qualifications
      );
      this.specifications = new ISpecification(
        false,
        tutor?.teacher_specifications
      );
      this.subjects =
        tutor?.teacher_subjects && tutor?.teacher_subjects?.length
          ? tutor?.teacher_subjects.map(
              (item: any) => new ISubject(false, item)
            )
          : [];
      this.sortedSubjects = sortSubjects(this.subjects);
      this.country = tutor?.country || '';
      this.city = tutor?.city || '';
      this.gender = tutor?.gender || '';
      this.nationality = tutor?.nationality || '';
      this.approvedTutor = checkApprovedTutor(tutor?.teacher_interview_request);
      this.interviewRequest = tutor?.teacher_interview_request
        ? new IInterview(false, tutor?.teacher_interview_request)
        : undefined;
      this.totalFeedbacks = tutor?.total_feedbacks;
      this.averageRating = tutor?.average_rating;
      this.studentsTeaching = tutor?.students_teaching;
      this.coursesCreated = tutor?.courses_created;
      this.expertRating = tutor?.expert_rating;
      this.complexityRating = tutor?.complexity_rating;
      this.skillfullRating = tutor?.skillfull_rating;
      this.onTimeRating = tutor?.onTime_rating;
      this.feedbacks =
        tutor?.feedbacks && tutor?.feedbacks.length
          ? camelcaseKeys(tutor?.feedbacks, { deep: true })
          : [];

      this.badges = tutor?.badges || [];
      this.teachingExperienceYears = tutor?.teaching_experience_years || 0;
      this.onlineTeachingExperienceYears =
        tutor?.online_teaching_experience_years || 0;
      this.expertInTheSubjectRate = 4;
      this.presentComplexTopicsClearlyAndEasilyRate = 3;
      this.skillfulInEngagingStudentsRate = 2;
      this.alwaysOnTimeRate = 5;
    }
  }
}

export interface ITutorFilters {
  name: string;
}

export function sortSubjects(subjects?: ISubject[]): any[] {
  const output: any[] = [];

  subjects?.forEach((item: any) => {
    const existing = output.filter((v, i) => v.fieldId == item.fieldId);

    if (existing.length) {
      const existingIndex = output.indexOf(existing[0]);

      output[existingIndex].subjects = [
        ...output[existingIndex].subjects,
        { ...item },
      ];
    } else {
      output.push({
        fieldId: item.fieldId,
        fieldName: item?.field?.name,
        programName: item?.program?.name,
        programId: item?.program?.id,
        countryName: item?.country?.name,
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

  if (
    request &&
    request.status &&
    (request.status === InterviewStatus.rejected ||
      request.status === InterviewStatus.pending ||
      request.status === InterviewStatus.scheduled)
  ) {
    return false;
  }

  return true;
}
