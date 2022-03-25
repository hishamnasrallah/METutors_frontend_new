import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-assignment-details-modal',
  templateUrl: './tutor-assignment-details-modal.component.html',
  styleUrls: ['./tutor-assignment-details-modal.component.scss'],
})
export class TutorAssignmentDetailsModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
