import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

import { InterviewStatus } from '@config';
import * as fromAdmin from '@metutor/modules/admin/state';
import { IInterview, IInterviewFilters, IPagination } from '@models';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';
import { selectInterviews } from '@metutor/core/state/reducers/interview.reducer';

@Component({
  selector: 'metutors-interview',
  templateUrl: './admin-tutor-interview.component.html',
  styleUrls: ['./admin-tutor-interview.component.scss'],
})
export class AdminTutorInterviewComponent implements OnInit {
  interviewId: number;
  isLoading$: Observable<boolean>;
  pagination$: Observable<any>;
  isSchedulingRequest$: Observable<boolean>;
  interviews$: Observable<IInterview[] | null>;
  showScheduleInterviewModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    pagination: IPagination;
    interviews: IInterview[] | null;
  }>;

  perPage = 10;
  status = '';
  title: string;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.showScheduleInterviewModal$ = this._store.select(
      fromAdmin.selectScheduleInterviewModal
    );

    this.isSchedulingRequest$ = this._store.select(
      fromCore.selectIsSchedulingInterview
    );

    this._store.dispatch(
      fromCore.loadInterviews({ params: { page: 1, status: '' } })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectInterviews),
      this._store.select(fromCore.selectIsLoadingInterviews),
      this._store.select(fromCore.selectInterviewPagination),
    ]).pipe(
      map(([interviews, loading, pagination]) => ({
        loading,
        interviews,
        pagination,
      }))
    );
  }

  filterInterviews(filters: IInterviewFilters): void {
    /* this.interviews$ = this._store.select(fromCore.selectFilteredInterviews, {
      ...filters,
    });*/
  }

  onChangeTab(event: any): void {
    if (event.index === 0) {
      this.status = '';
      this.onPageChange({ page: 1 });
    } else if (event.index === 1) {
      this.status = InterviewStatus.approved;
      this.onPageChange({ page: 1 });
    } else if (event.index === 2) {
      this.status = InterviewStatus.rejected;
      this.onPageChange({ page: 1 });
    }
  }

  onChangeSelection(): void {
    this.filterInterviews({
      title: this.title,
      status: this.status,
    });
  }

  onOpenScheduleInterviewModal(data: any) {
    if (data.joinInterview) {
      const interviewId = data.id;
      this._store.dispatch(fromCore.joinInterview({ interviewId }));
    } else {
      this.interviewId = data.id;
      this._store.dispatch(fromAdminAction.openAdminScheduleInterviewModal());
    }
  }

  onCloseScheduleInterviewModal() {
    this._store.dispatch(fromAdminAction.closeAdminScheduleInterviewModal());
  }

  scheduleInterviewRequest(body: any): void {
    const interviewId = this.interviewId;
    this._store.dispatch(
      fromCore.scheduleInterviewRequest({ interviewId, body })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadInterviews({ params: { page, status: this.status } })
    );
  }

  /*  private _prepareInterviews(): void {
    this.status = InterviewStatus.pending;
    this._store.dispatch(fromCore.loadInterviews({ params: { page: 1 } }));
    this.filterInterviews({ status: InterviewStatus.pending });
    this.interviews$ = this._store.select(fromCore.selectInterviews);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingInterviews);
    this.pagination$ = this._store.select(fromCore.selectInterviewPagination);
  }*/
}
