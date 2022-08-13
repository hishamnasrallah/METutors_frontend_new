import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';
import { TutorStatus, InterviewStatus, TUTOR_STATUSES_CONST } from '@config';

@Component({
  selector: 'metutors-current',
  templateUrl: './admin-current-tutors.component.html',
  styleUrls: ['./admin-current-tutors.component.scss'],
})
export class AdminCurrentTutorsComponent implements OnInit {
  tutorAvailability$: Observable<any>;
  isChangeTutorStatus$: Observable<boolean>;
  showChangeStatusModal$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;

  totalBooking$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  status = '';
  perPage = 10;
  changeStatus: any;
  selectedIndex: number;
  selectedTutor?: ITutor;
  tutorStatus = TutorStatus;
  interviewStatus = InterviewStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  view$: Observable<{
    loading: boolean;
    tutorCounts: any;
    tutors: ITutor[] | null;
  }>;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;

    this.onChangeTab({ index: +this.selectedIndex });

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );

    this.loadingTotalBooking = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.isChangeTutorStatus$ = this._store.select(
      fromCore.selectIsChangeTutorStatus
    );

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorsCounts),
      this._store.select(fromCore.selectCurrentTutors),
      this._store.select(fromCore.selectIsLoadingCurrentTutors),
    ]).pipe(
      map(([tutorCounts, tutors, loading]) => ({
        tutors,
        loading,
        tutorCounts,
      }))
    );
  }

  onOpenTeacherAvailabilityModal(id: number): void {
    this._store.dispatch(fromAdminAction.openAdminTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTeacherAvailabilityModal());
  }

  onOpenBookingModal(id: number): void {
    const bookingType = 'teacher';
    this._store.dispatch(
      fromCore.loadAdminStudentTotalBooking({ id, bookingType })
    );
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onOpenChangeStatusModal(changeStatus: any, selectedTutor: ITutor) {
    this.changeStatus = changeStatus;
    this.selectedTutor = selectedTutor;
    this._store.dispatch(fromAdminAction.openAdminChangeStatusModal());
  }

  onCloseChangeStatusModal() {
    this._store.dispatch(fromAdminAction.closeAdminChangeStatusModal());
  }

  onChangeTutorStatus({ tutorId, status, reason }: any): void {
    status = status === 'suspend' ? 'suspended' : status;

    this._store.dispatch(
      fromCore.changeTutorStatus({ tutorId, status, reason })
    );
  }

  onChangeTab(tab: any): void {
    console.log(tab);
    switch (tab.index) {
      case 0:
        this.status = '';
        this.onPageChange({ page: 1 });
        break;
      case 1:
        this.status = TutorStatus.active;
        this.onPageChange({ page: 1 });
        break;
      case 2:
        this.status = TutorStatus.deactive;
        this.onPageChange({ page: 1 });
        break;
    }
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadCurrentTutors({ params: { page, status: this.status } })
    );
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadCurrentTutors({
        params: { page: 1, search, status: this.status },
      })
    );
  }
}
