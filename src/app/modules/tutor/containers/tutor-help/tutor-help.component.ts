import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-help',
  templateUrl: './tutor-help.component.html',
  styleUrls: ['./tutor-help.component.scss'],
})
export class TutorHelpComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;

  openSideMenu = false;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
