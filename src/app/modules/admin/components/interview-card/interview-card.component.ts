import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterviewStatus } from '@metutor/config';
import { IInterview } from '@metutor/core/models';

@Component({
  selector: 'metutors-interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss'],
})
export class InterviewCardComponent implements OnInit {
  @Input() interview: IInterview;

  @Output() sendMeetingLink: EventEmitter<number> = new EventEmitter<number>();

  interviewStatus = InterviewStatus;

  constructor() {}

  ngOnInit(): void {}
}
