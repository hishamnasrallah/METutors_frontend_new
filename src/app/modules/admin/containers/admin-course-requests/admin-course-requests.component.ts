import { Component, OnInit } from '@angular/core';
import { ICourseRequest } from '@metutor/core/models';
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
  requestsCounts$: Observable<any>;
  requestedCourses$: Observable<ICourseRequest[] | null>;
  completedCourses$: Observable<ICourseRequest[] | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadRequestedCourses());
    this.requestedCourses$ = this._store.select(
      fromCore.selectRequestedCourses
    );
    this.completedCourses$ = this._store.select(
      fromCore.selectCompletedRequestedCourses
    );
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingRequestedCourses
    );
    this.requestsCounts$ = this._store.select(
      fromCore.selectRequestedCoursesCount
    );
  }
}
