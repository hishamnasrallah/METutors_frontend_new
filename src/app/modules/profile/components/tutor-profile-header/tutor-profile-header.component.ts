import { Component, Input, OnInit } from '@angular/core';
import { TutorStatus } from 'src/app/config';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-tutor-profile-header',
  templateUrl: './tutor-profile-header.component.html',
  styleUrls: ['./tutor-profile-header.component.scss'],
})
export class TutorProfileHeaderComponent implements OnInit {
  @Input() tutor?: ITutor;
  @Input() isLoading: boolean;

  tutorStatus = TutorStatus;

  constructor() {}

  ngOnInit(): void {}
}
