import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from '@metutor/core/models';

@Component({
  selector: 'metutors-tutor-profile-video-preview',
  templateUrl: './tutor-profile-video-preview.component.html',
  styleUrls: ['./tutor-profile-video-preview.component.scss'],
})
export class TutorProfileVideoPreviewComponent implements OnInit {
  @Input() tutor?: ITutor;
  @Input() isLoading: boolean;

  constructor() {}

  ngOnInit(): void {}
}
