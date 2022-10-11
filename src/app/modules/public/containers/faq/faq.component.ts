import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { IFAQ, IFAQTopics } from 'src/app/core/models';

@Component({
  selector: 'metutors-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  FAQs$: Observable<IFAQ[] | null>;
  loadingFAQs$: Observable<boolean>;
  loadingTopics$: Observable<boolean>;
  topics$: Observable<IFAQTopics[] | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareFAQ();
    this._prepareTopics();
  }

  filterFAQs(title: string): void {
    this.FAQs$ = this._store.select(fromCore.selectFilteredFAQs, { title });
  }

  private _prepareFAQ(): void {
    this._store.dispatch(fromCore.loadFAQs());
    this.FAQs$ = this._store.select(fromCore.selectFAQs);
    this.loadingFAQs$ = this._store.select(fromCore.selectIsLoadingFAQs);
  }

  private _prepareTopics(): void {
    this._store.dispatch(fromCore.loadTopics());
    this.topics$ = this._store.select(fromCore.selectTopics);
    this.loadingTopics$ = this._store.select(fromCore.selectIsLoadingTopics);
  }
}
