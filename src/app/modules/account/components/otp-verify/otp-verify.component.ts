import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'metutors-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss'],
})
export class OtpVerifyComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;

  loading$: Observable<boolean>;
  resendLoading$: Observable<boolean>;

  @Output() submitForm = new EventEmitter();
  @Output() resendOTP = new EventEmitter();

  form: FormGroup;

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '*',
    inputStyles: {
      width: '70px',
      height: '65px',
    },
  };

  constructor(
    public dialogRef: MatDialogRef<OtpVerifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _store: Store<any>
  ) {
    this.loading$ = this._store.select(fromCore.selectIsSubmitOTPAdmin);
    this.resendLoading$ = this._store.select(fromCore.selectIsResendOTPAdmin);
    this._store.select(fromCore.selectToken).subscribe((token) => {
      if (token) {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      otp: [
        null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)],
      ],
    });
  }

  onOtpChange(value: string): void {
    if (value && value.length === 4) {
      this.form.get('otp')?.setValue(value);
      this.form.updateValueAndValidity();
      this.form.markAsDirty();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value.otp);
    }
  }

  resendOTPConfirm(): void {
    this.resendOTP.emit();
  }
}
