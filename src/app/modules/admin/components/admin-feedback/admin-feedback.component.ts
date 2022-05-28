import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
})
export class AdminFeedbackComponent implements OnInit {
  @Input() feedback: any;

  constructor() {}

  ngOnInit(): void {}
}
