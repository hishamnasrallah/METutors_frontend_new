import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from '@metutor/core/models';
import { Component, OnInit } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import * as fromRoot from '@metutor/state';
import * as fromRouterStore from '@metutor/state';
import { Params } from '@angular/router';

@Component({
  selector: 'metutors-tutor-classes',
  templateUrl: './tutor-classes.component.html',
  styleUrls: ['./tutor-classes.component.scss'],
})
export class TutorClassesComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  routeParams$: Observable<Params>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
    this.routeParams$ = this._store.select(fromRouterStore.selectRouteParams);
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
