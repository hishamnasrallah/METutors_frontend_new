import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

import { ITutor, ISubject, ICapacity, ICapacityFilters } from '@models';

@Component({
  selector: 'metutors-workforce',
  templateUrl: './admin-workforce-capacity.component.html',
  styleUrls: ['./admin-workforce-capacity.component.scss'],
})
export class AdminWorkforceCapacityComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutorAvailability$: Observable<any>;
  adminTutorsList$: Observable<ITutor[]>;
  capacity$: Observable<ICapacity[] | null>;
  isLoadingAdminTutors: Observable<boolean>;
  courseBooking$: Observable<ISubject | null>;
  isLoadingCourseBooking$: Observable<boolean>;
  showAdminTutorsListModal: Observable<boolean>;
  showCourseBookingListModal$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;

  name: string;
  tutorType: string;
  modalHeading: string;
  selectedCapacity: number;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCapacity();

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
  }

  onBack(): void {
    this.modalHeading =
      this.tutorType === 'hired' ? 'Hired Tutors' : 'Available Tutors';
  }

  filterCapacity(filters: ICapacityFilters): void {
    this.capacity$ = this._store.select(
      fromCore.selectFilteredWorkforceCapacity,
      {
        ...filters,
      }
    );
  }

  onFilterCapacity(): void {
    this.filterCapacity({
      name: this.name,
    });
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

  private _prepareCapacity(): void {
    this._store.dispatch(fromCore.loadWorkforceCapacity());
    this.capacity$ = this._store.select(fromCore.selectWorkforceCapacity);
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingWorkforceCapacity
    );
  }
}