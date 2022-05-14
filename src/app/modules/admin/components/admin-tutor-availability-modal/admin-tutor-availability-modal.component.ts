import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-tutor-availability-modal',
  templateUrl: './admin-tutor-availability-modal.component.html',
  styleUrls: ['./admin-tutor-availability-modal.component.scss'],
})
export class AdminTutorAvailabilityModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
