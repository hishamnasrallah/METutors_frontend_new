import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { TutorStatus, TUTOR_STATUSES_CONST } from '@config';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-listing',
  templateUrl: './admin-tutor-list.component.html',
  styleUrls: ['./admin-tutor-list.component.scss'],
})
export class AdminTutorListComponent implements OnInit {
  tutorAvailability$: Observable<any>;
  isChangeTutorStatus$: Observable<boolean>;
  showChangeStatusModal$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  perPage = 10;
  currentPage = 1;
  changeStatus: any;
  selectedTutor?: ITutor;
  tutorStatus = TutorStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  view$: Observable<{
    loading: boolean;
    tutorCounts: any;
    tutors: ITutor[] | null;
  }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutors({ page: 1, search: '' }));

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );

    this.isChangeTutorStatus$ = this._store.select(
      fromCore.selectIsChangeTutorStatus
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutors),
      this._store.select(fromCore.selectTutorsCounts),
      this._store.select(fromCore.selectIsLoadingTutors),
    ]).pipe(
      map(([tutors, tutorCounts, loading]) => ({
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

  onOpenChangeStatusModal(changeStatus: any, selectedTutor: ITutor) {
    this.changeStatus = changeStatus;
    this.selectedTutor = selectedTutor;
    this._store.dispatch(fromAdminAction.openAdminChangeStatusModal());
  }

  onCloseChangeStatusModal() {
    this._store.dispatch(fromAdminAction.closeAdminChangeStatusModal());
  }

  onChangeTutorStatus({ tutorId, status, reason }: any): void {
    this._store.dispatch(
      fromCore.changeTutorStatus({ tutorId, status, reason })
    );
  }

  onPageChange({ page }: any): void {
    this.currentPage = page;
    this._store.dispatch(fromCore.loadTutors({ page, search: '' }));
  }

  onSearch(search: string): void {
    this._store.dispatch(fromCore.loadTutors({ page: 1, search }));
  }
}
