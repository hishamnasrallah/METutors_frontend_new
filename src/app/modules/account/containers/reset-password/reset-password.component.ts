import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService } from 'src/app/core/services';
import { FormValidationUtilsService } from 'src/app/core/validators';

@Component({
  selector: 'metutors-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token?: string;
  email?: string;
  reform: FormGroup;
  loading: boolean = false;
  passwordVisibility = false;
  confirmPasswordVisibility = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _fv: FormValidationUtilsService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.reform = this._fb.group(
      {
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
    this.token = this._route.snapshot.paramMap.get('token') || '';
    this.email = this._route.snapshot.paramMap.get('email') || '';
  }

  get password(): AbstractControl | null {
    return this.reform.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.reform.get('confirmPassword');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      let data = {
        email: this.email,
        password: this.password?.value,
        password_confirmation: this.confirmPassword?.value,
        token: this.token,
      };
      this._authService.resetPassword(data).subscribe((result) => {
        if (result.status === 'true') {
          this.loading = false;
          this._alertNotificationService.success(result.message);
          this.reform.reset();
          this._router.navigate(['/signin']);
        } else {
          result.errors
            ? this._alertNotificationService.error(result.errors[0])
            : this._alertNotificationService.error(result.message);
          this.reform.reset();
          this.loading = false;
        }
      });
    }
  }
}
