import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertNotificationService } from 'src/app/core/components';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'metutors-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  isResend = false;
  isConfirmEmail = true;
  confirmEmailSub?: Subscription;
  resendEmailConfirmSub?: Subscription;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    const token = this._route.snapshot.queryParams['token'];
    const uid = this._route.snapshot.queryParams['uid'];

    this.confirmEmailSub = this._authService
      .confirmEmail({ uid, token })
      .subscribe(
        (response) => {
          if (response.status_code === 200) {
            this.isConfirmEmail = false;
            this._alertNotificationService.success(
              'You activate your email address successfully'
            );
            this._router.navigate(['/signin']);
          } else {
            this.isConfirmEmail = false;
            this._alertNotificationService.error(
              'Sorry! Your email not activated yet! Try to re-send new confirmation'
            );
          }
        },
        (error) => {
          this.isConfirmEmail = false;
          this._alertNotificationService.error(
            error.error.message ||
              'Sorry! Your email not activated yet! Try to re-send new confirmation'
          );
        }
      );
  }

  resendEmailConfirm(): void {
    this.isResend = true;
    const email = this._route.snapshot.queryParams['email'];

    this.resendEmailConfirmSub = this._authService
      .resendEmailConfirm(email)
      .subscribe(
        (response) => {
          if (response.status_code === 200) {
            this.isResend = false;
            this._alertNotificationService.success(
              'Your confirmation email has been sent successfully'
            );
          } else {
            this.isResend = false;
            this._alertNotificationService.error(
              'Your confirmation email not send yet!'
            );
          }
        },
        (error) => {
          this.isResend = false;
          this._alertNotificationService.error(
            error.error.detail || 'Your confirmation email not send yet!'
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.confirmEmailSub?.unsubscribe();
    this.resendEmailConfirmSub?.unsubscribe();
  }
}
