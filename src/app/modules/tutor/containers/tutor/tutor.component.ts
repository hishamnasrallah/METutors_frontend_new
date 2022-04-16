import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@metutor/state';
import { ITutor } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss'],
})
export class TutorComponent implements OnInit {
  layout$: any;
  tutor$: Observable<ITutor | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadProfileTutor());
    this.tutor$ = this._store.select(fromCore.selectProfileTutor);
    this.layout$ = this._store.select(fromRoot.selectLayout);
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }
}
