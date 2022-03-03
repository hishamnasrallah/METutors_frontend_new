import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { Subscription } from 'rxjs';
import { addMisc, getMisc, UserRole } from 'src/app/config';
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
  roles!: IRole[];
  step: number = 1;
  userRole = UserRole;
  signupForm: FormGroup;
  signupSub?: Subscription;
  loading: boolean = false;
  getRolesSub?: Subscription;
  authLoading: boolean = false;
  selectedCountry!: CountryISO;
  authSignInSub?: Subscription;
  resendLoading: boolean = false;
  userType?: number = UserRole.student;

  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

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
    this._userService.getUserLocation().then((res: any) => {
      if (res && res.countryName) {
        const countryName: keyof CountryISO = res.countryName;
        this.selectedCountry = CountryISO[countryName];
      }
    });

    this._prepareRoles();
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

    this.signupSub = this._authService.register(data).subscribe(
      (response) => {
        if (response.status === true) {
          this.step = 2;
        } else {
          this._alertNotificationService.error(response.errors[0]);
        }
        this.loading = false;
      },
      (error) => {
        this._alertNotificationService.error(
          error?.error?.message ||
            'Something went wrong while creating an account'
        );
      }
    );
  }

  onSubmitVerifyEmail(code: string) {
    this.loading = true;
    const data = {
      username: this.email?.value,
      code,
    };

    this.signupSub = this._authService.verifyEmail(data).subscribe(
      (response) => {
        if (response.status === true) {
          this.loading = false;
          this._alertNotificationService.success(response.message);

          if (this.userType == UserRole.student) {
            this._router.navigate(['/signin']);
          } else {
            this.step = 3;
          }
        } else {
          this.loading = false;
          this._alertNotificationService.error(response.errors[0]);
        }
      },
      (error) => {
        this._alertNotificationService.error(
          error?.error?.message ||
            'Something went wrong while verifing your email'
        );
      }
    );
  }

  resendEmailConfirm(): void {
    this.resendLoading = true;
    this.signupSub = this._authService
      .resendEmailConfirm({ email: this.email?.value })
      .subscribe(
        (response) => {
          if (response.status === true) {
            this.resendLoading = false;
            this._alertNotificationService.success(response.message);
          } else {
            this.resendLoading = false;
            this._alertNotificationService.error(response.errors[0]);
          }
        },
        (error) => {
          this._alertNotificationService.error(
            error?.error?.message ||
              'Something went wrong while verifing your email'
          );
        }
      );
  }

  submitDocuments(files: File[]) {
    this.loading = true;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`documents`, files[i]);
    }

    formData.append(`email`, this.email?.value);

    this.signupSub = this._authService.uploadDocuments(formData).subscribe(
      (res) => {
        if (res.status === 'true') {
          this._alertNotificationService.success(res.message);
          this._router.navigate(['/signin']);
        } else {
          this._alertNotificationService.error(res.errors[0]);
        }
        this.loading = false;
      },
      (error) => {
        this._alertNotificationService.error(
          error?.error?.message ||
            'Something went wrong while uploading the documents'
        );
      }
    );
  }

  openRolesDialog(domain: any): void {
    const _dialogRef = this._dialog.open(RolesSelectComponent, {
      width: '500px',
      disableClose: true,
      data: this.roles,
    });

    _dialogRef.afterClosed().subscribe((res) => {
      if (res && res.data) {
        this.userType = res.data.toString();
        domain === 'google'
          ? this.signInWithGoogle()
          : this.signInWithFacebook();
      }
    });
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle().then((response: any) => {
      this.authLoading = true;

      const data = {
        ...response,
        role: this.userType,
      };

      this.authSignInSub = this._authService.googleSignIn(data).subscribe(
        (res) => {
          this.authLoading = false;

          if (res) {
            localStorage.setItem('token', res);

            // if (this._authService.getIsStudentAuth()) {
            //   this._router.navigate(['/student']);
            // } else if (this._authService.getIsTutorAuth()) {
            //   this._router.navigate(['/tutor']);
            // } else {
              this._router.navigate(['/']);
            // }
          }
        },
        (error) => {
          this.authLoading = false;
          this._alertNotificationService.error(error?.error?.message);
        }
      );
    });
  }

  signInWithFacebook() {
    this._authService.signInWithFacebook().then((response) => {
      this.authLoading = true;

      const data = {
        ...response,
        role: this.userType,
      };

      this.authSignInSub = this._authService.facebookSignIn(data).subscribe(
        (res) => {
          this.authLoading = false;

          if (res) {
            localStorage.setItem('token', res);

            // if (this._authService.getIsStudentAuth()) {
            //   this._router.navigate(['/student']);
            // } else if (this._authService.getIsTutorAuth()) {
            //   this._router.navigate(['/tutor']);
            // } else {
            this._router.navigate(['/']);
            // }
          }
        },
        (error) => {
          this.authLoading = false;
          this._alertNotificationService.error(error?.error?.message);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.signupSub?.unsubscribe();
    this.getRolesSub?.unsubscribe();
    this.authSignInSub?.unsubscribe();
  }

  private _prepareRoles(): void {
    this.getRolesSub = this._userService.getRoles().subscribe((response) => {
      this.roles = response;
      addMisc('roles', this.roles);
    });

    this.roles = getMisc().roles;
  }
}
