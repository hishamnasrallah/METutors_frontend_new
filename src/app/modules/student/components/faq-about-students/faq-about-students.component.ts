import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFAQ } from 'src/app/core/models';

@Component({
  selector: 'metutors-faq-about-students',
  templateUrl: './faq-about-students.component.html',
  styleUrls: ['./faq-about-students.component.scss'],
})
export class FaqAboutStudentsComponent implements OnInit {
  @Input() listFAQs?: IFAQ[];
  @Input() tempListFAQs?: IFAQ[];

  @Output() submitFAQ = new EventEmitter<IFAQ[]>();

  constructor() {}

  ngOnInit(): void {}

  filterFAQ(key: string) {
    this.listFAQs = [];

    if (this.tempListFAQs && this.tempListFAQs.length) {
      for (var i = 0; i < this.tempListFAQs.length; i++) {
        if (
          this.tempListFAQs[i].question
            .toLowerCase()
            .includes(key.toLowerCase())
        ) {
          this.listFAQs.push(this.tempListFAQs[i]);
        }
      }
    }

    this.submitFAQ.emit(this.listFAQs);
  }
}
