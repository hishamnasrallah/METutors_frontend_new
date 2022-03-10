import { Component, OnInit } from '@angular/core';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'metutors-tutor-classes',
  templateUrl: './tutor-classes.component.html',
  styleUrls: ['./tutor-classes.component.scss'],
})
export class TutorClassesComponent implements OnInit {
  user$: Observable<IUser | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
  }
}
