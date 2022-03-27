import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-interview',
  templateUrl: './admin-tutor-interview.component.html',
  styleUrls: ['./admin-tutor-interview.component.scss'],
})
export class AdminTutorInterviewComponent implements OnInit {
  showSendMeetingLinkModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.showSendMeetingLinkModal$ = this._store.select(
      fromAdmin.selectIsSendMeetingLinkModal
    );
  }

  onOpenSendMeetingLinkModal() {
    this._store.dispatch(fromAdminAction.openAdminSendMeetingLinkModal());
  }

  onCloseSendMeetingLinkModal() {
    this._store.dispatch(fromAdminAction.closeAdminSendMeetingLinkModal());
  }
}
