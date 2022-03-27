import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss'],
})
export class InterviewCardComponent implements OnInit {
  @Input() status: string;

  @Output() sendMeetingLink: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
