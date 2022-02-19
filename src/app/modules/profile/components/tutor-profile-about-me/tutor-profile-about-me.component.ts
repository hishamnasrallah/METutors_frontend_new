import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-tutor-profile-about-me',
  templateUrl: './tutor-profile-about-me.component.html',
  styleUrls: ['./tutor-profile-about-me.component.scss'],
})
export class TutorProfileAboutMeComponent implements OnInit {
  @Input() tutor?: ITutor;

  constructor() {}

  ngOnInit(): void {}
}
