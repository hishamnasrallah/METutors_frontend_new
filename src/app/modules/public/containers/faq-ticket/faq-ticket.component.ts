import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { IFAQ, IFAQTopics } from 'src/app/core/models';
import { ActivatedRoute, Params } from '@angular/router';

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

  topicId: Params;
  faqTitle!: string;
  listFAQs: IFAQ[] = [];
  tempListFAQs: IFAQ[] = [];

  constructor(
    private _title: Title,
    private _store: Store<any>,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._prepareFAQ();
    this._prepareTopics();
  }

  filterFAQs(title: string): void {
    this.FAQs$ = this._store.select(fromCore.selectFilteredFAQs, {
      title,
      topic: this.topicId,
    });
  }

  private _prepareFAQ(): void {
    this._store.dispatch(fromCore.loadFAQs());
    this.topicId = this._route.snapshot.params['topic'];
    this.loadingFAQs$ = this._store.select(fromCore.selectIsLoadingFAQs);
    this.FAQs$ = this._store.select(fromCore.selectFilteredFAQs, {
      topic: this.topicId,
    });
  }

  private _prepareTopics(): void {
    this._store.dispatch(fromCore.loadTopics());
    this.topics$ = this._store.select(fromCore.selectTopics);
    this.topics$.subscribe((topics) => {
      if (topics && topics.length) {
        this.topicId = this._route.snapshot.params['topic'];

        topics.forEach((topic) => {
          if (topic.id.toString() === this.topicId.toString()) {
            this.faqTitle = `FAQ ${topic?.name}`;
            this._title.setTitle(this.faqTitle);
          }
        });
      }
    });
    this.loadingTopics$ = this._store.select(fromCore.selectIsLoadingTopics);
  }
}
