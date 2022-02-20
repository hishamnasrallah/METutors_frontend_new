import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _alertNotificationService: AlertNotificationService,
    private _authService: AuthService
  ) {
    this.form = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.loading = true;
      this._authService
        .forgetPassword(form.value.email)
        .subscribe((response) => {
          if (response.status === 'true') {
            this.loading = false;
            this._alertNotificationService.success(response.message);
            this.form.reset();
          } else {
            this._alertNotificationService.error(response.errors[0]);
          }

          this.loading = false;
        });
    }
  }
}
