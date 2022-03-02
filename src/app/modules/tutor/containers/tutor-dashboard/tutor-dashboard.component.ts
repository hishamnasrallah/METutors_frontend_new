import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

import { ITutor } from '@models';
import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-dashboard',
  templateUrl: './tutor-dashboard.component.html',
  styleUrls: ['./tutor-dashboard.component.scss'],
})
export class TutorDashboardComponent implements OnInit {
  rate = 4;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 900,
    navText: [
      '<mat-icon>chevron_left</mat-icon>',
      '<mat-icon>chevron_right</mat-icon>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
    },
    nav: false,
  };

  tutor$: Observable<ITutor | null>;
  loadingTutor$: Observable<boolean>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutor({ id: 1145 }));
    this.tutor$ = this._store.select(fromCore.selectTutor);
    this.loadingTutor$ = this._store.select(fromCore.selectIsLoadingTutor);
  }
}
