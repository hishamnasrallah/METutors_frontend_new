import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrls: ['./tutor-sidebar.component.scss'],
})
export class TutorSidebarComponent implements OnInit {
  @Input() layout: any;

  @Output() logout = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
