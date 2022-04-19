import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormValidationUtilsService } from '@metutor/core/validators';
@Component({
  selector: 'metutors-student-settings-security',
  templateUrl: './student-settings-security.component.html',
  styleUrls: ['./student-settings-security.component.scss'],
})
export class StudentSettingsSecurityComponent implements OnInit {
  @Input() isChanging: boolean | null;

  @Input() set resetForm(reset: boolean | null) {
    if (reset) {
      this.form.reset();
    }
  }

  @Output() submitForm = new EventEmitter();

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _fv: FormValidationUtilsService
  ) {}

  ngOnInit(): void {
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
