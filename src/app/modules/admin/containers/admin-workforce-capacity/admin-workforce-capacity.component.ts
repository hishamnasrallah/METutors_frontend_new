import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ICapacity, ICapacityFilters, ISubject } from '@metutor/core/models';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-workforce-capacity',
  templateUrl: './admin-workforce-capacity.component.html',
  styleUrls: ['./admin-workforce-capacity.component.scss'],
})
export class AdminWorkforceCapacityComponent implements OnInit {
  isLoading$: Observable<boolean>;
  capacity$: Observable<ICapacity[] | null>;
  isLoadingCourseBooking$: Observable<boolean>;
  courseBooking$: Observable<ISubject | null>;
  showCourseBookingListModal$: Observable<boolean>;

  name: string;
  selectedCapacity: number;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCapacity();

    this.showCourseBookingListModal$ = this._store.select(
      fromAdmin.selectCourseBookingListModal
    );

    this.courseBooking$ = this._store.select(fromCore.selectCourseBooking);
    this.isLoadingCourseBooking$ = this._store.select(
      fromCore.selectIsLoadingCourseBooking
    );
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

  onOpenCourseBookingListModal() {
    this._store.dispatch(fromAdminAction.openAdminCourseBookingListModal());
  }

  onCloseCourseBookingListModal() {
    this._store.dispatch(fromAdminAction.closeAdminCourseBookingListModal());
  }

  loadCourseBookingList(id: number): void {
    this._store.dispatch(fromCore.loadCourseBookingList({ id }));
  }

  private _prepareCapacity(): void {
    this._store.dispatch(fromCore.loadWorkforceCapacity());
    this.capacity$ = this._store.select(fromCore.selectWorkforceCapacity);
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingWorkforceCapacity
    );
  }
}
