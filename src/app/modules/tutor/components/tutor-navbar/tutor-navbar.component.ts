import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '@metutor/core/models';

@Component({
  selector: 'metutors-tutor-navbar',
  templateUrl: './tutor-navbar.component.html',
  styleUrls: ['./tutor-navbar.component.scss'],
})
export class TutorNavbarComponent implements OnInit {
  @Input() layout: any;
  @Input() user: IUser | null;

  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
