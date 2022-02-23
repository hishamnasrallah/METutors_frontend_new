import { Component, Input, OnInit } from '@angular/core';
import { IFAQTopics } from 'src/app/core/models';

@Component({
  selector: 'metutors-select-faq-topic',
  templateUrl: './select-faq-topic.component.html',
  styleUrls: ['./select-faq-topic.component.scss'],
})
export class SelectFaqTopicComponent implements OnInit {
  @Input() topics!: IFAQTopics[];

  constructor() {}

  ngOnInit(): void {}
}
