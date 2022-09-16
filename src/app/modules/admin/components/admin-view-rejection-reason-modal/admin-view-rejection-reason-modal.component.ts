import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ITutor } from '@models';

@Component({
  selector: 'metutors-admin-view-rejection-reason-modal',
  templateUrl: './admin-view-rejection-reason-modal.component.html',
  styleUrls: ['./admin-view-rejection-reason-modal.component.scss'],
})
export class AdminViewRejectionReasonModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() selectedTutor: ITutor | undefined;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
