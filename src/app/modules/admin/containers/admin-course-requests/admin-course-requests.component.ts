import { Component, OnInit } from '@angular/core';
import { ITutor } from '@metutor/core/models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-admin-course-requests',
  templateUrl: './admin-course-requests.component.html',
  styleUrls: ['./admin-course-requests.component.scss'],
})
export class AdminCourseRequestsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  pendingTutors$: Observable<ITutor[] | null>;

  constructor(private _store: Store<any> ) {}

  ngOnInit(): void {
    this._prepareTutors();
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadPendingTutors());
    this.pendingTutors$ = this._store.select(fromCore.selectPendingTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingPendingTutors);
  }
}
