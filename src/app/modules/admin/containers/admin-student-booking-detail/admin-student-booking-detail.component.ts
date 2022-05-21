import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-student-booking-detail',
  templateUrl: './admin-student-booking-detail.component.html',
  styleUrls: ['./admin-student-booking-detail.component.scss'],
})
export class AdminStudentBookingDetailComponent implements OnInit {
  showFeedbackModal$: Observable<boolean>;
  showAssignmentsModal$: Observable<boolean>;
  view$: Observable<{ detail: any; loading: boolean }>;

  rate = 4;

  constructor(private _store: Store<any>) {}

  onOpenAssignmentsModal(): void {
    this._store.dispatch(
      fromAdminAction.openAdminStudentViewAssignmentsModal()
    );
  }

  onOpenFeedbackModal(): void {
    this._store.dispatch(fromAdminAction.openAdminStudentViewFeedbackModal());
  }

  onCloseModals(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentsFeedbackModal());

    this._store.dispatch(
      fromAdminAction.closeAdminStudentViewAssignmentsModal()
    );
  }

  ngOnInit(): void {
    // this._store.dispatch(fromCore.loadAdminStudentBookingDetail());

    this.showAssignmentsModal$ = this._store.select(
      fromAdmin.selectAdminStudentViewAssignmentsModal
    );

    this.showFeedbackModal$ = this._store.select(
      fromAdmin.selectAdminStudentViewFeedbackModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminStudentBookingDetail),
      this._store.select(fromCore.selectIsLoadingAdminBookingDetail),
    ]).pipe(map(([detail, loading]) => ({ detail, loading })));
  }
}
