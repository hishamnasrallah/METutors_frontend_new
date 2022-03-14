import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent implements OnInit {
  @Input() layout: any;
  @Input() user: IUser | null;

  constructor() {}

  ngOnInit(): void {}
}
