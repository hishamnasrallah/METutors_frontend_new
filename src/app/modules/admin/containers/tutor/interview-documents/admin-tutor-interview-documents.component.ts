import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ITeacherDocument } from '@models';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-interview-documents',
  templateUrl: './admin-tutor-interview-documents.component.html',
  styleUrls: ['./admin-tutor-interview-documents.component.scss'],
})
export class AdminTutorInterviewDocumentsComponent implements OnInit {
  showInterviewAttachmentModal$: Observable<boolean>;

  isRejecting$: Observable<boolean>;
  isApproving$: Observable<boolean>;
  view$: Observable<{ documents: ITeacherDocument[]; loading: boolean }>;

  document: ITeacherDocument;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadAdminDocuments());
    this.showInterviewAttachmentModal$ = this._store.select(
      fromAdmin.selectIsInterviewAttachmentModal
    );

    this.isApproving$ = this._store.select(fromCore.selectIsApprovingAdminDocs);
    this.isRejecting$ = this._store.select(fromCore.selectIsRejectingAdminDocs);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminDocuments),
      this._store.select(fromCore.selectIsLoadingAdminDocuments),
    ]).pipe(map(([documents, loading]) => ({ loading, documents })));
  }

  onRejectDoc(): void {
    const id = this.document.id;
    this._store.dispatch(fromCore.adminRejectDocument({ id }));
  }

  onApproveDoc(): void {
    const id = this.document.id;
    this._store.dispatch(fromCore.adminApproveDocument({ id }));
  }

  onOpenInterviewAttachmentModal(document: ITeacherDocument) {
    this.document = document;
    this._store.dispatch(fromAdminAction.openAdminInterviewAttachmentModal());
  }

  onCloseInterviewAttachmentModal() {
    this._store.dispatch(fromAdminAction.closeAdminInterviewAttachmentModal());
  }
}
