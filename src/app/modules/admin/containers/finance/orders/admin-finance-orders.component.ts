import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-orders',
  templateUrl: './admin-finance-orders.component.html',
  styleUrls: ['./admin-finance-orders.component.scss'],
})
export class AdminFinanceOrdersComponent implements OnInit {
  view: Observable<{ finance: any; loading: boolean }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadOrders());
  }
}
