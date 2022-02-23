import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { getLookups, TicketCategory } from 'src/app/config';
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
      const topicCategory = res.get('topic') || 0;
      const topics = getLookups()?.topics;

      if (topics && topics.length) {
        topics.forEach((topic) => {
          if (topic.id === +topicCategory) {
            this.faqTitle = `FAQ ${topic?.name}`;
            this._title.setTitle(this.faqTitle);
          }
        });
      }

      this.fetchListFaqSub = this._supportService
        .fetchListFaq(+topicCategory)
        .subscribe(
          (response) => {
            this.listFAQs = response.faqs;
            this.tempListFAQs = response.faqs;
          },
          () => {}
        );
    });
  }

  ngOnDestroy(): void {
    this.fetchListFaqSub?.unsubscribe();
  }
}
