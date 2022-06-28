import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TUTOR_STATUSES_CONST } from '@config';
import { ITutor, ITutorFilters } from '@models';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-pending',
  templateUrl: './admin-pending-tutors.component.html',
  styleUrls: ['./admin-pending-tutors.component.scss'],
})
export class AdminPendingTutorsComponent implements OnInit {
  tutorsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  tutorAvailability$: Observable<any>;
  pendingTutors$: Observable<ITutor[] | null>;
  rejectedTutors$: Observable<ITutor[] | null>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  name: string;
  selectedIndex: number;
  selectedTutor?: ITutor;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );
  }

  onOpenTeacherAvailabilityModal(id: number): void {
    this._store.dispatch(fromAdminAction.openAdminTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTeacherAvailabilityModal());
  }

  filterTutors(filters: ITutorFilters): void {
    if (this.selectedIndex === 0) {
      this.pendingTutors$ = this._store.select(
        fromCore.selectFilteredPendingTutors,
        {
          ...filters,
        }
      );
    } else {
      this.rejectedTutors$ = this._store.select(
        fromCore.selectFilteredRejectedTutors,
        {
          ...filters,
        }
      );
    }
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  onChangeTab(event: any): void {
    this.name = '';
    this.selectedIndex = event.index;
    this.pendingTutors$ = this._store.select(fromCore.selectPendingTutors);
    this.rejectedTutors$ = this._store.select(fromCore.selectRejectedTutors);
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadPendingTutors());
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
    this.pendingTutors$ = this._store.select(fromCore.selectPendingTutors);
    this.rejectedTutors$ = this._store.select(fromCore.selectRejectedTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingPendingTutors);
  }
}
