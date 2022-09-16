import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
