import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-explore-heading',
  templateUrl: './explore-heading.component.html',
  styleUrls: ['./explore-heading.component.scss']
})
export class ExploreHeadingComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() image: string;
  @Input() btnText: string;
  @Input() description: string;
  @Input() placeholderText: string;
  @Input() loading: boolean = false;

  @Output() filter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
