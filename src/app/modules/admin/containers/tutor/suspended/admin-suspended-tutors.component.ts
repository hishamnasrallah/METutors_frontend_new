import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-suspended',
  templateUrl: './admin-suspended-tutors.component.html',
  styleUrls: ['./admin-suspended-tutors.component.scss'],
})
export class AdminSuspendedTutorsComponent implements OnInit {
  tutorAvailability$: Observable<any>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    tutorCounts: any;
    tutors: ITutor[] | null;
  }>;

  perPage = 10;
  selectedTutor?: ITutor;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadSuspendedTutors({ params: { page: 1 } }));

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorsCounts),
      this._store.select(fromCore.selectSuspendedTutors),
      this._store.select(fromCore.selectIsLoadingSuspendedTutors),
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

  onPageChange({ page }: any): void {
    this._store.dispatch(fromCore.loadSuspendedTutors({ params: { page } }));
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadSuspendedTutors({
        params: { page: 1, search },
      })
    );
  }
}
