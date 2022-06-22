import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-settings-payment-information',
  templateUrl: './student-settings-payment-information.component.html',
  styleUrls: ['./student-settings-payment-information.component.scss'],
})
export class StudentSettingsPaymentInformationComponent implements OnInit {
  selectedCard?: string;

  constructor() {}

  ngOnInit(): void {}
}
