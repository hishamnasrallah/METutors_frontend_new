import { Store } from '@ngrx/store';
import { CourseStatus } from '@config';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-tutor-re-assignment',
  templateUrl: './admin-management-tutor-re-assignment.component.html',
  styleUrls: ['./admin-management-tutor-re-assignment.component.scss'],
})
export class AdminManagementTutorReAssignmentComponent implements OnInit {
  name: string;
  courseStatus = CourseStatus;

  view$: Observable<{
    loading: boolean;
    reAssignment: any;
  }>;

  perPage = 10;
  courseId: number;
  currentSection = 1;
  status = 'not-available';
  totalBooking$: Observable<any>;
  availableTutors$: Observable<any>;
  tutorAvailability$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  showSuccessModal$: Observable<boolean>;
  reassigningTutor$: Observable<boolean>;
  loadingTotalBooking$: Observable<boolean>;
  isLoadingAvailableTutors$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showReassigningTutorSelectionModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  onOpenBookingModal(id: number): void {
    const bookingType = 'subject';
    this._store.dispatch(
      fromCore.loadAdminStudentTotalBooking({ id, bookingType })
    );
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onOpenReassigningTutorSelectionModal(id: number) {
    this.courseId = id;
    this._store.dispatch(fromCore.loadAvailableTutors({ id }));
    this._store.dispatch(
      fromAdminAction.openAdminReassigningTutorSelectionModal()
    );
  }

  onReassignTutor(teacher_id: any): void {
    const body = { teacher_id, id: this.courseId };
    this._store.dispatch(fromCore.studentReassignTutor({ body }));
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseReassigningTutorSelectionModal() {
    this._store.dispatch(
      fromAdminAction.closeAdminReassigningTutorSelectionModal()
    );
  }

  onChangeTutorStatus({ id, status }: { id: number; status: string }): void {
    this._store.dispatch(
      fromCore.adminChangeTutorAvailabilityStatus({ id, status })
    );
  }

  onCloseSuccessModal(): void {
    this._store.dispatch(fromAdminAction.closeSuccessModal());
  }

  onChangeTab(tab: any): void {
    this.currentSection = tab;

    switch (tab) {
      case 1:
        this.status = 'not-available';
        break;
      case 2:
        this.status = 'declined';
        break;
      case 3:
        this.status = 'cancelled';
        break;
      case 4:
        this.status = 'running';
        break;
    }

    this._store.dispatch(
      fromCore.loadAdminTutorReAssignment({
        params: { page: 1, search: '', status: this.status },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminTutorReAssignment({
        params: { page, search: '', status: this.status },
      })
    );
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadAdminTutorReAssignment({
        params: { page: 1, search, status: this.status },
      })
    );
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminTutorReAssignment({
        params: { page: 1, search: '', status: this.status },
      })
    );

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.loadingTotalBooking$ = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.reassigningTutor$ = this._store.select(
      fromCore.selectIsReassigningTutor
    );

    this.showSuccessModal$ = this._store.select(
      fromAdmin.selectShowSuccessModal
    );

    this.showReassigningTutorSelectionModal$ = this._store.select(
      fromAdmin.selectReassigningTutorSelectionModal
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

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminTutorReAssignment),
      this._store.select(fromCore.selectIsLoadingAdminTutorReAssignment),
    ]).pipe(
      map(([reAssignment, loading]) => ({
        reAssignment,
        loading,
      }))
    );
  }
}
