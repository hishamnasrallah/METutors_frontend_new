import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';

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
