import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-tutor-profile-specialization',
  templateUrl: './tutor-profile-specialization.component.html',
  styleUrls: ['./tutor-profile-specialization.component.scss'],
})
export class TutorProfileSpecializationComponent implements OnInit {
  @Input() tutor?: ITutor;

  constructor() {}

  ngOnInit(): void {}
}
