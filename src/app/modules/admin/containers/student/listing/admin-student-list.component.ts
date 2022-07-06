import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { IPagination } from '@models';
import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

import { TutorStatus, StudentStatus, STUDENT_STATUSES_CONST } from '@config';

@Component({
  selector: 'metutors-listing',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss'],
})
export class AdminStudentListComponent implements OnInit {
  totalBooking$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking: Observable<boolean>;

  view$: Observable<{
    students: any;
    loading: boolean;
    pagination: IPagination;
  }>;

  status = '';
  perPage = 10;
  studentId: any;
  tutorStatus = TutorStatus;
  imageUrl = environment.imageURL;
  studentStatuses = STUDENT_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.loadingTotalBooking = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this._store.dispatch(
      fromCore.loadStudents({
        params: { page: 1, status: '' },
      })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudents),
      this._store.select(fromCore.selectIsLoadingStudents),
      this._store.select(fromCore.selectStudentPagination),
    ]).pipe(
      map(([students, loading, pagination]) => ({
        loading,
        students,
        pagination,
      }))
    );
  }

  onChangeTab(tab: any): void {
    switch (tab.index) {
      case 0:
        this.status = '';
        this.onPageChange({ page: 1 });
        break;
      case 1:
        this.status = StudentStatus.active;
        this.onPageChange({ page: 1 });
        break;
      case 2:
        this.status = StudentStatus.suspended;
        this.onPageChange({ page: 1 });
        break;
    }
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadStudents({
        params: { page: 1, search, status: this.status },
      })
    );
  }

  /*  filterStudents(filters: IStudentFilters): void {
    this.registeredStudents$ = this._store.select(
      fromCore.selectFilteredStudents,
      {
        ...filters,
      }
    );
  }*/

  onFilterStudents(): void {
    /*this.filterStudents({
      name: this.name,
    });*/
  }

  onOpenBookingModal(id: number): void {
    this._store.dispatch(fromCore.loadAdminStudentTotalBooking({ id }));
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadStudents({ params: { page, status: this.status } })
    );
  }

  private _prepareStudents(): void {
    /* this._store.dispatch(fromCore.loadStudents());
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingStudents);
    this.students$ = this._store.select(fromCore.selectStudents);
    this.registeredStudents$ = this._store
      .select(fromCore.selectStudents)
      .pipe(map((students: any) => students?.registeredStudents));*/
  }
}
