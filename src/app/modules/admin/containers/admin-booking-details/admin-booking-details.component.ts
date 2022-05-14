import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-booking-details',
  templateUrl: './admin-booking-details.component.html',
  styleUrls: ['./admin-booking-details.component.scss'],
})
export class AdminBookingDetailsComponent implements OnInit {
  showStudentsFeedbackModal$: Observable<boolean>;

  rate = 4;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.showStudentsFeedbackModal$ = this._store.select(
      fromAdmin.selectStudentsFeedbackModal
    );
  }

  onOpenStudentsFeedbackModal() {
    this._store.dispatch(fromAdminAction.openAdminStudentsFeedbackModal());
  }

  onCloseStudentsFeedbackModal() {
    this._store.dispatch(fromAdminAction.closeAdminStudentsFeedbackModal());
  }
}
