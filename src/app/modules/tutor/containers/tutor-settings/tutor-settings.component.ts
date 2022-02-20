import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-settings',
  templateUrl: './tutor-settings.component.html',
  styleUrls: ['./tutor-settings.component.scss'],
})
export class TutorSettingsComponent implements OnInit {
  tab = 'ACCOUNT_SETTINGS';

  constructor() {}

  ngOnInit(): void {}
}
