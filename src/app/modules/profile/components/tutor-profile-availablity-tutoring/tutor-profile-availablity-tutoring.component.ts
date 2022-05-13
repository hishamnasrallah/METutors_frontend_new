import { Component, Input, OnInit } from '@angular/core';
import { generalConstants } from '@metutor/config';
import { ITutor } from '@metutor/core/models';

@Component({
  selector: 'metutors-tutor-profile-availablity-tutoring',
  templateUrl: './tutor-profile-availablity-tutoring.component.html',
  styleUrls: ['./tutor-profile-availablity-tutoring.component.scss'],
})
export class TutorProfileAvailablityTutoringComponent implements OnInit {
  @Input() tutor?: ITutor;

  nationalId = generalConstants.nationalId;

  constructor() {}

  ngOnInit(): void {}
}
