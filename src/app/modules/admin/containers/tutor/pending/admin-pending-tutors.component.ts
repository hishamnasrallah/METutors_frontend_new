import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-pending',
  templateUrl: './admin-pending-tutors.component.html',
  styleUrls: ['./admin-pending-tutors.component.scss'],
})
export class AdminPendingTutorsComponent implements OnInit {
  showViewRejectionReasonModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    tutorCounts: any;
    pendingTutors: any;
    rejectedTutors: any;
  }>;

  status = '';
  perPage = 10;
  selectedIndex: number;
  rejectionReason: string;
  selectedTutor?: ITutor | undefined;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;

    this._store.dispatch(fromCore.loadPendingTutors({ params: { page: 1 } }));

    this.showViewRejectionReasonModal$ = this._store.select(
      fromAdmin.selectShowViewRejectionReasonModal
    );

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

  onChangeTab(tab: any): void {
    this.selectedIndex = tab.index;
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(fromCore.loadPendingTutors({ params: { page } }));
  }

  onOpenViewReasonModal(): void {
    this._store.dispatch(fromAdminAction.openViewRejectionReasonModal());
  }

  onCloseViewReasonModal(): void {
    this._store.dispatch(fromAdminAction.closeViewRejectionReasonModal());
  }

  onSearch(search: string): void {
    this._store.dispatch(
      fromCore.loadPendingTutors({
        params: { page: 1, search },
      })
    );
  }
}
