import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountryISO } from 'ngx-intl-tel-input';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService, UsersService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-settings-account',
  templateUrl: './student-settings-account.component.html',
  styleUrls: ['./student-settings-account.component.scss'],
})
export class StudentSettingsAccountComponent implements OnInit {
  loading = false;
  form: FormGroup;
  profilePic: any;
  subloading = false;
  minPhone?: boolean;
  maxPhone?: boolean;
  numberOnly?: boolean;
  selectedCountry!: string;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UsersService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z -']+"),
          this.minCharacterValidator,
          this.maxCharacterValidator,
        ],
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z -']+"),
          this.minCharacterValidator,
          this.maxCharacterValidator,
        ],
      ],
      email: [
        null,
        [Validators.required, Validators.email, this.maxCharacterValidator],
      ],
      mobileNumber: [null, []],
    });
  }

  ngOnInit(): void {
    this._userService.getUserLocation().then((res: any) => {
      if (res && res.countryCode) {
        this.selectedCountry = res.countryCode.toLowerCase();
      }
    });
  }

  minCharacterValidator(control: FormControl) {
    let value = (control.value || '').trim().length;
    let less = value < 3;
    return less ? { minlength: true } : null;
  }

  minPasswordValidation(control: FormControl) {
    let value = (control.value || '').trim().length;
    let less = value < 8;
    return less ? { minlength: true } : null;
  }

  maxCharacterValidator(control: FormControl) {
    let value = (control.value || '').trim().length;
    let greater = value > 100;
    return greater ? { maxlength: true } : null;
  }

  verifyPhoneNumber(event: any) {
    this.numberOnly = this.numberOnlyValidation(event.target.value);
    if (this.numberOnly) {
      let value = event.target.value.length;

      this.minPhone = value >= 5;
      this.maxPhone = value <= 15;
    }
  }

  numberOnlyValidation(value: any) {
    if (typeof Number(value) === 'number') {
      return !(value.includes('+') || value.includes('-'));
    } else {
      return false;
    }
  }

  get firstName(): AbstractControl | null {
    return this.form.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.form.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get phoneNumber(): AbstractControl | null {
    return this.form.get('mobileNumber');
  }

  upload() {
    this.subloading = true;

    // document.getElementById('fileInput').click();
  }

  uploadProfilePic(event: any) {
    this.profilePic = event.target.files[0];
    this.subloading = false;

    if (event.target.files.length > 0) {
      // var output = document.getElementById('output');
      // output['src'] = URL.createObjectURL(event.target.files[0]);
      // output.onload = function () {
      //   URL.revokeObjectURL(output['src']);
      // };
    }
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    const countryCodeLength =
      this.phoneNumber?.value.internationalNumber.length - 11;
    let phoneNumber = {
      code: this.phoneNumber?.value.internationalNumber.substr(
        0,
        countryCodeLength
      ),
      mobile: this.phoneNumber?.value.internationalNumber.substr(
        countryCodeLength,
        this.phoneNumber.value.internationalNumber.length
      ),
    };

    const formData = new FormData();

    formData.append(`first_name`, this.firstName?.value);
    formData.append(`last_name`, this.lastName?.value);
    formData.append(`country_code`, phoneNumber.code.replace(' ', ''));
    formData.append(`mobile`, phoneNumber.mobile.replace(' ', ''));
    formData.append(`email`, this.email?.value);
    formData.append(`avatar`, this.profilePic);

    this._authService.updateStudentProfile(formData).subscribe((response) => {
      if (response.status === true) {
        this.form.reset();
        this.loading = false;
        this._alertNotificationService.success(response.message);
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }
      this.loading = false;
    });
  }
}
