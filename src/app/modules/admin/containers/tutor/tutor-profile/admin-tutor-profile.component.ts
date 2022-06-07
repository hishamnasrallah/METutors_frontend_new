import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IInterview } from '@models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { generalConstants, InterviewStatus } from '@config';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-profile',
  templateUrl: './admin-tutor-profile.component.html',
  styleUrls: ['./admin-tutor-profile.component.scss'],
})
export class AdminTutorProfileComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutorAvailability$: Observable<any>;
  interview$: Observable<IInterview | null>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  interviewStatus = InterviewStatus;
  data: { date: string; time: string };
  nationalId = generalConstants.nationalId;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareInterview();

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromAdminAction.openAdminTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTeacherAvailabilityModal());
  }

  private _prepareInterview(): void {
    this._store.dispatch(fromCore.loadInterview({}));
    this.interview$ = this._store.select(fromCore.selectInterview);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingInterview);
  }
}
