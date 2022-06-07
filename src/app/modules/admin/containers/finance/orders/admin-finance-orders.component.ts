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
  view$: Observable<{ orders: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadOrders());

    this.view$ = combineLatest([
      this._store.select(fromCore.selectFinanceOrders),
      this._store.select(fromCore.selectIsLoadingIFinance),
    ]).pipe(map(([orders, loading]) => ({ orders, loading })));
  }
}
