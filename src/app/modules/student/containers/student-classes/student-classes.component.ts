import { IUser } from '@models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Params } from '@angular/router';
import * as fromRoot from '@metutor/state';
import * as fromCore from '@metutor/core/state';
import * as fromRouterStore from '@metutor/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss'],
})
export class StudentClassesComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  routeParams$: Observable<Params>;

  openSideMenu = false;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
    this.routeParams$ = this._store.select(fromRouterStore.selectRouteParams);
  }
}
