import { generalConstants } from 'src/app/config';
import { environment } from 'src/environments/environment';

export class IStudent {
  id!: number;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  mobile?: string;
  email?: string;
  gender?: string;
  nationality?: string;
  dateOfBirth?: string;
  bio?: string;
  verified?: number;
  financialApproval: number;
  cover?: string;
  headline?: string;
  createdAt?: string;
  country?: string;
  city?: string;
  about?: string;
  roleName?: string;
  coursesCount?: number;
  address?: string;
  postalCode?: string;
  status?: string;
  adminApproval?: boolean;
  newsletter?: number;
  publicMessage?: string;
  kudosPoints?: number;

  constructor(createDefault = false, student: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.firstName = '';
      this.lastName = '';
      this.avatar = generalConstants.defaultAvatarPath;
      this.cover = generalConstants.defaultCoverPath;
      this.bio = '';
      this.about = '';
      this.createdAt = '';
      this.financialApproval = 0;
      this.newsletter = 0;
      this.adminApproval = false;
      this.postalCode = '';
      this.address = '';
      this.coursesCount = 0;
      this.headline = '';
      this.dateOfBirth = '';
      this.email = '';
      this.mobile = '';
      this.roleName = '';
      this.kudosPoints = 0;
      this.publicMessage = '';
      this.status = '';
      this.verified = 0;
      this.gender = '';
      this.city = '';
      this.nationality = '';
      this.country = '';
    }

    if (student) {
      this.id = student?.id;
      this.name = student?.first_name + ' ' + student?.last_name;
      this.firstName = student?.first_name || '';
      this.lastName = student?.last_name || '';
      this.avatar =
        environment.imageURL + student?.avatar ||
        generalConstants.defaultAvatarPath;
      this.cover = student?.cover_img || generalConstants.defaultCoverPath;
      this.bio = student?.bio || '';
      this.address = student?.address || '';
      this.adminApproval = student?.admin_approval;
      this.createdAt = student?.created_at || '';
      this.kudosPoints = student?.kudos_points;
      this.publicMessage = student?.public_message;
      this.newsletter = student?.newsletter;
      this.postalCode = student?.postal_code;
      this.coursesCount = student?.courses_count || 0;
      this.headline = student?.headline || '';
      this.dateOfBirth = student?.date_of_birth || '';
      this.email = student?.email || '';
      this.about = student?.about || '';
      this.mobile = student?.mobile || '';
      this.roleName = student?.role_name || '';
      this.status = student?.status || '';
      this.verified = student?.verified || 0;
      this.country = student?.country || '';
      this.city = student?.city || '';
      this.gender = student?.gender || '';
      this.nationality = student?.nationality || '';
      this.financialApproval = student?.financial_approval;
    }
  }
}

export interface IStudentFilters {
  name: string;
}
