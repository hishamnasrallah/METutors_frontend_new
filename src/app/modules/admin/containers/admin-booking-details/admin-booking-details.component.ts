import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-booking-details',
  templateUrl: './admin-booking-details.component.html',
  styleUrls: ['./admin-booking-details.component.scss'],
})
export class AdminBookingDetailsComponent implements OnInit {
  previousTutors$: Observable<any>;
  isLoadingPreviousTutors$: Observable<boolean>;
  showPreviousTeacherModal$: Observable<boolean>;
  showStudentsFeedbackModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; bookingDetail: any }>;

  imageURL = environment.imageURL;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadBookingDetail());

    this.showStudentsFeedbackModal$ = this._store.select(
      fromAdmin.selectStudentsFeedbackModal
    );

    this.showPreviousTeacherModal$ = this._store.select(
      fromAdmin.selectPreviousTeacherModal
    );

    this.previousTutors$ = this._store.select(
      fromCore.selectAdminCoursePreviousTutors
    );

    this.isLoadingPreviousTutors$ = this._store.select(
      fromCore.selectIsLoadingPreviousTutors
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminBookingDetail),
      this._store.select(fromCore.selectIsLoadingAdminBookingDetail),
    ]).pipe(map(([bookingDetail, loading]) => ({ loading, bookingDetail })));
  }

  onOpenStudentsFeedbackModal() {
    this._store.dispatch(fromAdminAction.openAdminStudentsFeedbackModal());
  }

  onCloseStudentsFeedbackModal() {
    this._store.dispatch(fromAdminAction.closeAdminStudentsFeedbackModal());
  }

  onOpenPreviousTeacherModal() {
    this._store.dispatch(fromCore.loadAdminCoursePreviousTutors());
    this._store.dispatch(fromAdminAction.openAdminPreviousTeacherModal());
  }

  onClosePreviousTeacherModal() {
    this._store.dispatch(fromAdminAction.closeAdminPreviousTeacherModal());
  }
}
