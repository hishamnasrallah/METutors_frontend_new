import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { ICourseRequest } from '@models';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-course-requests',
  templateUrl: './admin-course-requests.component.html',
  styleUrls: ['./admin-course-requests.component.scss'],
})
export class AdminCourseRequestsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  requestsCounts$: Observable<any>;
  openRequestCourseDetailsModal$: Observable<boolean>;
  requestedCourses$: Observable<ICourseRequest[] | null>;
  completedCourses$: Observable<ICourseRequest[] | null>;

  requestDetails: ICourseRequest;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareRequests();

    this.openRequestCourseDetailsModal$ = this._store.select(
      fromAdmin.selectAdminRequestCourseDetailsModal
    );
  }

  onOpenRequestCourseDetailsModal(): void {
    this._store.dispatch(fromAdminAction.openAdminRequestCourseDetailsModal());
  }

  onCloseRequestCourseDetailsModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminRequestCourseDetailsModal());
  }

  private _prepareRequests(): void {
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
