import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { IUser } from '@metutor/core/models';
import { UserRole } from '@metutor/config';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'metutors-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user$: Observable<IUser | null>;
  token$: Observable<string | undefined>;

  userRole = UserRole;

  constructor(
    private _store: Store<any>,
    private _viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);
    this.user$ = this._store.select(fromCore.selectUser);
  }

  scrollToAnchor(): void {
    this._viewportScroller.scrollToAnchor('exploreServices');
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
