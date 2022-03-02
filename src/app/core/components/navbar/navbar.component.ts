import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  token$: Observable<string | undefined>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
