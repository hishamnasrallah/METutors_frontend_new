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
}
