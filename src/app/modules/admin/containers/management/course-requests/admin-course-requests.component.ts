import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { ICourseRequest } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

import {
  CourseRequestStatus,
  COURSE_REQUEST_STATUSES_CONST,
} from '@metutor/config';

@Component({
  selector: 'metutors-course-requests',
  templateUrl: './admin-course-requests.component.html',
  styleUrls: ['./admin-course-requests.component.scss'],
})
export class AdminCourseRequestsComponent implements OnInit {
  openRequestCourseDetailsModal$: Observable<boolean>;

  view$: Observable<{
    stats: any;
    loading: boolean;
    completed: ICourseRequest[] | null;
    newCourses: ICourseRequest[] | null;
  }>;

  perPage = 10;
  requestDetails: ICourseRequest;
  requestStatus = CourseRequestStatus;
  requestStatuses = COURSE_REQUEST_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.openRequestCourseDetailsModal$ = this._store.select(
      fromAdmin.selectAdminRequestCourseDetailsModal
    );

    this._store.dispatch(
      fromCore.loadRequestedCourses({ params: { page: 1, search: '' } })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectRequestedCourses),
      this._store.select(fromCore.selectRequestedCoursesCount),
      this._store.select(fromCore.selectCompletedRequestedCourses),
      this._store.select(fromCore.selectIsLoadingRequestedCourses),
    ]).pipe(
      map(([newCourses, stats, completed, loading]) => ({
        stats,
        loading,
        newCourses,
        completed,
      }))
    );
  }

  onOpenRequestCourseDetailsModal(): void {
    this._store.dispatch(fromAdminAction.openAdminRequestCourseDetailsModal());
  }

  onCloseRequestCourseDetailsModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminRequestCourseDetailsModal());
  }

  changeRequestStatus(id: number, status: string): void {
    this._store.dispatch(fromCore.changeRequestStatus({ id, status }));
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadRequestedCourses({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadRequestedCourses({
        params: { page, search: '' },
      })
    );
  }
}
