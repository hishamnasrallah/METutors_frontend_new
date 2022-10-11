import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Input,
  OnInit,
  Output,
  ViewChild,
  Component,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'metutors-signup-email-verification',
  templateUrl: './signup-email-verification.component.html',
  styleUrls: ['./signup-email-verification.component.scss'],
})
export class SignupEmailVerificationComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  @Input() email: string;
  @Input() showHint = true;
  @Input() loading?: boolean;
  @Input() resendLoading?: boolean;

  @Output() submitForm = new EventEmitter();
  @Output() changeStep = new EventEmitter();
  @Output() resendEmail = new EventEmitter();

  form: FormGroup;
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '*',
    inputStyles: {
      width: '70px',
      height: '65px',
    },
  };

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      code: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  ngOnInit(): void {}

  onOtpChange(value: string): void {
    if (value && value.length === 5) {
      this.form.get('code')?.setValue(value);
      this.form.updateValueAndValidity();
      this.form.markAsDirty();
    } else {
      this.form.get('code')?.setValue(null);
      this.form.updateValueAndValidity();
      this.form.markAsDirty();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value.code);
    }
  }

  resendEmailConfirm(): void {
    this.resendEmail.emit();
    this.ngOtpInput.setValue(null);
    this.form.get('code')?.setValue(null);
    this.form.updateValueAndValidity();
    this.form.markAsDirty();
  }
}
