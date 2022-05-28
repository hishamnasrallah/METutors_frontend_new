import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { addMisc, getMisc } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import { IRole } from 'src/app/core/models';
import { AuthService, UsersService } from 'src/app/core/services';
import { FormValidationUtilsService } from 'src/app/core/validators';
import * as fromCore from '@metutor/core/state';
import { OtpVerifyComponent, RolesSelectComponent } from '../../components';

@Component({
  selector: 'metutors-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  userRole: any;
  roles!: IRole[];
  authLoading = false;
  signinForm: FormGroup;
  signinSub?: Subscription;
  getRolesSub?: Subscription;
  authSignInSub?: Subscription;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _userService: UsersService,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
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
      this.authLoading = true;

      const data = {
        ...response,
        role: this.userRole,
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
        role: this.userRole,
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
    this.signinSub?.unsubscribe();
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
