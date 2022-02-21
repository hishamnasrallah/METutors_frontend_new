import { Component, OnInit } from '@angular/core';
import { AlertNotificationService } from 'src/app/core/components';
import { ContactService } from 'src/app/core/services';

@Component({
  selector: 'metutors-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private _contactService: ContactService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {}

  submitContact(value: any): void {
    this.loading = true;
    this._contactService.createContact(value).subscribe(
      (response) => {
        this.loading = false;
        this._alertNotificationService.success(
          'Your message has been sent successfully'
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
}
