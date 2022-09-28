import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  token$: Observable<string | undefined>;

  founders: any[] = [
    {
      image: '',
      name: 'Claudio Giglieri',
      position: 'Co-creator of MEtutors',
    },
    {
      image: '',
      name: 'Elsie Mendoza',
      position: 'VP of Engineering',
    },
    {
      image: '',
      name: 'Philip Castro',
      position: 'CEO at MEtutors',
    },
    {
      image: '',
      name: 'Carrie Angela',
      position: 'Co-Founder, Head of Product',
    },
  ];

  whyMeTutorsList = [
    {
      id: 1,
      value: 'Next generation adaptive learning',
    },
    {
      id: 2,
      value: 'Flexible scheduling',
    },
    {
      id: 3,
      value: 'Affordable prices',
    },
    {
      id: 4,
      value: 'State-of-the-art technology',
    },
    {
      id: 5,
      value: 'Round-the-clock customer care',
    },
    {
      id: 6,
      value: 'Trusted tutors',
    },
    {
      id: 7,
      value: 'Personalized classes',
    },
    {
      id: 8,
      value: 'Subject matter experts',
    },
  ];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);
  }

  ngOnDestroy(): void {}
}
