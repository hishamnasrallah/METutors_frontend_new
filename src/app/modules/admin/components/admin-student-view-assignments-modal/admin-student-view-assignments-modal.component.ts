import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-student-view-assignments-modal',
  templateUrl: './admin-student-view-assignments-modal.component.html',
  styleUrls: ['./admin-student-view-assignments-modal.component.scss'],
})
export class AdminStudentViewAssignmentsModalComponent implements OnInit {
  @Input() summary: any;
  @Input() loading = false;
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  rate = 4;

  constructor() {}

  ngOnInit(): void {}
}
