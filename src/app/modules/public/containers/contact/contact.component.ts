import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/core/services';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertNotificationService } from 'src/app/core/components';

@Component({
  selector: 'metutors-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  loading: boolean = false;

  createContactSub?: Subscription;

  constructor(
    private _translate: TranslateService,
    private _contactService: ContactService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {}

  submitContact(value: any): void {
    this.loading = true;
    this.createContactSub = this._contactService.createContact(value).subscribe(
      (response) => {
        this.loading = false;
        this._translate.get('MESSAGE_SENT_SUCCESSFULLY').subscribe((res: string) => {
          this._alertNotificationService.success(response?.message || res);
        });
      },
      (error) => {
        this.loading = false;
        this._translate.get('ERROR_SEND_MESSAGE').subscribe((res: string) => {
          this._alertNotificationService.error(error.error.message || res);
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.createContactSub?.unsubscribe();
  }
}
