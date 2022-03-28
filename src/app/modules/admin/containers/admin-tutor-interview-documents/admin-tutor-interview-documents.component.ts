import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-interview-documents',
  templateUrl: './admin-tutor-interview-documents.component.html',
  styleUrls: ['./admin-tutor-interview-documents.component.scss'],
})
export class AdminTutorInterviewDocumentsComponent implements OnInit {
  showInterviewAttachmentModal$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.showInterviewAttachmentModal$ = this._store.select(
      fromAdmin.selectIsInterviewAttachmentModal
    );
  }

  onOpenInterviewAttachmentModal() {
    this._store.dispatch(fromAdminAction.openAdminInterviewAttachmentModal());
  }

  onCloseInterviewAttachmentModal() {
    this._store.dispatch(fromAdminAction.closeAdminInterviewAttachmentModal());
  }
}
