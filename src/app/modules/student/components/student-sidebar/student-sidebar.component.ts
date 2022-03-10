import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.scss'],
})
export class StudentSidebarComponent implements OnInit {
  @Input() layout: any;

  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
