import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ITutor, ISubject, ICapacity, IPagination } from '@models';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-workforce',
  templateUrl: './admin-workforce-capacity.component.html',
  styleUrls: ['./admin-workforce-capacity.component.scss'],
})
export class AdminWorkforceCapacityComponent implements OnInit {
  tutorAvailability$: Observable<any>;
  adminTutorsList$: Observable<ITutor[]>;
  isLoadingAdminTutors: Observable<boolean>;
  courseBooking$: Observable<ISubject | null>;
  isLoadingCourseBooking$: Observable<boolean>;
  showAdminTutorsListModal: Observable<boolean>;
  showCourseBookingListModal$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;

  perPage = 10;
  tutorType: string;
  modalHeading: string;
  selectedCapacity: number;

  view$: Observable<{
    loading: boolean;
    pagination: IPagination;
    capacity: ICapacity[] | null;
  }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(
      fromCore.loadWorkforceCapacity({ params: { page: 1, search: '' } })
    );

    this.showCourseBookingListModal$ = this._store.select(
      fromAdmin.selectCourseBookingListModal
    );

    this.isLoadingAdminTutors = this._store.select(
      fromCore.selectIsLoadingAdminTutors
    );

    this.showAdminTutorsListModal = this._store.select(
      fromAdmin.selectShowAdminTutorsListModal
    );

    this.adminTutorsList$ = this._store.select(fromCore.selectAdminTutors);

    this.courseBooking$ = this._store.select(fromCore.selectCourseBooking);
    this.isLoadingCourseBooking$ = this._store.select(
      fromCore.selectIsLoadingCourseBooking
    );

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminPagination),
      this._store.select(fromCore.selectWorkforceCapacity),
      this._store.select(fromCore.selectIsLoadingWorkforceCapacity),
    ]).pipe(
      map(([pagination, capacity, loading]) => ({
        loading,
        capacity,
        pagination,
      }))
    );
  }

  onBack(): void {
    this.modalHeading =
      this.tutorType === 'hired' ? 'Hired Tutors' : 'Available Tutors';
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadWorkforceCapacity({
        params: { page: 1, search },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadWorkforceCapacity({ params: { page, search: '' } })
    );
  }

  onOpenCourseBookingListModal(id: number) {
    this._store.dispatch(fromCore.loadCourseBookingList({ id }));
    this._store.dispatch(fromAdminAction.openAdminCourseBookingListModal());
  }

  onCloseCourseBookingListModal() {
    this._store.dispatch(fromAdminAction.closeAdminCourseBookingListModal());
  }

  onShowHiredTutors(tutorsCount: number, id: number): void {
    if (tutorsCount > 0) {
      this.tutorType = 'hired';
      this.modalHeading = 'Hired Tutors';
      const tutorType = 'hired-teachers';
      this._store.dispatch(
        fromAdminAction.openAdminTutorListModal({ id, tutorType })
      );
    }
  }

  onShowAvailableTutors(tutorsCount: number, id: number): void {
    if (tutorsCount > 0) {
      this.tutorType = 'available';
      this.modalHeading = 'Available Tutors';
      const tutorType = 'available-teachers';
      this._store.dispatch(
        fromAdminAction.openAdminTutorListModal({ id, tutorType })
      );
    }
  }

  onCloseAdminTutorsListModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTutorListModal());
  }

  onTutorAvailability(id: number): void {
    this.modalHeading = "Tutor's Availability";
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }
}
