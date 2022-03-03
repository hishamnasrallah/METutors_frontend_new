import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AcademicTutoringTextbook, TutorStatus } from 'src/app/config';

@Component({
  selector: 'metutors-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.scss'],
})
export class ReviewRequestComponent implements OnInit {
  @Input() reviewInfo: any;
  @Input() isCreatingCourse: boolean | null;

  @Output() onBack = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  tutorStatus = TutorStatus;
  academicTutoringTextbook = AcademicTutoringTextbook;

  constructor() {}

  ngOnInit(): void {}
}
