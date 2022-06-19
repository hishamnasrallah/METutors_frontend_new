import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-become-online-tutor',
  templateUrl: './become-online-tutor.component.html',
  styleUrls: ['./become-online-tutor.component.scss'],
})
export class BecomeOnlineTutorComponent implements OnInit {
  @Input() token: string;

  constructor() {}

  ngOnInit(): void {}
}
