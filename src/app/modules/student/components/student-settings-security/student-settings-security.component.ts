import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-settings-security',
  templateUrl: './student-settings-security.component.html',
  styleUrls: ['./student-settings-security.component.scss'],
})
export class StudentSettingsSecurityComponent implements OnInit {
  form: FormGroup;
  passwordSame?: boolean;
  loading: boolean = false;
  passwordValidated = false;
  subLoading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      currPassword: [
        null,
        [
          Validators.required,
          this.maxCharacterValidator,
          this.minPasswordValidation,
        ],
      ],
      newPassword: [
        null,
        [
          Validators.required,
          this.maxCharacterValidator,
          this.minPasswordValidation,
        ],
      ],
      confirmPassword: [
        null,
        [
          Validators.required,
          this.maxCharacterValidator,
          this.minPasswordValidation,
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get currPassword(): AbstractControl | null {
    return this.form.get('currPassword');
  }

  get newPassword(): AbstractControl | null {
    return this.form.get('newPassword');
  }

  get confirmPassword(): AbstractControl | null {
    return this.form.get('confirmPassword');
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

  onSubmitCurrentPassword() {
    this.loading = true;
    let data = {
      current_password: this.form.get('currPassword')?.value,
    };
    this._authService.validatePassword(data).subscribe((response) => {
      if (response.success === true) {
        this._alertNotificationService.success(response.message);
        this.passwordValidated = true;
      } else {
        response.message
          ? this._alertNotificationService.error(response.message)
          : this._alertNotificationService.error(response.errors[0]);
        this.form.get('currPassword')?.setValue('');
        this.passwordValidated = false;
      }

      this.loading = false;
    });
  }

  checkSamePasswords() {
    let pass = this.form.get('newPassword')?.value;
    let confirmPass = this.form.get('confirmPassword')?.value;

    if (pass === confirmPass) {
      this.passwordSame = true;
    } else {
      this.passwordSame = false;
    }
  }

  changePassword() {
    this.subLoading = true;
    let data = {
      current_password: this.form.get('currPassword')?.value,
      new_password: this.form.get('newPassword')?.value,
      confirm_password: this.form.get('confirmPassword')?.value,
    };
    this._authService.changePassword(data).subscribe(
      (response) => {
        if (response.success === true) {
          this._alertNotificationService.success(response.message);
          this.form.get('newPassword')?.setValue('');
          this.form.get('confirmPassword')?.setValue('');
        } else {
          response.message
            ? this._alertNotificationService.error(response.message)
            : this._alertNotificationService.error(response.errors[0]);
          this.form.get('newPassword')?.setValue('');
          this.form.get('confirmPassword')?.setValue('');
        }

        this.subLoading = false;
      },
      (error) => {
        this._alertNotificationService.error(
          error.error.error.confirm_password[0]
        );
        this.form.get('newPassword')?.setValue('');
        this.form.get('confirmPassword')?.setValue('');
        this.subLoading = false;
      }
    );
  }
}
