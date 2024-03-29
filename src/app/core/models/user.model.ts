import { generalConstants } from '@metutor/config';

export class IUser {
  id: number;
  firstName: string;
  lastName: string;
  name?: string;
  roleName: string;
  roleId: number;
  mobile: string;
  email: string;
  verified: number;
  avatar: string;
  profileCompletedStep: number;
  billingInfo: {
    city: string;
    state: string;
    street: string;
    country: string;
    postcode: string;
  };

  constructor(createDefault = false, user: any = null) {
    if (createDefault) {
      this.id = 0;
      this.firstName = '';
      this.lastName = '';
      this.name = '';
      this.roleName = '';
      this.roleId = 0;
      this.mobile = '';
      this.email = '';
      this.verified = 0;
      this.avatar = generalConstants.defaultAvatarPath;
      this.profileCompletedStep = 0;
      this.billingInfo.city = '';
      this.billingInfo.state = '';
      this.billingInfo.street = '';
      this.billingInfo.country = '';
      this.billingInfo.postcode = '';
    }

    if (user) {
      this.id = user.id;
      this.firstName = user.first_name;
      this.lastName = user.last_name;
      this.name = user.first_name + ' ' + user.last_name;
      this.roleName = user.role_name;
      this.roleId = user.role_id;
      this.mobile = user.mobile;
      this.email = user.email;
      this.verified = user.verified;
      this.avatar = user?.avatar || generalConstants.defaultAvatarPath;
      this.profileCompletedStep = user.profile_completed_step;
    }
  }
}
