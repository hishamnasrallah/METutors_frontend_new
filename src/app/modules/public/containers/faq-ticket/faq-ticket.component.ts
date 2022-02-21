import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketCategory } from 'src/app/config';
import { IFAQ } from 'src/app/core/models';
import { SupportService } from 'src/app/core/services';

@Component({
  selector: 'metutors-faq-ticket',
  templateUrl: './faq-ticket.component.html',
  styleUrls: ['./faq-ticket.component.scss'],
})
export class FaqTicketComponent implements OnInit, OnDestroy {
  faqTitle!: string;
  listFAQs: IFAQ[] = [];
  tempListFAQs: IFAQ[] = [];
  fetchListFaqSub?: Subscription;
  ticketCategory = TicketCategory;

  constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _supportService: SupportService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      const ticketCategory = res.get('ticket') || '';
      this.setFaqTitle(ticketCategory.toUpperCase());

      this._title.setTitle(this.faqTitle);
      this.fetchListFaqSub = this._supportService
        .fetchListFaq(ticketCategory)
        .subscribe(
          (response) => {
            this.listFAQs = response.results;
            this.tempListFAQs = response.results;
          },
          () => {}
        );
    });
  }

  setFaqTitle(category: string) {
    switch (category) {
      case this.ticketCategory.student:
        this.faqTitle = 'FAQ About Students';
        return;
      case this.ticketCategory.system:
        this.faqTitle = 'FAQ About System';
        return;
      case this.ticketCategory.technology:
        this.faqTitle = 'FAQ About Technology';
        return;
      case this.ticketCategory.tutor:
        this.faqTitle = 'FAQ About Tutors';
        return;
      default:
        return 'FAQ';
    }
  }

  ngOnDestroy(): void {
    this.fetchListFaqSub?.unsubscribe();
  }
}
