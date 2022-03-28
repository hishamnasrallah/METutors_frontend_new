import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-tutor-interview-attachment-modal',
  templateUrl: './admin-tutor-interview-attachment-modal.component.html',
  styleUrls: ['./admin-tutor-interview-attachment-modal.component.scss']
})
export class AdminTutorInterviewAttachmentModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
