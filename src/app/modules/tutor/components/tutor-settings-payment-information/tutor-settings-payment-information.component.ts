import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-settings-payment-information',
  templateUrl: './tutor-settings-payment-information.component.html',
  styleUrls: ['./tutor-settings-payment-information.component.scss'],
})
export class TutorSettingsPaymentInformationComponent implements OnInit {
  selectedCard?: string;

  constructor() {}

  ngOnInit(): void {}
}
