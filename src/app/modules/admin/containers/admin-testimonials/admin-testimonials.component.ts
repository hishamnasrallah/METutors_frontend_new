import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { testimonialStatus } from '@config';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-testimonials',
  templateUrl: './admin-testimonials.component.html',
  styleUrls: ['./admin-testimonials.component.scss'],
})
export class AdminTestimonialsComponent implements OnInit {
  isChangingStatus$: Observable<boolean>;
  showEditFeedbackModal$: Observable<boolean>;
  showChangeStatusModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    testimonials: any;
  }>;

  status: string;
  userId: number;
  statusList = testimonialStatus;
  heading = 'Share testimonial with public or keep it private?';

  constructor(private _store: Store<any>) {}

  onButtonClicked(data: any): void {
    if (data.type === 'change') {
      this.userId = data.id;
      this.status = data.status;
      this.onOpenChangeStatusModal();
    } else if (data.type === 'edit') {
      this.onOpenEditFeedbackModal();
    }
  }

  onOpenChangeStatusModal() {
    this._store.dispatch(fromAdminAction.openAdminChangeStatusModal());
  }

  onOpenEditFeedbackModal() {
    this._store.dispatch(fromAdminAction.openAdminEditFeedbackModal());
  }

  onCloseModals() {
    this._store.dispatch(fromAdminAction.closeAdminChangeStatusModal());
    this._store.dispatch(fromAdminAction.closeAdminEditFeedbackModal());
  }

  onChangeTab(tab: any): void {
    const feedbackBy = tab.index === 0 ? 'teacher' : 'student';
    this._store.dispatch(fromCore.loadAdminTestimonials({ feedbackBy }));
  }

  onUpdateStatus(status: string): void {
    const data = {
      status,
      id: this.userId,
    };

    this._store.dispatch(fromCore.adminEditTestimonialStatus(data));
  }

  ngOnInit(): void {
    const feedbackBy = 'teacher';
    this._store.dispatch(fromCore.loadAdminTestimonials({ feedbackBy }));

    this.isChangingStatus$ = this._store.select(
      fromCore.selectIsChangingTestimonialStatus
    );

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );

    this.showEditFeedbackModal$ = this._store.select(
      fromAdmin.selectAdminEditFeedbackModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingAdmin),
      this._store.select(fromCore.selectAdminTestimonials),
    ]).pipe(
      map(([loading, testimonials]) => ({
        loading,
        testimonials,
      }))
    );
  }
}
