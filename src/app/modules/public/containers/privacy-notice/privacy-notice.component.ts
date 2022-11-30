import { Component, OnInit } from '@angular/core';

import {
  state,
  style,
  group,
  animate,
  trigger,
  transition
} from '@angular/animations';

@Component({
  selector: 'metutors-privacy-notice',
  templateUrl: './privacy-notice.component.html',
  styleUrls: ['./privacy-notice.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' }))
        ])
      ])
    ])
  ]
})
export class PrivacyNoticeComponent implements OnInit {
  questions = [
    {
      id: 1,
      title: 'Who are we?',
      answer: 'Who are we? details'
    },
    {
      id: 2,
      title: 'What do we mean by “personal information”?',
      answer: 'What do we mean by “personal information”? details'
    }
  ];
  selectedQuestion?: number;
  openQuestion: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  changeOpenSelection(id: number) {
    if (this.selectedQuestion === id) {
      this.openQuestion = false;
      this.selectedQuestion = undefined;
    } else {
      this.openQuestion = true;
      this.selectedQuestion = id;
    }
  }
}
