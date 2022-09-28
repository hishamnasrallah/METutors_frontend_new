import { ViewerType } from 'ngx-doc-viewer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITeacherDocument } from '@models';

@Component({
  selector: 'metutors-doc-viewer-modal',
  templateUrl: './doc-viewer-modal.component.html',
  styleUrls: ['./doc-viewer-modal.component.scss'],
})
export class DocViewerModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() showActions = false;
  @Input() isRejecting = false;
  @Input() isApproving = false;
  @Input() showSignature = false;
  @Input() document: ITeacherDocument;

  @Output() rejectDoc: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() approveDoc: EventEmitter<void> = new EventEmitter<void>();
  @Output() addSignature: EventEmitter<void> = new EventEmitter<void>();

  checked = true;
  constructor() {}

  getViewer(filename: string): ViewerType {
    let ext = filename.split('.').pop();
    ext = ext?.toLowerCase();

    if (ext === 'pdf') {
      return 'pdf';
    } else if (ext === 'xlsx' || ext === 'ppt' || ext === 'docx') {
      return 'office';
    }

    return 'url';
  }

  ngOnInit(): void {}
}
