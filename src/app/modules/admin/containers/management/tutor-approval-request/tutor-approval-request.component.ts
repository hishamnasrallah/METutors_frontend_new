import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-tutor-approval-request',
  templateUrl: './tutor-approval-request.component.html',
  styleUrls: ['./tutor-approval-request.component.scss'],
})
export class TutorApprovalRequestComponent implements OnInit {
  view$: Observable<{
    loading: boolean;
    approvalRequest: any;
  }>;

  totalBooking$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onOpenBookingModal(id: number): void {
    const bookingType = 'subject';
    this._store.dispatch(
      fromCore.loadAdminStudentTotalBooking({ id, bookingType })
    );
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadAdminTutorApprovalRequest());

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.loadingTotalBooking$ = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingAdmin),
      this._store.select(fromCore.selectAdminTutorApprovalRequest),
    ]).pipe(
      map(([loading, approvalRequest]) => ({
        loading,
        approvalRequest,
      }))
    );
  }
}
