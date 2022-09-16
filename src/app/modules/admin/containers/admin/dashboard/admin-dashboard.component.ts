import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { IUser } from '@models';
import * as fromRoot from '@metutor/state';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
