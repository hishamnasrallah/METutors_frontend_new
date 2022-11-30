import { IFAQ } from 'src/app/core/models';
import { Component, Input, OnInit } from '@angular/core';

import {
  state,
  style,
  group,
  animate,
  trigger,
  transition,
} from '@angular/animations';

@Component({
  selector: 'metutors-faq-list-questions',
  templateUrl: './faq-list-questions.component.html',
  styleUrls: ['./faq-list-questions.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class FaqListQuestionsComponent implements OnInit {
  @Input() listFAQs: IFAQ[] | null;
  @Input() isLoading: boolean | null;

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
