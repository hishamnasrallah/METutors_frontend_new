import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { IInterview } from '@metutor/core/models';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-interview-details',
  templateUrl: './admin-tutor-interview-details.component.html',
  styleUrls: ['./admin-tutor-interview-details.component.scss'],
})
export class AdminTutorInterviewDetailsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  interview$: Observable<IInterview | null>;
  showSendMeetingLinkModal$: Observable<boolean>;
  showHourlyRatePerSubjectModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareInterview();
    this.showSendMeetingLinkModal$ = this._store.select(
      fromAdmin.selectIsSendMeetingLinkModal
    );

    this.showHourlyRatePerSubjectModal$ = this._store.select(
      fromAdmin.selectIsHourlyRatePerSubjectModal
    );
  }

  onOpenSendMeetingLinkModal() {
    this._store.dispatch(fromAdminAction.openAdminSendMeetingLinkModal());
  }

  onCloseSendMeetingLinkModal() {
    this._store.dispatch(fromAdminAction.closeAdminSendMeetingLinkModal());
  }

  onOpenHourlyRatePerSubjectModal() {
    this._store.dispatch(fromAdminAction.openAdminHourlyRatePerSubjectModal());
  }

  onCloseHourlyRatePerSubjectModal() {
    this._store.dispatch(fromAdminAction.closeAdminHourlyRatePerSubjectModal());
  }

  private _prepareInterview(): void {
    this._store.dispatch(fromCore.loadInterview({}));
    this.interview$ = this._store.select(fromCore.selectInterview);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingInterview);
  }
}
