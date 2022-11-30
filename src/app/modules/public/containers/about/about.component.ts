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
    'WHY_METUTORS_OPTION_1',
    'WHY_METUTORS_OPTION_2',
    'WHY_METUTORS_OPTION_3',
    'WHY_METUTORS_OPTION_4',
    'WHY_METUTORS_OPTION_5',
    'WHY_METUTORS_OPTION_6',
    'WHY_METUTORS_OPTION_7',
    'WHY_METUTORS_OPTION_8',
  ];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);
  }

  ngOnDestroy(): void {}
}
