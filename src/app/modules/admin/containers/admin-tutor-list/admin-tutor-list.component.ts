import { Component, OnInit } from '@angular/core';
import { TutorStatus, TUTOR_STATUSES_CONST } from '@metutor/config';

@Component({
  selector: 'metutors-admin-tutor-list',
  templateUrl: './admin-tutor-list.component.html',
  styleUrls: ['./admin-tutor-list.component.scss'],
})
export class AdminTutorListComponent implements OnInit {
  tutorStatus = TutorStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor() {}

  ngOnInit(): void {}
}
