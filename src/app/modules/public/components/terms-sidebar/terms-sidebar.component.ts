import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-terms-sidebar',
  templateUrl: './terms-sidebar.component.html',
  styleUrls: ['./terms-sidebar.component.scss']
})
export class TermsSidebarComponent implements OnInit {
  @Input() active: string;

  links = [
    { key: 'PRIVACY_NOTICE', route: '/privacy-notice' },
    { key: 'COOKIES_NOTICE', route: '/cookie-notice' },
    { key: 'WEBSITE_TERMS', route: '/website-terms' },
    { key: 'STUDENT_TERMS', route: '/student-terms' },
    { key: 'TUTOR_TERMS', route: '/tutor-terms' },
    { key: 'COMMUNITY_TERMS', route: '/community-terms' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
