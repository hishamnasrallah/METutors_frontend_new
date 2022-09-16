import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-orders',
  templateUrl: './admin-finance-orders.component.html',
  styleUrls: ['./admin-finance-orders.component.scss'],
})
export class AdminFinanceOrdersComponent implements OnInit {
  imageUrl = environment.imageURL;
  view$: Observable<{ result: any; loading: boolean }>;

  perPage = 10;

  constructor(private _store: Store<any>) {}

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadOrders({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadOrders({
        params: { page, search: '' },
      })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadOrders({
        params: { page: 1, search: '' },
      })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceOrders),
      this._store.select(fromCore.selectIsLoadingFinance),
    ]).pipe(map(([result, loading]) => ({ result, loading })));
  }
}
