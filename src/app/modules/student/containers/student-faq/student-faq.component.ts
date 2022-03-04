import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { IFAQ } from 'src/app/core/models';

@Component({
  selector: 'metutors-student-faq',
  templateUrl: './student-faq.component.html',
  styleUrls: ['./student-faq.component.scss'],
})
export class StudentFaqComponent implements OnInit {
  FAQs$: Observable<IFAQ[] | null>;
  loadingFAQs$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadFAQs({}));
    this.FAQs$ = this._store.select(fromCore.selectFAQs);
    this.loadingFAQs$ = this._store.select(fromCore.selectIsLoadingFAQs);
  }

  filterFAQs(title: string): void {
    // this._store.dispatch(fromCore.loadFAQs());
    // this.FAQs$ = this._store.select(fromCore.selectFilteredFAQs);
  }
}
