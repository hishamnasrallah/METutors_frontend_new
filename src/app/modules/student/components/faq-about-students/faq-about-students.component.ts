import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-faq-about-students',
  templateUrl: './faq-about-students.component.html',
  styleUrls: ['./faq-about-students.component.scss'],
})
export class FaqAboutStudentsComponent implements OnInit {
  @Output() submitFAQ = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  // filterFAQ(key: string) {
  //   this.listFAQs = [];
  //   if (this.tempListFAQs && this.tempListFAQs.length) {
  //     for (var i = 0; i < this.tempListFAQs.length; i++) {
  //       if (
  //         this.tempListFAQs[i].title
  //           .toLowerCase()
  //           .includes(key.toLowerCase())
  //       ) {
  //         this.listFAQs.push(this.tempListFAQs[i]);
  //       }
  //     }
  //   }
  //   this.submitFAQ.emit(this.listFAQs);
  // }
}
