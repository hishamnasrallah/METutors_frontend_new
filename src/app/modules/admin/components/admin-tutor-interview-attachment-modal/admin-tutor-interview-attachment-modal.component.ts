import { ViewerType } from 'ngx-doc-viewer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITeacherDocument } from '@models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'metutors-admin-tutor-interview-attachment-modal',
  templateUrl: './admin-tutor-interview-attachment-modal.component.html',
  styleUrls: ['./admin-tutor-interview-attachment-modal.component.scss'],
})
export class AdminTutorInterviewAttachmentModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() isRejecting = false;
  @Input() isApproving = false;
  @Input() document: ITeacherDocument;

  @Output() rejectDoc: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() approveDoc: EventEmitter<void> = new EventEmitter<void>();

  filePath = environment.teacherDocs;

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
