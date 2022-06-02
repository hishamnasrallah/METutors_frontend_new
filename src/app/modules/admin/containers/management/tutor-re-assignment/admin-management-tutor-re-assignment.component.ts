import { Store } from '@ngrx/store';
import { CourseStatus } from '@config';
import { ITutorFilters } from '@models';
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

  courseId: number;
  currentSection = 1;
  totalBooking$: Observable<any>;
  availableTutors$: Observable<any>;
  tutorAvailability$: Observable<any>;
  openBookingModal$: Observable<boolean>;
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

  onOpenReassigningTutorSelectionModal(courseId: number) {
    this.courseId = courseId;
    this._store.dispatch(fromCore.loadAvailableTutors({ courseId }));
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

  onChangeTab(tab: any): void {
    this.currentSection = tab;

    let status = 'not-available';
    switch (tab) {
      case 1:
        status = 'not-available';
        break;
      case 2:
        status = 'declined';
        break;
      case 3:
        status = 'cancelled';
        break;
      case 4:
        status = 'running';
        break;
    }

    this._store.dispatch(fromCore.loadAdminTutorReAssignment({ status }));
  }

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadAdminTutorReAssignment({ status: 'not-available' })
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

  filterTutors(filters: ITutorFilters): void {
    // this.tutors$ = this._store.select(fromCore.selectFilteredPendingTutors, {
    //   ...filters,
    // });
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }
}
