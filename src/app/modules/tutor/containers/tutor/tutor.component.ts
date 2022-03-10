import { Component, OnInit } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';
import * as fromRoot from '@metutor/state';

@Component({
  selector: 'metutors-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
})
export class TutorComponent implements OnInit {
  layout$: any;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
