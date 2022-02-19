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

@Component({
  selector: 'metutors-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  token?: string;
  email?: string;
  reform: FormGroup;
  heightPX?: number;
  passwordSame = true;
  loading: boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.reform = this._fb.group({
      password: [
        null,
        [
          Validators.required,
          this.minPasswordValidation,
          this.maxCharacterValidator,
        ],
      ],
      repassword: [
        null,
        [
          Validators.required,
          this.minPasswordValidation,
          this.maxCharacterValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.heightPX = window.innerHeight - 100;

    this.token = this._route.snapshot.paramMap.get('token') || '';
    this.email = this._route.snapshot.paramMap.get('email') || '';
  }

  get password(): AbstractControl | null {
    return this.reform.get('password');
  }

  get repassword(): AbstractControl | null {
    return this.reform.get('repassword');
  }

  checkSamePasswords() {
    let pass = this.password?.value;
    let confirmPass = this.repassword?.value;

    if (pass === confirmPass) {
      this.passwordSame = true;
    } else {
      this.passwordSame = false;
    }
  }

  public minPasswordValidation(control: FormControl) {
    let value = (control.value || '').trim().length;
    let less = value < 8;
    return less ? { minlength: true } : null;
  }

  public maxCharacterValidator(control: FormControl) {
    let value = (control.value || '').trim().length;
    let greater = value > 100;
    return greater ? { maxlength: true } : null;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      let data = {
        email: this.email,
        password: this.password?.value,
        password_confirmation: this.repassword?.value,
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
