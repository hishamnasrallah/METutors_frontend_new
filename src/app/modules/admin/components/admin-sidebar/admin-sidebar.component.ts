import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  group,
  state,
  style,
  trigger,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'metutors-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
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
export class AdminSidebarComponent implements OnInit {
  @Input() layout: any;

  @Output() logout = new EventEmitter();

  openTutor = false;
  openStudent = false;
  openProgram = false;
  openFinance = false;
  openClassrooms = false;

  constructor() {}

  ngOnInit(): void {}
}
