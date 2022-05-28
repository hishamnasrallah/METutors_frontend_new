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
  showChangeStatusModal$: Observable<boolean>;

  view$: Observable<{
    loading: boolean;
    testimonials: any;
  }>;

  status: string;
  statusList = testimonialStatus;
  heading = 'Share testimonial with public or keep it private?';

  constructor(private _store: Store<any>) {}

  onButtonClicked(data: any): void {
    if (data.type === 'change') {
      this.status = data.status;
      this.onOpenChangeStatusModal();
    }
  }

  onOpenChangeStatusModal() {
    this._store.dispatch(fromAdminAction.openAdminChangeStatusModal());
  }

  onCloseChangeStatusModal() {
    this._store.dispatch(fromAdminAction.closeAdminChangeStatusModal());
  }

  onChangeTab(tab: any): void {
    const feedbackBy = tab.index === 0 ? 'teacher' : 'student';
    this._store.dispatch(fromCore.loadAdminTestimonials({ feedbackBy }));
  }

  onUpdateStatus(status: string): void {
    console.log(status);
  }

  ngOnInit(): void {
    const feedbackBy = 'teacher';
    this._store.dispatch(fromCore.loadAdminTestimonials({ feedbackBy }));

    this.isChangingStatus$ = this._store.select(fromCore.selectIsLoadingAdmin);

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
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
