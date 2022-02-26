import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-tutor-profile-feedback-ratings',
  templateUrl: './tutor-profile-feedback-ratings.component.html',
  styleUrls: ['./tutor-profile-feedback-ratings.component.scss'],
})
export class TutorProfileFeedbackRatingsComponent implements OnInit {
  @Input() tutor?: ITutor;

  constructor() {}

  ngOnInit(): void {}
}