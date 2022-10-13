import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IFAQ } from 'src/app/core/models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { generalConstants } from '@metutor/config';

@Component({
  selector: 'metutors-tutor-faq',
  templateUrl: './tutor-faq.component.html',
  styleUrls: ['./tutor-faq.component.scss'],
})
export class TutorFaqComponent implements OnInit {
  FAQs$: Observable<IFAQ[] | null>;
  loadingFAQs$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadFAQs());
    this.FAQs$ = this._store.select(fromCore.selectFilteredFAQs, {
      topic: generalConstants.tutorTopicId,
    });
    this.loadingFAQs$ = this._store.select(fromCore.selectIsLoadingFAQs);
  }

  filterFAQs(title: string): void {
    this.FAQs$ = this._store.select(fromCore.selectFilteredFAQs, {
      title,
      topic: generalConstants.tutorTopicId,
    });
  }
}
