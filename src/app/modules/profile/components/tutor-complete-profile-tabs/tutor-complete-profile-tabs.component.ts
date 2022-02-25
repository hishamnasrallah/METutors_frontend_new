import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-complete-profile-tabs',
  templateUrl: './tutor-complete-profile-tabs.component.html',
  styleUrls: ['./tutor-complete-profile-tabs.component.scss']
})
export class TutorCompleteProfileTabsComponent implements OnInit {

  @Input() step!:string

  constructor() { }

  ngOnInit(): void {
  }

}
