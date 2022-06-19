import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-benefits-online-tutoring',
  templateUrl: './benefits-online-tutoring.component.html',
  styleUrls: ['./benefits-online-tutoring.component.scss'],
})
export class BenefitsOnlineTutoringComponent implements OnInit {
  @Input() token: string;

  constructor() {}

  ngOnInit(): void {}
}
