import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-tutor-re-assignment-modal',
  templateUrl: './student-tutor-re-assignment-modal.component.html',
  styleUrls: ['./student-tutor-re-assignment-modal.component.scss'],
})
export class StudentTutorReAssignmentModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  next: boolean;
  showHeader = true;
  selectedOption: number;
  heading = 'Tutor Re-Assignment';
  subHeading =
    'Due to unforeseen reasons, your tutor can not continue teaching this course, kindly choose a preferred option to continue.';

  constructor(private _router: Router) {}

  goToDashboard(): void {
    this.closeModal.emit();
    this._router.navigate(['/student/classrooms']);
  }

  onChange(event: any): void {
    this.selectedOption = event.value;
  }

  onNext(): void {
    this.next = true;
    this.subHeading = '-';
    this.showHeader = false;
  }

  ngOnInit(): void {}
}
