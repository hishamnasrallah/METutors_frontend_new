import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
})
export class TutorComponent implements OnInit {
  tutors$: Observable<any[]>;
  loadingTutors$: Observable<boolean>;

  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutors())
    // this.tutors$ = this._store.select(fromCore.selectTutors());
    // this.loadingTutors$ = this._store.select(fromCore.selectIsLoadingTutors);
  }
}
