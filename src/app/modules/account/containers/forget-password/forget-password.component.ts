import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'metutors-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  successMsg: string;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      this._authService.forgetPassword(form.value.email).subscribe(
        (response) => {
          if (response.status === 'true') {
            this.loading = false;
            this.successMsg = response.message;
          } else {
            this._alertNotificationService.error(response.errors[0]);
            this.loading = false;
          }

          this.loading = false;
        },
        (error) => {
          this._alertNotificationService.error(error.error.errors[0]);
          this.loading = false;
        }
      );
    }
  }
}
