import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import * as fromAdmin from '@metutor/modules/admin/state';
import { ITutor, ITutorFilters } from '@metutor/core/models';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

import {
  TutorStatus,
  InterviewStatus,
  TUTOR_STATUSES_CONST,
} from '@metutor/config';

@Component({
  selector: 'metutors-admin-current-tutors',
  templateUrl: './admin-current-tutors.component.html',
  styleUrls: ['./admin-current-tutors.component.scss'],
})
export class AdminCurrentTutorsComponent implements OnInit {
  tutorsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;
  isChangeTutorStatus$: Observable<boolean>;
  activeTutors$: Observable<ITutor[] | null>;
  showChangeStatusModal$: Observable<boolean>;
  inActiveTutors$: Observable<ITutor[] | null>;

  totalBooking$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking: Observable<boolean>;

  name: string;
  changeStatus: any;
  selectedIndex: number;
  selectedTutor?: ITutor;
  tutorStatus = TutorStatus;
  interviewStatus = InterviewStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );

    this.loadingTotalBooking = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.isChangeTutorStatus$ = this._store.select(
      fromCore.selectIsChangeTutorStatus
    );

    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;
  }

  onOpenBookingModal(id: number): void {
    const bookingType = 'teacher';
    this._store.dispatch(
      fromCore.loadAdminStudentTotalBooking({ id, bookingType })
    );
    this._store.dispatch(fromAdminAction.openAdminStudentBookingModal());
  }

  onCloseBookingModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminStudentBookingModal());
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

  filterTutors(filters: ITutorFilters): void {
    if (this.selectedIndex === 0) {
      this.tutors$ = this._store.select(fromCore.selectFilteredCurrentTutors, {
        ...filters,
        status: undefined,
      });
    } else if (this.selectedIndex === 1) {
      this.activeTutors$ = this._store.select(
        fromCore.selectFilteredCurrentTutors,
        {
          ...filters,
          status: TutorStatus.active,
        }
      );
    } else if ((this.selectedIndex = 2)) {
      this.inActiveTutors$ = this._store.select(
        fromCore.selectFilteredCurrentTutors,
        {
          ...filters,
          status: TutorStatus.deactive,
        }
      );
    }
  }

  onChangeTab(event: any): void {
    this.name = '';
    this.selectedIndex = event.index;
    this.tutors$ = this._store.select(fromCore.selectCurrentTutors);
    this.activeTutors$ = this._store.select(fromCore.selectCurrentActiveTutors);
    this.inActiveTutors$ = this._store.select(
      fromCore.selectCurrentInactiveTutors
    );
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadCurrentTutors());
    this.tutors$ = this._store.select(fromCore.selectCurrentTutors);
    this.activeTutors$ = this._store.select(fromCore.selectCurrentActiveTutors);
    this.inActiveTutors$ = this._store.select(
      fromCore.selectCurrentInactiveTutors
    );
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingCurrentTutors);
  }
}
