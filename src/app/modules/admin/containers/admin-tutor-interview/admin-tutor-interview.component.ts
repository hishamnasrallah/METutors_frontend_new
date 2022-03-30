import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { InterviewStatus } from '@metutor/config';
import * as fromAdmin from '@metutor/modules/admin/state';
import { IInterview, IInterviewFilters } from '@metutor/core/models';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-interview',
  templateUrl: './admin-tutor-interview.component.html',
  styleUrls: ['./admin-tutor-interview.component.scss'],
})
export class AdminTutorInterviewComponent implements OnInit {
  isLoading$: Observable<boolean>;
  interviews$: Observable<IInterview[] | null>;
  showSendMeetingLinkModal$: Observable<boolean>;

  title: string;
  status: string;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareInterviews();
    this.showSendMeetingLinkModal$ = this._store.select(
      fromAdmin.selectIsSendMeetingLinkModal
    );
  }

  filterInterviews(filters: IInterviewFilters): void {
    this.interviews$ = this._store.select(fromCore.selectFilteredInterviews, {
      ...filters,
    });
  }

  onChangeTab(event: any): void {
    if (event.index === 0) {
      this.status = InterviewStatus.pending;
      this.filterInterviews({
        status: InterviewStatus.pending,
        title: this.title,
      });
    } else if (event.index === 1) {
      this.status = InterviewStatus.approved;
      this.filterInterviews({
        status: InterviewStatus.approved,
        title: this.title,
      });
    } else if (event.index === 2) {
      this.status = InterviewStatus.rejected;
      this.filterInterviews({
        status: InterviewStatus.rejected,
        title: this.title,
      });
    }
  }

  onChangeSelection(): void {
    this.filterInterviews({
      title: this.title,
      status: this.status,
    });
  }

  onOpenSendMeetingLinkModal() {
    this._store.dispatch(fromAdminAction.openAdminSendMeetingLinkModal());
  }

  onCloseSendMeetingLinkModal() {
    this._store.dispatch(fromAdminAction.closeAdminSendMeetingLinkModal());
  }

  private _prepareInterviews(): void {
    this.status = InterviewStatus.pending;
    this._store.dispatch(fromCore.loadInterviews());
    this.filterInterviews({ status: InterviewStatus.pending });
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingInterviews);
  }
}
