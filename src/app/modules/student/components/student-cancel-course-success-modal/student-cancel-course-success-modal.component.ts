import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-cancel-course-success-modal',
  templateUrl: './student-cancel-course-success-modal.component.html',
  styleUrls: ['./student-cancel-course-success-modal.component.scss'],
})
export class StudentCancelCourseSuccessModalComponent implements OnInit {
  @Input() amount: any;
  @Input() showModal: boolean = false;

  @Output() submitted: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
