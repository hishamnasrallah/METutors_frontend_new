import { generalConstants } from 'src/app/config';
import {
  IAvailability,
  ILanguage,
  IQualification,
  ISpecification,
  ISubject,
} from '.';

export class ITutor {
  id!: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  cover?: string;
  bio?: string;
  createdAt?: string;
  dateOfBirth?: string;
  email?: string;
  mobile?: string;
  roleName?: string;
  status?: string;
  verified?: number;
  languages?: ILanguage[];
  availability?: IAvailability[];
  qualifications?: IQualification[];
  specifications?: ISpecification[];
  subject?: ISubject[];

  rate?: number;
  badges?: any[];
  country?: string;
  courseNumber?: number;
  reviewsCount?: number;
  studentNumber?: number;
  teachingExperienceYears?: number;
  onlineTeachingExperienceYears?: number;
  expertInTheSubjectRate?: number;
  presentComplexTopicsClearlyAndEasilyRate?: number;
  skillfulInEngagingStudentsRate?: number;
  alwaysOnTimeRate?: number;
  reviews?: any[];

  constructor(createDefault = false, tutor: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.firstName = '';
      this.lastName = '';
      this.avatar = generalConstants.defaultAvatarPath;
      this.cover = generalConstants.defaultCoverPath;
      this.bio = '';
      this.createdAt = '';
      this.rate = 0;
      this.dateOfBirth = '';
      this.email = '';
      this.mobile = '';
      this.roleName = '';
      this.reviewsCount = 0;
      this.studentNumber = 0;
      this.status = '';
      this.verified = 0;
      this.languages = [];
      this.availability = [];
      this.qualifications = [];
      this.specifications = [];
      this.subject = [];
      this.badges = [];
      this.country = '';
      this.courseNumber = 0;
      this.teachingExperienceYears = 0;
      this.onlineTeachingExperienceYears = 0;
      this.expertInTheSubjectRate = 0;
      this.presentComplexTopicsClearlyAndEasilyRate = 0;
      this.skillfulInEngagingStudentsRate = 0;
      this.alwaysOnTimeRate = 0;
      this.reviews = [];
    }

    if (tutor) {
      this.id = tutor?.id;
      this.name = tutor?.first_name + ' ' + tutor?.last_name;
      this.firstName = tutor?.first_name || '';
      this.lastName = tutor?.last_name || '';
      this.avatar = tutor?.avatar || generalConstants.defaultAvatarPath;
      this.cover = tutor?.cover || generalConstants.defaultCoverPath;
      this.bio = tutor?.bio || '';
      this.createdAt = tutor?.created_at || '';
      this.dateOfBirth = tutor?.date_of_birth || '';
      this.email = tutor?.email || '';
      this.mobile = tutor?.mobile || '';
      this.roleName = tutor?.role_name || '';
      this.status = tutor?.status || '';
      this.verified = tutor?.verified || 0;
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
      this.qualifications =
        tutor?.teacher_qualifications && tutor?.teacher_qualifications?.length
          ? tutor?.teacher_qualifications.map(
              (item: any) => new IQualification(false, item)
            )
          : [];
      this.specifications =
        tutor?.teacher_specifications && tutor?.teacher_specifications?.length
          ? tutor?.teacher_specifications.map(
              (item: any) => new ISpecification(false, item)
            )
          : [];
      this.subject =
        tutor?.teacher_subject && tutor?.teacher_subject?.length
          ? tutor?.teacher_subject.map((item: any) => new ISubject(false, item))
          : [];

      this.badges = tutor?.badges || [];
      this.rate = tutor?.rate || 0;
      this.reviewsCount = tutor?.reviews_count || 0;
      this.studentNumber = tutor?.student_number || 0;
      this.country = tutor?.country || '';
      this.courseNumber = tutor?.course_number || 0;
      this.teachingExperienceYears = tutor?.teaching_experience_years || 0;
      this.onlineTeachingExperienceYears =
        tutor?.online_teaching_experience_years || 0;
      this.expertInTheSubjectRate = 4;
      this.presentComplexTopicsClearlyAndEasilyRate = 3;
      this.skillfulInEngagingStudentsRate = 2;
      this.alwaysOnTimeRate = 5;
      this.reviews = [];
    }
  }
}
