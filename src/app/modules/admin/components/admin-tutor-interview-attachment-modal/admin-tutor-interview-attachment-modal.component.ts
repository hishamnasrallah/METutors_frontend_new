import { ViewerType } from 'ngx-doc-viewer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'metutors-admin-tutor-interview-attachment-modal',
  templateUrl: './admin-tutor-interview-attachment-modal.component.html',
  styleUrls: ['./admin-tutor-interview-attachment-modal.component.scss'],
})
export class AdminTutorInterviewAttachmentModalComponent implements OnInit {
  @Input() docId: number;
  @Input() docUrl: string;
  @Input() showModal = false;
  @Input() isRejecting = false;
  @Input() isApproving = false;
  @Input() viewer: ViewerType = 'url';

  @Output() rejectDoc: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() approveDoc: EventEmitter<void> = new EventEmitter<void>();

  filePath = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
