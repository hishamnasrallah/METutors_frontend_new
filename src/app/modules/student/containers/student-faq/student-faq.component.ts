import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addMisc, getMisc, TicketCategory } from 'src/app/config';
import { IFAQ } from 'src/app/core/models';
import { MiscService, SupportService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-faq',
  templateUrl: './student-faq.component.html',
  styleUrls: ['./student-faq.component.scss'],
})
export class StudentFaqComponent implements OnInit, OnDestroy {
  systemInfoDetails: any;
  listFAQs?: IFAQ[] = [];
  tempListFAQs?: IFAQ[] = [];
  fetchListFaqSub?: Subscription;
  getSystemInfoDetailsSub?: Subscription;

  constructor(
    private _supportService: SupportService,
    private _miscService: MiscService
  ) {}

  ngOnInit(): void {
    this.fetchListFaqSub = this._supportService
      .fetchListFaq()
      .subscribe(
        (response) => {
          this.listFAQs = response.results;
          this.tempListFAQs = response.results;
        },
        () => {}
      );

    this.getSystemInfoDetailsSub = this._miscService
      .fetchSystemInfoDetails()
      .subscribe(
        (fetchedValues) => {
          this.systemInfoDetails = fetchedValues;
          addMisc('systemInfoDetails', this.systemInfoDetails);
        },
        () => {}
      );
    // this.systemInfoDetails = getMisc().systemInfoDetails;
  }

  ngOnDestroy(): void {
    this.getSystemInfoDetailsSub?.unsubscribe();
    this.fetchListFaqSub?.unsubscribe();
  }
}
