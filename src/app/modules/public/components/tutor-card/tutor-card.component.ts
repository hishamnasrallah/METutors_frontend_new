import { ITutor } from '@metutor/core/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-card',
  templateUrl: './tutor-card.component.html',
  styleUrls: ['./tutor-card.component.scss']
})
export class TutorCardComponent implements OnInit {
  @Input() tutor: ITutor;

  constructor() {}

  ngOnInit(): void {}
}
