import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.scss'],
})
export class StudentSettingsComponent implements OnInit {
  tab = 'ACCOUNT_SETTINGS';

  constructor() {}

  ngOnInit(): void {}
}
