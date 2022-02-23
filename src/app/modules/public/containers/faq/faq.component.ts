import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addLookups, getLookups } from 'src/app/config';
import { IFAQ, IFAQTopics } from 'src/app/core/models';
import { SupportService } from 'src/app/core/services';

@Component({
  selector: 'metutors-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  listFAQs: IFAQ[] = [];
  topics!: IFAQTopics[];
  tempListFAQs: IFAQ[] = [];
  fetchListFaqSub?: Subscription;
  fetchFaqTopicsSub?: Subscription;

  constructor(private _supportService: SupportService) {}

  ngOnInit(): void {
    this.fetchFaqTopicsSub = this._supportService
      .fetchFaqTopics()
      .subscribe((topics) => {
        this.topics = topics;
        addLookups('topics', topics);
      });

      this.topics = getLookups()?.topics;

    this.fetchListFaqSub = this._supportService.fetchListFaq().subscribe(
      (response) => {
        this.listFAQs = response.faqs;
        this.tempListFAQs = response.faqs;
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.fetchListFaqSub?.unsubscribe();
    this.fetchFaqTopicsSub?.unsubscribe();
  }
}
