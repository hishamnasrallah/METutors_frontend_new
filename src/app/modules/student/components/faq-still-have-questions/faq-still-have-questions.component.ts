import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-faq-still-have-questions',
  templateUrl: './faq-still-have-questions.component.html',
  styleUrls: ['./faq-still-have-questions.component.scss'],
})
export class FaqStillHaveQuestionsComponent implements OnInit {
  @Input() info: any;

  constructor() {}

  ngOnInit(): void {}
}
