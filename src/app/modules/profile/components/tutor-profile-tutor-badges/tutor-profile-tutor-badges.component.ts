import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-tutor-profile-tutor-badges',
  templateUrl: './tutor-profile-tutor-badges.component.html',
  styleUrls: ['./tutor-profile-tutor-badges.component.scss'],
})
export class TutorProfileTutorBadgesComponent implements OnInit {
  @Input() tutor?: ITutor;

  constructor() {}

  ngOnInit(): void {}
}
