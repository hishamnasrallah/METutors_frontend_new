import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ITutor, ITutorFilters } from '@metutor/core/models';
import { TutorStatus, TUTOR_STATUSES_CONST } from '@metutor/config';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-list',
  templateUrl: './admin-tutor-list.component.html',
  styleUrls: ['./admin-tutor-list.component.scss'],
})
export class AdminTutorListComponent implements OnInit {
  tutorsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;
  showChangeStatusModal$: Observable<boolean>;

  name: string;
  selectedTutor?: ITutor;
  tutorStatus = TutorStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );
  }

  onOpenChangeStatusModal() {
    this._store.dispatch(fromAdminAction.openAdminChangeStatusModal());
  }

  onCloseChangeStatusModal() {
    this._store.dispatch(fromAdminAction.closeAdminChangeStatusModal());
  }

  filterTutors(filters: ITutorFilters): void {
    this.tutors$ = this._store.select(fromCore.selectFilteredTutors, {
      ...filters,
    });
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadTutors());
    this.tutors$ = this._store.select(fromCore.selectTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTutors);
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
  }
}
