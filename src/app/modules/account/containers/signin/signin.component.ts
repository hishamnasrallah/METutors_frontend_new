import { Store } from '@ngrx/store';
import { IRole } from 'src/app/core/models';
import * as fromCore from '@metutor/core/state';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { addMisc, getMisc, SocialProvider } from 'src/app/config';
import { AuthService, UsersService } from 'src/app/core/services';
import { FormValidationUtilsService } from 'src/app/core/validators';
import { OtpVerifyComponent, RolesSelectComponent } from '../../components';
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
  isLoading$: Observable<boolean>;
  authLoading$: Observable<boolean>;

  userRole: any;
  roles!: IRole[];
  signinForm: FormGroup;
  getRolesSub?: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _dialog: MatDialog,
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
  }

  get username(): AbstractControl | null {
    return this.signinForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.signinForm.get('password');
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) {
      return;
    }

    this._store.dispatch(fromCore.signIn({ user: form.value }));
  }

  openRolesDialog(domain: any): void {
    const dialogRef = this._dialog.open(RolesSelectComponent, {
      width: '500px',
      disableClose: true,
      data: this.roles,
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
      if (res && res.data) {}
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
    this.getRolesSub = this._userService.getRoles().subscribe((response) => {
      this.roles = response;
      addMisc('roles', this.roles);
    });

    this.roles = getMisc().roles;
  }
}
