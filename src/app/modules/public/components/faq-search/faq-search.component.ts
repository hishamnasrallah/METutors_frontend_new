import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFAQ } from 'src/app/core/models';

@Component({
  selector: 'metutors-faq-search',
  templateUrl: './faq-search.component.html',
  styleUrls: ['./faq-search.component.scss'],
})
export class FaqSearchComponent implements OnInit {
  @Input() title!: string;

  @Output() submitFAQ = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
