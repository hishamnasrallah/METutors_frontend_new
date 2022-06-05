import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { environment } from '@environment';
import { courseStatusLabel } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-booking-detail',
  templateUrl: './admin-student-booking-detail.component.html',
  styleUrls: ['./admin-student-booking-detail.component.scss'],
})
export class AdminStudentBookingDetailComponent implements OnInit {
  feedbacks$: Observable<any>;
  loadingFeedback$: Observable<boolean>;
  showFeedbackModal$: Observable<boolean>;
  assignmentsSummary$: Observable<boolean>;
  isLoadingAssignment$: Observable<boolean>;
  showAssignmentsModal$: Observable<boolean>;
  view$: Observable<{ course: any; loading: boolean }>;

  statusLabel = courseStatusLabel;
  imageUrl = environment.imageURL;

  constructor(private _store: Store<any>) {}

  onOpenAssignmentsModal(): void {
    this._store.dispatch(fromCore.loadAdminStudentAssignmentSummary());

    this._store.dispatch(
      fromAdminAction.openAdminStudentViewAssignmentsModal()
    );
  }

  onOpenFeedbackModal(): void {
    this._store.dispatch(fromCore.loadAdminStudentViewFeedback());
    this._store.dispatch(fromAdminAction.openAdminStudentViewFeedbackModal());
  }

  onCloseModals(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentViewFeedbackModal());

    this._store.dispatch(
      fromAdminAction.closeAdminStudentViewAssignmentsModal()
    );
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadAdminStudentBookingDetail());

    this.showAssignmentsModal$ = this._store.select(
      fromAdmin.selectAdminStudentViewAssignmentsModal
    );

    this.showFeedbackModal$ = this._store.select(
      fromAdmin.selectAdminStudentViewFeedbackModal
    );

    this.assignmentsSummary$ = this._store.select(
      fromCore.selectAdminStudentAssignmentSummary
    );

    this.isLoadingAssignment$ = this._store.select(
      fromCore.selectIsLoadingStudentAssignmentSummary
    );

    this.feedbacks$ = this._store.select(
      fromCore.selectAdminStudentViewFeedback
    );

    this.loadingFeedback$ = this._store.select(
      fromCore.selectIsLoadingStudentViewFeedback
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminBookingDetail),
      this._store.select(fromCore.selectIsLoadingAdminBookingDetail),
    ]).pipe(map(([course, loading]) => ({ course, loading })));
  }
}
