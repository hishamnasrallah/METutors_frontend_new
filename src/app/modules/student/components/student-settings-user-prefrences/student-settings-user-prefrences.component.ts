import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-settings-user-prefrences',
  templateUrl: './student-settings-user-prefrences.component.html',
  styleUrls: ['./student-settings-user-prefrences.component.scss'],
})
export class StudentSettingsUserPrefrencesComponent implements OnInit {
  showLanguages = false;

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any): void {
    if (event.value === '-1') {
      this.showLanguages = true;
    } else {
      this.showLanguages = false;
    }
  }
}
