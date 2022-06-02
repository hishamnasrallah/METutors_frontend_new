import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';
import { courseStatusLabel } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-booking-details',
  templateUrl: './admin-tutor-booking-details.component.html',
  styleUrls: ['./admin-tutor-booking-details.component.scss'],
})
export class AdminTutorBookingDetailsComponent implements OnInit {
  feedback$: Observable<any>;
  previousTutors$: Observable<any>;
  availableTutors$: Observable<any>;
  tutorAvailability$: Observable<any>;
  reassigningTutor$: Observable<boolean>;
  isLoadingFeedback$: Observable<boolean>;
  isLoadingPreviousTutors$: Observable<boolean>;
  isLoadingAvailableTutors$: Observable<boolean>;
  showPreviousTeacherModal$: Observable<boolean>;
  showStudentsFeedbackModal$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showReassigningTutorSelectionModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; bookingDetail: any }>;

  statusLabel = courseStatusLabel;
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

    this.showReassigningTutorSelectionModal$ = this._store.select(
      fromAdmin.selectReassigningTutorSelectionModal
    );

    this.previousTutors$ = this._store.select(
      fromCore.selectAdminCoursePreviousTutors
    );

    this.isLoadingPreviousTutors$ = this._store.select(
      fromCore.selectIsLoadingPreviousTutors
    );

    this.feedback$ = this._store.select(fromCore.selectAdminStudentsFeedback);

    this.isLoadingFeedback$ = this._store.select(
      fromCore.selectIsLoadingAdminStudentsFeedback
    );

    this.availableTutors$ = this._store.select(fromCore.selectAvailableTutors);

    this.isLoadingAvailableTutors$ = this._store.select(
      fromCore.selectIsLoadingAvailableTutors
    );

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.reassigningTutor$ = this._store.select(
      fromCore.selectIsReassigningTutor
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminBookingDetail),
      this._store.select(fromCore.selectIsLoadingAdminBookingDetail),
    ]).pipe(map(([bookingDetail, loading]) => ({ loading, bookingDetail })));
  }

  onOpenStudentsFeedbackModal() {
    this._store.dispatch(fromCore.loadAdminStudentsFeedback());
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

  onOpenReassigningTutorSelectionModal() {
    this._store.dispatch(fromCore.loadAvailableTutors({}));
    this._store.dispatch(
      fromAdminAction.openAdminReassigningTutorSelectionModal()
    );
  }

  onCloseReassigningTutorSelectionModal() {
    this._store.dispatch(
      fromAdminAction.closeAdminReassigningTutorSelectionModal()
    );
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onReassignTutor(teacher_id: any): void {
    const body = { teacher_id };
    this._store.dispatch(fromCore.studentReassignTutor({ body }));
  }
}
