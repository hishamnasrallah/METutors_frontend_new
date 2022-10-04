import { Store } from '@ngrx/store';
import { IRole } from 'src/app/core/models';
import * as fromCore from '@metutor/core/state';
import { Observable, Subscription } from 'rxjs';
import { SocialProvider } from 'src/app/config';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromAccount from '@metutor/modules/account/state';
import { AuthService, UsersService } from 'src/app/core/services';
import { FormValidationUtilsService } from 'src/app/core/validators';
import { OtpVerifyComponent, RolesSelectComponent } from '../../components';
import * as fromAccountAction from '@metutor/modules/account/state/actions';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  roles$: Observable<IRole[]>;
  userRole$: Observable<number>;
  isLoading$: Observable<boolean>;
  authLoading$: Observable<boolean>;
  isVerifyEmail$: Observable<boolean>;
  isResendEmailconfirm$: Observable<boolean>;
  showAccountEmailVerificationModal$: Observable<boolean>;

  userRole: any;
  returnUrl: string;
  signinForm: FormGroup;
  passwordVisibility = false;
  getRolesSub?: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _userService: UsersService,
    private _fv: FormValidationUtilsService
  ) {
    this.signinForm = this._fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: [null, [Validators.required, this._fv.minPasswordValidation]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    this._prepareRoles();

    this.isLoading$ = this._store.select(fromCore.selectIsSignIn);
    this.authLoading$ = this._store.select(fromCore.selectIsSocialSignIn);
    this._store.select(fromCore.selectTempToken).subscribe((token) => {
      if (token) {
        this.openOtpDialog();
      }
    });

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'];

    this.showAccountEmailVerificationModal$ = this._store.select(
      fromAccount.selectShowEmailVerificationModal
    );
    this.userRole$ = this._store.select(fromAccount.selectLoginUserRole);
    this.isVerifyEmail$ = this._store.select(fromCore.selectIsVerifyEmail);
    this.isResendEmailconfirm$ = this._store.select(
      fromCore.selectIsResendEmailConfirm
    );
  }

  get username(): AbstractControl | null {
    return this.signinForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.signinForm.get('password');
  }

  onOpenAccountEmailVerificationModal(): void {
    this._store.dispatch(fromAccountAction.openAccountEmailVerificationModal());
  }

  onCloseAccountEmailVerificationModal(): void {
    this._store.dispatch(
      fromAccountAction.closeAccountEmailVerificationModal()
    );
  }

  onSubmitVerifyEmail(code: string, userType: number) {
    const value = {
      username: this.username?.value,
      code,
      userType,
    };

    this._store.dispatch(fromCore.verifyEmail({ value }));
  }

  resendEmailConfirm(): void {
    this._store.dispatch(
      fromCore.resendEmailConfirm({
        email: this.username?.value,
      })
    );
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }

    this._store.dispatch(fromCore.signIn({ user: form.value }));
  }

  openRolesDialog(domain: any, roles: IRole[]): void {
    const dialogRef = this._dialog.open(RolesSelectComponent, {
      width: '500px',
      disableClose: true,
      data: roles,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.data) {
        this.userRole = res.data.toString();
        domain === 'google'
          ? this.signInWithGoogle()
          : this.signInWithFacebook();
      }
    });
  }

  openOtpDialog(): void {
    const dialogRef = this._dialog.open(OtpVerifyComponent, {
      width: '500px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res && res.data) {
      }
    });

    dialogRef.componentInstance.submitForm.subscribe((otp) => {
      if (otp) {
        this._store.dispatch(fromCore.submitOTPAdmin({ otp }));
      }
    });

    dialogRef.componentInstance.resendOTP.subscribe(() => {
      this._store.dispatch(fromCore.resendOTPAdmin());
    });
  }

  signInWithGoogle() {
    this._authService.signInWithGoogle().then((response: any) => {
      const data = {
        ...response,
        role: this.userRole,
        provider: SocialProvider.google,
      };

      this._store.dispatch(fromCore.socialSignIn({ user: data }));
    });
  }

  signInWithFacebook() {
    this._authService.signInWithFacebook().then((response) => {
      const data = {
        ...response,
        role: this.userRole,
        provider: SocialProvider.facebook,
      };

      this._store.dispatch(fromCore.socialSignIn({ user: data }));
    });
  }

  ngOnDestroy(): void {
    this.getRolesSub?.unsubscribe();
  }

  private _prepareRoles(): void {
    this._store.dispatch(fromCore.loadUserTypes());
    this.roles$ = this._store.select(fromCore.selectUserTypes);
  }
}
