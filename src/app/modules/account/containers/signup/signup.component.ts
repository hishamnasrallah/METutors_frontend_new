import { Store } from '@ngrx/store';
import { upperFirst } from 'lodash';
import { IRole } from 'src/app/core/models';
import { Observable, Subscription } from 'rxjs';
import { CountryISO } from 'ngx-intl-tel-input';
import * as fromCore from '@metutor/core/state';
import { MatDialog } from '@angular/material/dialog';
import { RolesSelectComponent } from '../../components';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialProvider, UserRole } from 'src/app/config';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, UsersService } from 'src/app/core/services';
import { AlertNotificationService } from 'src/app/core/components';
import { FormValidationUtilsService } from 'src/app/core/validators';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

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
  step$: Observable<number>;
  email$: Observable<string>;
  roles$: Observable<IRole[]>;
  userType$: Observable<number>;
  isLoading$: Observable<boolean>;
  authLoading$: Observable<boolean>;
  isVerifyEmail$: Observable<boolean>;
  isResendEmailconfirm$: Observable<boolean>;

  userRole = UserRole;
  signupForm: FormGroup;
  signupSub?: Subscription;
  loading: boolean = false;
  getRolesSub?: Subscription;
  passwordVisibility = false;
  selectedCountry!: CountryISO;
  authSignInSub?: Subscription;
  confirmPasswordVisibility = false;

  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<any>,
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
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        ],
        lastName: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(15),
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
        mobileNumber: [null, [Validators.required]],
        password: [
          null,
          [
            Validators.required,
            this._fv.minPasswordValidation,
            this._fv.maxCharacterValidator,
          ],
        ],
        confirmPassword: [null, Validators.required],
        conditions: [false, Validators.requiredTrue],
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
    // this._userService.getUserLocation().then((res: any) => {
    //   if (res && res.countryName) {
    //     const countryName: keyof CountryISO = res.countryName;
    //     this.selectedCountry = CountryISO[countryName];
    //   }
    // });

    this._prepareRoles();

    if (this._route.snapshot.queryParams['role']) {
      const userType = this._route.snapshot.queryParams['role'];
      this.changeStep(1, '', +userType!);
    }

    this.step$ = this._store.select(fromCore.selectRegisterStep);
    this.isLoading$ = this._store.select(fromCore.selectIsSignUp);
    this.email$ = this._store.select(fromCore.selectRegisterEmail);
    this.userType$ = this._store.select(fromCore.selectRegisterUserType);
    this.authLoading$ = this._store.select(fromCore.selectIsSocialSignIn);
    this.isVerifyEmail$ = this._store.select(fromCore.selectIsVerifyEmail);
    this.isResendEmailconfirm$ = this._store.select(
      fromCore.selectIsResendEmailConfirm
    );
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

  onSubmit(form: FormGroup, userType: number) {
    if (form.invalid) {
      return;
    }

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

    const user: any = {
      first_name: upperFirst(this.firstName?.value),
      last_name: upperFirst(this.lastName?.value),
      mobile: phoneNumber.mobile.replace(' ', ''),
      email: this.email?.value,
      password: this.password?.value,
      confirm_password: this.confirmPassword?.value,
      country_code: phoneNumber.code.replace(' ', ''),
      role: userType,
    };

    this._store.dispatch(fromCore.register({ user }));
  }

  onSubmitVerifyEmail(code: string, email: string) {
    const value = {
      username: this.email?.value ? this.email?.value : email,
      code,
    };

    this._store.dispatch(fromCore.verifyEmail({ value }));
  }

  resendEmailConfirm(email: string): void {
    this._store.dispatch(
      fromCore.resendEmailConfirm({
        email: this.email?.value ? this.email?.value : email,
      })
    );
  }

  submitDocuments(files: File[], email: string, userType: number) {
    this.loading = true;
    const formData = new FormData();
    const sendFiles: any = [...files];

    sendFiles.forEach((file: any, index: number) => {
      formData.append(`documents[${index}]`, file);
    });
    formData.append(`email`, this.email?.value ? this.email?.value : email);

    this.signupSub = this._authService.uploadDocuments(formData).subscribe(
      (res) => {
        if (res.status === 'true') {
          this._store.dispatch(
            fromCore.registerStep({
              step: 1,
              email: '',
              userType,
            })
          );
          this._alertNotificationService.success(res.message);
          this._router.navigate(['/signin']);
        } else {
          this._alertNotificationService.error(res.errors[0]);
        }
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this._alertNotificationService.error(
          error?.error?.message ||
            'Something went wrong while uploading the documents'
        );
      }
    );
  }

  changeStep(step: number, email: string, userType: number): void {
    this._store.dispatch(
      fromCore.registerStep({
        step,
        email,
        userType,
      })
    );
  }

  openRolesDialog(domain: any, roles: IRole[]): void {
    const _dialogRef = this._dialog.open(RolesSelectComponent, {
      width: '500px',
      disableClose: true,
      data: roles,
    });

    _dialogRef.afterClosed().subscribe((res) => {
      if (res && res.data) {
        const userType = res.data.toString();

        this.changeStep(1, '', +userType!);
        domain === 'google'
          ? this.signInWithGoogle(userType)
          : this.signInWithFacebook(userType);
      }
    });
  }

  signInWithGoogle(userType: number) {
    this._authService.signInWithGoogle().then((response: any) => {
      const data = {
        ...response,
        role: userType,
        provider: SocialProvider.google,
      };

      this._store.dispatch(fromCore.socialSignIn({ user: data }));
    });
  }

  signInWithFacebook(userType: number) {
    this._authService.signInWithFacebook().then((response) => {
      this._authService.signInWithFacebook().then((response) => {
        const data = {
          ...response,
          role: userType,
          provider: SocialProvider.facebook,
        };

        this._store.dispatch(fromCore.socialSignIn({ user: data }));
      });
    });
  }

  ngOnDestroy(): void {
    this.signupSub?.unsubscribe();
    this.getRolesSub?.unsubscribe();
  }

  private _prepareRoles(): void {
    this._store.dispatch(fromCore.loadUserTypes());
    this.roles$ = this._store.select(fromCore.selectUserTypes);
  }
}
