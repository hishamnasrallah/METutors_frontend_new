import { FormValidationUtilsService } from '@metutor/core/validators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'metutors-tutor-settings-security',
  templateUrl: './tutor-settings-security.component.html',
  styleUrls: ['./tutor-settings-security.component.scss'],
})
export class TutorSettingsSecurityComponent implements OnInit {
  @Input() isChanging: boolean | null;

  @Input() set resetForm(reset: boolean | null) {
    if (reset) {
      this.form.reset();
    }
  }

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  newPasswordVisibility = false;
  repeatPasswordVisibility = false;
  currentPasswordVisibility = false;

  constructor(
    private _fb: FormBuilder,
    private _fv: FormValidationUtilsService
  ) {
    this.form = this._fb.group(
      {
        oldPassword: [
          null,
          [
            Validators.required,
            this._fv.minPasswordValidation,
            this._fv.maxCharacterValidator,
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            this._fv.minPasswordValidation,
            this._fv.maxCharacterValidator,
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: this._fv.passwordsMatchValidator(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  ngOnInit(): void {}

  get oldPassword(): AbstractControl | null {
    return this.form.get('oldPassword');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  get confirmPassword(): AbstractControl | null {
    return this.form.get('confirmPassword');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
