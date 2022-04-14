import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { IInterview } from '@metutor/core/models';
import { generalConstants, InterviewStatus } from '@metutor/config';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';
import { selectIsSchedulingInterview } from '@metutor/core/state';

@Component({
  selector: 'metutors-admin-tutor-interview-details',
  templateUrl: './admin-tutor-interview-details.component.html',
  styleUrls: ['./admin-tutor-interview-details.component.scss'],
})
export class AdminTutorInterviewDetailsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isDeclineRequest$: Observable<boolean>;
  isAcceptingRequest$: Observable<boolean>;
  isJoiningInterview$: Observable<boolean>;
  isSchedulingRequest$: Observable<boolean>;
  interview$: Observable<IInterview | null>;
  showDeclineRequestModal$: Observable<boolean>;
  showScheduleInterviewModal$: Observable<boolean>;
  showHourlyRatePerSubjectModal$: Observable<boolean>;

  interviewStatus = InterviewStatus;
  data: { date: string; time: string };
  nationalId = generalConstants.nationalId;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareInterview();
    this.showScheduleInterviewModal$ = this._store.select(
      fromAdmin.selectScheduleInterviewModal
    );

    this.showHourlyRatePerSubjectModal$ = this._store.select(
      fromAdmin.selectIsHourlyRatePerSubjectModal
    );

    this.isAcceptingRequest$ = this._store.select(
      fromCore.selectIsAcceptingInterview
    );

    this.showDeclineRequestModal$ = this._store.select(
      fromAdmin.selectIsDeclineInterviewModal
    );

    this.isDeclineRequest$ = this._store.select(
      fromCore.selectIsDeclineInterview
    );

    this.isSchedulingRequest$ = this._store.select(
      fromCore.selectIsSchedulingInterview
    );

    this.isJoiningInterview$ = this._store.select(
      fromCore.selectIsJoiningInterview
    );
  }

  onOpenScheduleInterviewModal(interview: any) {
    this.data = {
      date: interview.interviewDate,
      time: interview.interviewTime,
    };
    this._store.dispatch(fromAdminAction.openAdminScheduleInterviewModal());
  }

  onCloseScheduleInterviewModal() {
    this._store.dispatch(fromAdminAction.closeAdminScheduleInterviewModal());
  }

  onOpenHourlyRatePerSubjectModal() {
    this._store.dispatch(fromAdminAction.openAdminHourlyRatePerSubjectModal());
  }

  onCloseHourlyRatePerSubjectModal() {
    this._store.dispatch(fromAdminAction.closeAdminHourlyRatePerSubjectModal());
  }

  onOpenDeclineInterviewModal() {
    this._store.dispatch(fromAdminAction.openAdminDeclineInterviewModal());
  }

  onCloseDeclineRequestModal() {
    this._store.dispatch(fromAdminAction.closeAdminDeclineInterviewModal());
  }

  acceptInterviewRequest(form: FormGroup, interviewId: number): void {
    if (form.valid) {
      this._store.dispatch(
        fromCore.acceptInterviewRequest({ id: interviewId, body: form.value })
      );
    }
  }

  declineInterviewRequest(form: FormGroup, interviewId: number): void {
    if (form.valid) {
      this._store.dispatch(
        fromCore.declineInterviewRequest({ id: interviewId, body: form.value })
      );
    }
  }

  scheduleInterviewRequest(form: FormGroup): void {
    const body = form.value;
    this._store.dispatch(fromCore.scheduleInterviewRequest({ body }));
  }

  joinInterview(): void {
    this._store.dispatch(fromCore.joinInterview());
  }

  private _prepareInterview(): void {
    this._store.dispatch(fromCore.loadInterview({}));
    this.interview$ = this._store.select(fromCore.selectInterview);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingInterview);
  }
}
