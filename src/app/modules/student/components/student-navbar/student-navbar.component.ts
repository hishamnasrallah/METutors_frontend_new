import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@metutor/core/models';

@Component({
  selector: 'metutors-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.scss'],
})
export class StudentNavbarComponent implements OnInit {
  @Input() layout: any;
  @Input() user: IUser | null;

  constructor() {}

  ngOnInit(): void {}
}
