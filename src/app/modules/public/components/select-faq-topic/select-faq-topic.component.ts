import { IFAQTopics } from 'src/app/core/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-select-faq-topic',
  templateUrl: './select-faq-topic.component.html',
  styleUrls: ['./select-faq-topic.component.scss'],
})
export class SelectFaqTopicComponent implements OnInit {
  @Input() isLoading: boolean | null;
  @Input() topics: IFAQTopics[] | null;

  constructor() {}

  ngOnInit(): void {}
}
