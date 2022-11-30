import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-terms-header',
  templateUrl: './terms-header.component.html',
  styleUrls: ['./terms-header.component.scss']
})
export class TermsHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor() {}

  ngOnInit(): void {}
}
