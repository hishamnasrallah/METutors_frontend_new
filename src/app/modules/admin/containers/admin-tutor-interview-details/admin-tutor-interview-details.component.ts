import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-interview-details',
  templateUrl: './admin-tutor-interview-details.component.html',
  styleUrls: ['./admin-tutor-interview-details.component.scss'],
})
export class AdminTutorInterviewDetailsComponent implements OnInit {
  showSendMeetingLinkModal$: Observable<boolean>;
  showHourlyRatePerSubjectModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
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
}
