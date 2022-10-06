import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-help',
  templateUrl: './student-help.component.html',
  styleUrls: ['./student-help.component.scss'],
})
export class StudentHelpComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;

  openSideMenu = false;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
  }
}
