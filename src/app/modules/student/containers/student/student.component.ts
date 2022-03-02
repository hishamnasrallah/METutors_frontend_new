import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  constructor(private _store: Store<any>) {}

  ngOnInit(): void {}

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
