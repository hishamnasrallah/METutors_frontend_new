import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-about-values',
  templateUrl: './about-values.component.html',
  styleUrls: ['./about-values.component.scss'],
})
export class AboutValuesComponent implements OnInit {
  @Input() valuesStatistics: any;

  constructor() {}

  ngOnInit(): void {}
}
