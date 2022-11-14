import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-dispute-reason-modal',
  templateUrl: './tutor-dispute-reason-modal.component.html',
  styleUrls: ['./tutor-dispute-reason-modal.component.scss'],
})
export class TutorDisputeReasonModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
