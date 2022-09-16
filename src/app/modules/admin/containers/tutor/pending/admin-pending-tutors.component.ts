import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-pending',
  templateUrl: './admin-pending-tutors.component.html',
  styleUrls: ['./admin-pending-tutors.component.scss'],
})
export class AdminPendingTutorsComponent implements OnInit {
  tutorAvailability$: Observable<any>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    tutorCounts: any;
    pendingTutors: any;
    rejectedTutors: any;
  }>;

  status = '';
  perPage = 10;
  selectedIndex: number;
  selectedTutor?: ITutor;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;

    this._store.dispatch(fromCore.loadPendingTutors({ params: { page: 1 } }));

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorsCounts),
      this._store.select(fromCore.selectPendingTutors),
      this._store.select(fromCore.selectRejectedTutors),
      this._store.select(fromCore.selectIsLoadingPendingTutors),
    ]).pipe(
      map(([tutorCounts, pendingTutors, rejectedTutors, loading]) => ({
        loading,
        tutorCounts,
        pendingTutors,
        rejectedTutors,
      }))
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(fromCore.loadPendingTutors({ params: { page } }));
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadPendingTutors({
        params: { page: 1, search },
      })
    );
  }
}
