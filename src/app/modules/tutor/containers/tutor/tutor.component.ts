import { Component, OnInit } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'metutors-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
})
export class TutorComponent implements OnInit {
  constructor(private _store: Store<any>) {}

  ngOnInit(): void {}

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
