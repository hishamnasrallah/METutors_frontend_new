import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFAQ } from 'src/app/core/models';

@Component({
  selector: 'metutors-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.scss'],
})
export class FaqSearchComponent implements OnInit {
  @Input() title!: string;
  @Input() listFAQs?: IFAQ[];
  @Input() tempListFAQs!: IFAQ[];

  @Output() submitFAQ = new EventEmitter<IFAQ[]>();

  constructor() {}

  ngOnInit(): void {}

  filterFAQ(key: string) {
    this.listFAQs = [];
    for (var i = 0; i < this.tempListFAQs.length; i++) {
      if (
        this.tempListFAQs[i].title.toLowerCase().includes(key.toLowerCase())
      ) {
        this.listFAQs.push(this.tempListFAQs[i]);
      }
    }

    this.submitFAQ.emit(this.listFAQs);
  }
}
