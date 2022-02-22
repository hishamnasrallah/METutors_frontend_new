import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';
import { AlertNotificationService } from 'src/app/core/components';
import { IRole } from 'src/app/core/models';
import { AuthService, UsersService } from 'src/app/core/services';
import { FormValidationUtilsService } from 'src/app/core/validators';
import { RolesSelectComponent } from '../../components';

@Component({
  selector: 'metutors-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('userTypeAnimate', [
      transition('void => *', [
        style({ transform: 'translateY(20PX)' }),
        animate(700, style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class SignupComponent implements OnInit, OnDestroy {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  form!: FormGroup;
  userType?: number;
  signupForm: FormGroup;
  signupSub?: Subscription;
  signupStd?: Subscription;
  loading: boolean = false;
  selectedCountry: string = '';
  roles: any;
  numberOnly = true;
  minPhone = true;
  maxPhone = true;
  subloading: boolean = false;
  reloading: boolean = false;
  sendEmailSub?: Subscription;
  resendEmailConfirmSub?: Subscription;
  event = '';
  firstStep = true;
  secondStep = false;
  thirdStep = false;
  userRole: any;
  gloading = false;
  floading = false;
  docLoading = false;
  myFiles: any[] = [];

  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '*',
    inputStyles: {
      width: '70px',
      height: '65px',
    },
  };

  responseData!: {
    first_name: any;
    last_name: any;
    mobile: any;
    email: any;
    password: any;
    confirm_password: any;
    country_code: any;
    role: number;
  };

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _userService: UsersService,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.signupForm = this._fb.group(
      {
        firstName: [
          null,
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z -']+"),
            this._fv.minCharacterValidator,
            this._fv.maxCharacterValidator,
          ],
        ],
        lastName: [
          null,
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z -']+"),
            this._fv.minCharacterValidator,
            this._fv.maxCharacterValidator,
          ],
        ],
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ),
          ],
        ],
        mobileNumber: [null, []],
        password: [
          null,
          [
            Validators.required,
            this._fv.minPasswordValidation,
            this._fv.maxCharacterValidator,
          ],
        ],
        confirmPassword: [null, Validators.required],
      },
      {
        validators: this._fv.passwordsMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  ngOnInit(): void {
    this.roles = new Array<IRole>();

    this._userService.getUserLocation().then((res: any) => {
      if (res && res.countryCode) {
        this.selectedCountry = res.countryCode.toLowerCase();
      }
    });

    this._userService.getRoles().subscribe((response) => {
      if (response) {
        this.roles = response.roles;
        this.userType = 1;
      } else {
      }
    });
  }

  numberOnlyValidation(value: any): boolean {
    if (typeof Number(value) === 'number') {
      if (value.includes('+') || value.includes('-')) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  verifyPhoneNumber(event: any) {
    this.numberOnly = this.numberOnlyValidation(event.target.value);
    if (this.numberOnly) {
      let value = event.target.value.length;
      if (value < 5) {
        this.minPhone = false;
      } else {
        this.minPhone = true;
      }

      if (value > 15) {
        this.maxPhone = false;
      } else {
        this.maxPhone = true;
      }
    }
  }

  get firstName(): AbstractControl | null {
    return this.signupForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.signupForm.get('lastName');
  }

  get email(): AbstractControl | null {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.signupForm.get('confirmPassword');
  }

  get phoneNumber(): AbstractControl | null {
    return this.signupForm.get('mobileNumber');
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.loading = true;
    const countryCodeLength =
      this.phoneNumber?.value.internationalNumber.length - 11;
    const phoneNumber = {
      code: this.phoneNumber?.value.internationalNumber.substr(
        0,
        countryCodeLength
      ),
      mobile: this.phoneNumber?.value.internationalNumber.substr(
        countryCodeLength,
        this.phoneNumber.value.internationalNumber.length
      ),
    };

    const data: any = {
      first_name: this.firstName?.value,
      last_name: this.lastName?.value,
      mobile: phoneNumber.mobile.replace(' ', ''),
      email: this.email?.value,
      password: this.password?.value,
      confirm_password: this.confirmPassword?.value,
      country_code: phoneNumber.code.replace(' ', ''),
      role: this.userType,
    };

    if (this.userType == 1) {
      this.signupStd = this._authService
        .registerStudent(data)
        .subscribe((response) => {
          if (response.status === true) {
            this.signupForm.reset();
            this.loading = false;
            this.responseData = data;
            this.firstStep = false;
            this.secondStep = true;
          } else {
            this._alertNotificationService.error(response.errors[0]);
          }
          this.loading = false;
        });
    } else {
      this.signupSub = this._authService
        .registerTutor(data)
        .subscribe((response) => {
          if (response.status === true) {
            this.signupForm.reset();
            this.loading = false;
            this.responseData = data;
            this.firstStep = false;
            this.secondStep = true;
          } else {
            this._alertNotificationService.error(response.errors[0]);
          }
          this.loading = false;
        });
    }
  }

  onOtpChange(event: any) {
    this.event = event;
  }

  onSubmitVerifyEmail() {
    this.subloading = true;
    const data = {
      username: this.responseData.email,
      code: this.event,
    };
    this.sendEmailSub = this._authService
      .verifyEmail(data)
      .subscribe((response) => {
        if (response.status === true) {
          this.subloading = false;
          this._alertNotificationService.success(response.message);
          this.resetVal();
          if (this.userType == 1) {
            this._router.navigate(['/signin']);
          } else {
            this.firstStep = false;
            this.secondStep = false;
            this.thirdStep = true;
          }
        } else {
          this.subloading = false;
          this.resetVal();
          this._alertNotificationService.error(response.errors[0]);
        }
      });
  }

  resetVal() {
    this.ngOtpInput.setValue('');
  }

  resendEmailConfirm(): void {
    this.reloading = true;
    this.resendEmailConfirmSub = this._authService
      .resendEmailConfirm({ email: this.responseData.email })
      .subscribe((response) => {
        if (response.status === true) {
          this.reloading = false;
          this._alertNotificationService.success(response.message);
        } else {
          this.reloading = false;
          this._alertNotificationService.error(response.errors[0]);
        }
      });
  }

  openRolesDialog(domain: any): void {
    const _dialogRef = this._dialog.open(RolesSelectComponent, {
      width: '500px',
      disableClose: true,
    });

    _dialogRef.afterClosed().subscribe((res) => {
      this.userRole = res.data.toString();
      domain === 'google' ? this.signInWithGoogle() : this.signInWithFacebook();
    });
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle().then((data: any) => {
      localStorage.setItem('token', data.idToken);
      if (
        this._route.snapshot.queryParams['returnUrl'] &&
        decodeURIComponent(this._route.snapshot.queryParams['returnUrl'])
      ) {
        let returnUrl = decodeURIComponent(
          this._route.snapshot.queryParams['returnUrl']
        );
        this._router.navigate([returnUrl]);
      } else {
        this.gloading = true;

        data['role'] = this.userRole;

        this._authService.googleSignIn(data).subscribe((res) => {
          this.gloading = false;

          if (res.status === true) {
            this._alertNotificationService.success(res.message);
            if (this.userRole === '1') {
              this._router.navigate(['/student-dashboard'], {
                queryParams: { name: res.user.first_name },
              });
            } else if (this.userRole === '3') {
              this._router.navigate(['/teacher-dashboard'], {
                queryParams: { name: res.user.first_name },
              });
            } else {
              this._router.navigate(['/']);
            }
          } else {
            this._alertNotificationService.error(res.message);
          }
        });
      }
    });
  }

  signInWithFacebook() {
    this._authService.signInWithFacebook().then((data) => {
      localStorage.setItem('token', data.authToken);
      if (
        this._route.snapshot.queryParams['returnUrl'] &&
        decodeURIComponent(this._route.snapshot.queryParams['returnUrl'])
      ) {
        let returnUrl = decodeURIComponent(
          this._route.snapshot.queryParams['returnUrl']
        );
        this._router.navigate([returnUrl]);
      } else {
        // data.role = this.userRole;

        this.floading = true;

        this._authService.facebookSignIn(data).subscribe((res) => {
          this.floading = false;

          if (res.status === true) {
            this._alertNotificationService.success(res.message);
            if (this.userRole === '1') {
              this._router.navigate(['/student-dashboard'], {
                queryParams: { name: res.user.first_name },
              });
            } else if (this.userRole === '3') {
              this._router.navigate(['/teacher-dashboard'], {
                queryParams: { name: res.user.first_name },
              });
            } else {
              this._router.navigate(['/']);
            }
          } else {
            this._alertNotificationService.error(res.message);
          }
        });
      }
    });
  }

  onFileChange(event: any) {
    this.myFiles = event.target.files;

    if (this.myFiles && this.myFiles.length) {
      for (var i = 0; i < this.myFiles.length; i++) {
        this.myFiles.push(event?.target?.files[i]);
      }
    }
  }

  submiDocs() {
    this.docLoading = true;
    var formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append(`documents`, this.myFiles[i]);
    }

    formData.append(`email`, this.responseData.email);

    this._authService.uploadDocuments(formData).subscribe((res) => {
      if (res.status === 'true') {
        this._alertNotificationService.success(res.message);
        this._router.navigate(['/signin']);
      } else {
        this._alertNotificationService.error(res.errors[0]);
      }
      this.docLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.signupSub?.unsubscribe();
    this.signupStd?.unsubscribe();
    this.sendEmailSub?.unsubscribe();
    this.resendEmailConfirmSub?.unsubscribe();
  }
}
