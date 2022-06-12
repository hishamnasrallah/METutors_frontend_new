import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-cancel-course-modal',
  templateUrl: './admin-cancel-course-modal.component.html',
  styleUrls: ['./admin-cancel-course-modal.component.scss'],
})
export class AdminCancelCourseModalComponent implements OnInit {
  @Input() course: any;
  @Input() loading = false;
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
