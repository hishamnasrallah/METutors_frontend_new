import { Component, Input, OnInit } from '@angular/core';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-tutor-profile-languages',
  templateUrl: './tutor-profile-languages.component.html',
  styleUrls: ['./tutor-profile-languages.component.scss'],
})
export class TutorProfileLanguagesComponent implements OnInit {
  @Input() tutor?: ITutor;

  constructor() {}

  ngOnInit(): void {}
}
