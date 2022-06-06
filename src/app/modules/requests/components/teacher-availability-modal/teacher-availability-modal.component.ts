import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-teacher-availability-modal',
  templateUrl: './teacher-availability-modal.component.html',
  styleUrls: ['./teacher-availability-modal.component.scss'],
})
export class TeacherAvailabilityModalComponent implements OnInit {
  @Input() timeSlots: any;
  @Input() showModal: boolean;
  @Input() isLoadingTimeSlots: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
