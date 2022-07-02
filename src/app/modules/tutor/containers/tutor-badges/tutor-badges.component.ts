import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import { IUser } from '@metutor/core/models';
import * as fromRoot from '@metutor/state';

@Component({
  selector: 'metutors-tutor-badges',
  templateUrl: './tutor-badges.component.html',
  styleUrls: ['./tutor-badges.component.scss'],
})
export class TutorBadgesComponent implements OnInit {
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
