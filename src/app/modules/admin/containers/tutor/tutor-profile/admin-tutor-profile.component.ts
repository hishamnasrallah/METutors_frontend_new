import { ITutor } from '@models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-profile',
  templateUrl: './admin-tutor-profile.component.html',
  styleUrls: ['./admin-tutor-profile.component.scss'],
})
export class AdminTutorProfileComponent implements OnInit {
  totalBooking$: Observable<any>;
  isLoading$: Observable<boolean>;
  tutor$: Observable<ITutor | null>;
  tutorAvailability$: Observable<any>;
  openBookingModal$: Observable<boolean>;
  loadingTotalBooking$: Observable<boolean>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  nationalId = generalConstants.nationalId;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = +(res.get('id') || '');

      this._prepareTutor(id);
    });

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );

    this.openBookingModal$ = this._store.select(
      fromAdmin.selectAdminStudentBookingModal
    );

    this.totalBooking$ = this._store.select(
      fromCore.selectAdminStudentTotalBooking
    );

    this.loadingTotalBooking$ = this._store.select(
      fromCore.selectIsLoadingAdminBookingDetail
    );
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromAdminAction.openAdminTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTeacherAvailabilityModal());
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

  private _prepareTutor(id: number): void {
    this._store.dispatch(fromCore.loadAdminTutor({ id }));
    this.tutor$ = this._store.select(fromCore.selectTutor);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTutor);
  }
}
