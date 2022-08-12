import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-admin-finance-courses',
  templateUrl: './admin-finance-courses.component.html',
  styleUrls: ['./admin-finance-courses.component.scss'],
})
export class AdminFinanceCoursesComponent implements OnInit {
  imageUrl = environment.imageURL;
  view$: Observable<{ result: any; loading: boolean }>;

  perPage = 10;

  constructor(private _store: Store<any>) {}

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadAdminCourses({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminCourses({
        params: { page, search: '' },
      })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminCourses({
        params: { page: 1, search: '' },
      })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceCourses),
      this._store.select(fromCore.selectIsLoadingFinance),
    ]).pipe(map(([result, loading]) => ({ result, loading })));
  }
}
