import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertNotificationService } from 'src/app/core/components';
import { ContactService } from 'src/app/core/services';

@Component({
  selector: 'metutors-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  createContactSub?: Subscription;

  constructor(
    private _contactService: ContactService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {}

  submitContact(value: any): void {
    this.loading = true;
    this.createContactSub = this._contactService.createContact(value).subscribe(
      (response) => {
        this.loading = false;
        this._alertNotificationService.success(
          response?.message || 'Your message has been sent successfully'
        );
      },
      (error) => {
        this.loading = false;
        this._alertNotificationService.error(
          error.error.message || 'Error in sending your message'
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.createContactSub?.unsubscribe();
  }
}
