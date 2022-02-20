import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';

@Component({
  selector: 'metutors-tutor-settings-user-preferences',
  templateUrl: './tutor-settings-user-preferences.component.html',
  styleUrls: ['./tutor-settings-user-preferences.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class TutorSettingsUserPreferencesComponent implements OnInit {
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
