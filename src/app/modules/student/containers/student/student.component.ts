import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import { IUser } from '@metutor/core/models';
import * as fromRoot from '@metutor/state';

@Component({
  selector: 'metutors-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
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
