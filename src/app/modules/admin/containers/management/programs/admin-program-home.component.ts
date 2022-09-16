import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-programs-home',
  templateUrl: './admin-program-home.component.html',
  styleUrls: ['./admin-program-home.component.scss'],
})
export class AdminProgramHomeComponent implements OnInit {
  tab = 0;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {}

  onChangeTab(tab: any): void {
    this.tab = tab.index;
    this._store.dispatch(fromCore.resetLookUpsPagination());
  }
}
