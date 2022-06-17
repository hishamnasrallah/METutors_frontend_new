import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ITutor, ITutorFilters } from '@models';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { TutorStatus, TUTOR_STATUSES_CONST } from '@config';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-listing',
  templateUrl: './admin-tutor-list.component.html',
  styleUrls: ['./admin-tutor-list.component.scss'],
})
export class AdminTutorListComponent implements OnInit {
  tutorsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;
  isChangeTutorStatus$: Observable<boolean>;
  showChangeStatusModal$: Observable<boolean>;

  name: string;
  changeStatus: any;
  selectedTutor?: ITutor;
  tutorStatus = TutorStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );

    this.isChangeTutorStatus$ = this._store.select(
      fromCore.selectIsChangeTutorStatus
    );
  }

  onOpenChangeStatusModal(changeStatus: any, selectedTutor: ITutor) {
    this.changeStatus = changeStatus;
    this.selectedTutor = selectedTutor;
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

  onChangeTutorStatus({ tutorId, status, reason }: any): void {
    this._store.dispatch(
      fromCore.changeTutorStatus({ tutorId, status, reason })
    );
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadTutors());
    this.tutors$ = this._store.select(fromCore.selectTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTutors);
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
  }
}
