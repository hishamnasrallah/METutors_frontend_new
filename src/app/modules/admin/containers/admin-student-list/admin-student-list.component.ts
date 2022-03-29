import { Component, OnInit } from '@angular/core';
import { TutorStatus, TUTOR_STATUSES_CONST } from '@metutor/config';

@Component({
  selector: 'metutors-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss'],
})
export class AdminStudentListComponent implements OnInit {
  tutorStatus = TutorStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor() {}

  ngOnInit(): void {}
}
