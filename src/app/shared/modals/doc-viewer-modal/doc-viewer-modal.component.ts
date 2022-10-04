import { ViewerType } from 'ngx-doc-viewer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { dataURLtoFile } from '@config';
import { ITeacherDocument } from '@models';

@Component({
  selector: 'metutors-doc-viewer-modal',
  templateUrl: './doc-viewer-modal.component.html',
  styleUrls: ['./doc-viewer-modal.component.scss'],
})
export class DocViewerModalComponent implements OnInit {
  @Input() heading = '';
  @Input() showModal = false;
  @Input() showActions = false;
  @Input() isRejecting = false;
  @Input() isApproving = false;
  @Input() showSignature = false;
  @Input() addingSignature = false;
  @Input() document: ITeacherDocument | any;

  @Input() set signatureInfo(signature: any) {
    this.addedSignature = signature;
  }

  @Output() rejectDoc: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() approveDoc: EventEmitter<void> = new EventEmitter<void>();
  @Output() addSignature: EventEmitter<any> = new EventEmitter<any>();
  @Output() submit: EventEmitter<string> = new EventEmitter<string>();

  checked = true;
  addedSignature: any;
  showSignatureCanvas = false;

  constructor() {}

  insertedSignature(signature: string): void {
    this.addSignature.emit(dataURLtoFile(signature, 'signature.png'));
  }

  getViewer(filename: string): ViewerType {
    let ext = filename.split('.').pop();
    ext = ext?.toLowerCase();

    if (ext === 'pdf') {
      return 'pdf';
    } else if (
      ext === 'xlsx' ||
      ext === 'xls' ||
      ext === 'ppt' ||
      ext === 'pptx' ||
      ext === 'docx'
    ) {
      return 'office';
    }

    return 'url';
  }

  ngOnInit(): void {}
}
