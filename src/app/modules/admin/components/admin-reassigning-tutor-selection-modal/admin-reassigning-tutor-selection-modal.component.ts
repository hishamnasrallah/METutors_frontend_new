import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-reassigning-tutor-selection-modal',
  templateUrl: './admin-reassigning-tutor-selection-modal.component.html',
  styleUrls: ['./admin-reassigning-tutor-selection-modal.component.scss'],
})
export class AdminReassigningTutorSelectionModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() tutorAvailability: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
