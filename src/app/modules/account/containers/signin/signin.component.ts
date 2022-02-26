import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRole } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService } from 'src/app/core/services';
import { FormValidationUtilsService } from 'src/app/core/validators';

@Component({
  selector: 'metutors-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  userRole: any;
  gloading = false;
  floading = false;
  signinForm: FormGroup;
  loading: boolean = false;
  signinSub?: Subscription;

  constructor(
    private _router: Router,
    // public dialog: MatDialog,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _authService: AuthService,
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
      rememberMe: [null],
    });
  }

  ngOnInit(): void {}

  get username(): AbstractControl | null {
    return this.signinForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.signinForm.get('password');
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) {
      return;
    }
    this.loading = true;
    this.signinSub = this._authService
      .login(form.value)
      .subscribe((response: any) => {
        if (response) {
          if (response.status === true) {
            this.signinForm.reset();
            this.loading = false;

            if (response.token) {
              localStorage.setItem('token', response.token);
            }

            if (
              this._route.snapshot.queryParams['returnUrl'] &&
              decodeURIComponent(this._route.snapshot.queryParams['returnUrl'])
            ) {
              let returnUrl = decodeURIComponent(
                this._route.snapshot.queryParams['returnUrl']
              );
              this._router.navigate([returnUrl]);
            } else {
              // if (response.user.role_name === UserRole.student) {
              //   this._router.navigate(['/student-dashboard'], {
              //     queryParams: {
              //       id: response.user.id,
              //       name: response.user.first_name,
              //     },
              //   });
              // } else if (response.user.role_name === UserRole.tutor) {
              //   this._router.navigate(['/teacher-dashboard'], {
              //     queryParams: {
              //       id: response.user.id,
              //       name: response.user.first_name,
              //     },
              //   });
              // } else if (response.user.role_name === UserRole.admin) {
              //   localStorage.setItem('role', 'admin-temporary');
              //   // this.openDialog(response);
              // } else {
              this._router.navigate(['/']);
              // }
            }
          } else {
            this._alertNotificationService.error(response.message);
          }
        }
        this.loading = false;
      });
  }

  // openDialog(data: any): void {
  //   const dialogRef = this.dialog.open(OtpVerifyComponent, {
  //     width: '500px',
  //     data,
  //     disableClose: true,
  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     this._router.navigate(['/admin-dashboard'], {
  //       queryParams: { id: data.user.id, name: data.user.first_name },
  //     });
  //   });
  // }

  // openRolesDialog(domain: any): void {
  //   const dialogRef = this.dialog.open(RolesSelectComponent, {
  //     width: '500px',
  //     disableClose: true,
  //   });

  //   dialogRef.afterClosed().subscribe((res: any) => {
  //     this.userRole = res.data.toString();
  //     domain === 'google' ? this.signInWithGoogle() : this.signInWithFacebook();
  //   });
  // }

  signInWithGoogle() {
    this.gloading = true;

    this._authService.signInWithGoogle().then((data: any) => {
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
        data['role'] = this.userRole;

        this._authService.googleSignIn(data).subscribe((res: any) => {
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
    this._authService.signInWithFacebook().then((data: any) => {
      this.floading = true;
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
        data['role'] = this.userRole;

        this._authService.facebookSignIn(data).subscribe((res: any) => {
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

  ngOnDestroy(): void {
    this.signinSub?.unsubscribe();
  }
}
