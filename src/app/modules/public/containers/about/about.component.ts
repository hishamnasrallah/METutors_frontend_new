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
      value: 'Flexible Scheduling on the GO!',
    },
    {
      id: 2,
      value: 'Round the clock customer support',
    },
    {
      id: 3,
      value: 'Personalized courses',
    },
    {
      id: 4,
      value: 'Expert tutors',
    },
    {
      id: 5,
      value: 'Affordable prices',
    },
    {
      id: 6,
      value: 'The best technology and tools',
    },
    {
      id: 7,
      value: 'Relaxed yet professional learning environment',
    },
    {
      id: 8,
      value: 'Innovative and dynamic classes',
    },
  ];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);
  }

  ngOnDestroy(): void {}
}
