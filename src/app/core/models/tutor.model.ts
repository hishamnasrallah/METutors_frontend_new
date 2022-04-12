import { generalConstants, GRADES } from 'src/app/config';
import { environment } from 'src/environments/environment';
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
  country?: string;
  city?: string;
  gender?: string;
  nationality?: string;
  postalCode?: string;
  nameOfUniversity?: string;
  computerSkills?: string;
  degreeLevel?: string;
  teachingExperience?: string;
  degreeField?: string;
  teachingExperienceOnline?: string;
  currentEmployer?: string;
  currentTitle?: string;

  rate?: number;
  badges?: any[];
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
      this.middleName = '';
      this.lastName = '';
      this.avatar = generalConstants.defaultAvatarPath;
      this.cover = generalConstants.defaultCoverPath;
      this.bio = '';
      this.createdAt = '';
      this.rate = 0;
      this.dateOfBirth = '';
      this.address = '';
      this.address2 = '';
      this.email = '';
      this.mobile = '';
      this.roleName = '';
      this.reviewsCount = 0;
      this.studentNumber = 0;
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
      this.courseNumber = 0;
      this.teachingExperienceYears = 0;
      this.onlineTeachingExperienceYears = 0;
      this.expertInTheSubjectRate = 0;
      this.presentComplexTopicsClearlyAndEasilyRate = 0;
      this.skillfulInEngagingStudentsRate = 0;
      this.alwaysOnTimeRate = 0;
      this.reviews = [];
      this.postalCode = '';
      this.nameOfUniversity = '';
      this.computerSkills = '';
      this.degreeLevel = '';
      this.teachingExperience = '';
      this.degreeField = '';
      this.teachingExperienceOnline = '';
      this.currentEmployer = '';
      this.currentTitle = '';
    }

    if (tutor) {
      this.id = tutor?.id;
      this.name = tutor?.first_name + ' ' + tutor?.last_name;
      this.firstName = tutor?.first_name || '';
      this.middleName = tutor?.middle_name || '';
      this.lastName = tutor?.last_name || '';
      this.avatar =
        environment.imageURL + tutor?.avatar ||
        generalConstants.defaultAvatarPath;
      this.cover = tutor?.cover
        ? environment.imageURL + tutor?.cover
        : generalConstants.defaultCoverPath;
      this.bio = tutor?.bio || '';
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
      this.nameOfUniversity = tutor?.name_of_university || '';
      this.computerSkills = tutor?.computer_skills || '';
      this.degreeLevel = tutor?.degree_level || '';
      this.teachingExperience = tutor?.teaching_experience || '';
      this.degreeField = tutor?.degree_field || '';
      this.teachingExperienceOnline = tutor?.teaching_experience_online || '';
      this.currentEmployer = tutor?.current_employer || '';
      this.currentTitle = tutor?.current_title || '';

      this.badges = tutor?.badges || [];
      this.rate = tutor?.rate || 0;
      this.reviewsCount = tutor?.reviews_count || 0;
      this.studentNumber = tutor?.student_number || 0;
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

export interface ITutorFilters {
  name: string;
}

export function sortSubjects(subjects?: ISubject[]): any[] {
  const output: any[] = [];

  subjects?.forEach((item: any) => {
    const existing = output.filter((v, i) => {
      return v.fieldId == item.fieldId;
    });

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
