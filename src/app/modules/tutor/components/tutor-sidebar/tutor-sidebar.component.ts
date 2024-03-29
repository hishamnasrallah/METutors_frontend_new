import { ITutor } from '@metutor/core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrls: ['./tutor-sidebar.component.scss'],
})
export class TutorSidebarComponent implements OnInit {
  @Input() layout: any;
  @Input() tutor: ITutor;

  @Output() logout = new EventEmitter();

  openSidebar = false;

  constructor() {}

  ngOnInit(): void {}
}
