import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { environment } from '@environment';

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

  imageURL = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
