import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { getLookups, TicketCategory } from 'src/app/config';
import { IFAQ, IFAQTopics } from 'src/app/core/models';
import { SupportService } from 'src/app/core/services';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-faq-ticket',
  templateUrl: './faq-ticket.component.html',
  styleUrls: ['./faq-ticket.component.scss'],
})
export class FaqTicketComponent implements OnInit {
  FAQs$: Observable<IFAQ[] | null>;
  loadingFAQs$: Observable<boolean>;
  loadingTopics$: Observable<boolean>;
  topics$: Observable<IFAQTopics[] | null>;

  faqTitle!: string;
  listFAQs: IFAQ[] = [];
  tempListFAQs: IFAQ[] = [];
  fetchListFaqSub?: Subscription;

  constructor(
    private _title: Title,
    private _store: Store<any>,
    private _route: ActivatedRoute,
    private _supportService: SupportService
  ) {}

  ngOnInit(): void {
    this._prepareFAQ();
    this._prepareTopics();

    // this._route.paramMap.subscribe((res: ParamMap) => {
    //   const topicCategory = res.get('topic') || 0;
    //   const topics = getLookups()?.topics;

    //   if (topics && topics.length) {
    //     topics.forEach((topic) => {
    //       if (topic.id === +topicCategory) {
    //         this.faqTitle = `FAQ ${topic?.name}`;
    //         this._title.setTitle(this.faqTitle);
    //       }
    //     });
    //   }

    //   this.fetchListFaqSub = this._supportService
    //     .fetchListFaq(+topicCategory)
    //     .subscribe(
    //       (response) => {
    //         this.listFAQs = response.faqs;
    //         this.tempListFAQs = response.faqs;
    //       },
    //       () => {}
    //     );
    // });
  }

  filterFAQs(title: string): void {
    console.log(title);
    this._store.dispatch(fromCore.loadFAQs({ title, load: true }));
  }

  private _prepareFAQ(): void {
    this._store.dispatch(fromCore.loadFAQs({ load: true }));
    this.FAQs$ = this._store.select(fromCore.selectFAQs);
    this.loadingFAQs$ = this._store.select(fromCore.selectIsLoadingFAQs);
  }

  private _prepareTopics(): void {
    this._store.dispatch(fromCore.loadTopics());
    this.topics$ = this._store.select(fromCore.selectTopics).pipe(
      tap((topics) => {
        if (topics && topics.length) {
          const topicCategory: string = this._route.snapshot.params['topics'];

          topics.forEach((topic) => {
            if (topic.id === +topicCategory) {
              this.faqTitle = `FAQ ${topic?.name}`;
              this._title.setTitle(this.faqTitle);
            }
          });
        }
      })
    );
    this.loadingTopics$ = this._store.select(fromCore.selectIsLoadingTopics);
  }
}
