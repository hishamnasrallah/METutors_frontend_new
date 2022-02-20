import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-auth-opinions',
  templateUrl: './auth-opinions.component.html',
  styleUrls: ['./auth-opinions.component.scss'],
})
export class AuthOpinionsComponent implements OnInit {
  rate: number = 5;

  constructor() {}

  ngOnInit(): void {}
}
