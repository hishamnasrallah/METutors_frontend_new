import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, OnInit } from '@angular/core';

import { insightRange } from '@config';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'metutors-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;

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

  range = '';
  insightRange = insightRange;

  view$: Observable<{
    loading: boolean;
    dashboard: any;
  }>;

  constructor(private _store: Store<any>) {}

  loadDashboard(params: string): void {
    this.range = params;
    this._store.dispatch(fromCore.loadStudentDashboard({ params, load: true }));
  }

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this._store.dispatch(
      fromCore.loadStudentDashboard({ params: this.range, load: false })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentDashboard),
      this._store.select(fromCore.selectIsLoadingStudentDashboard),
    ]).pipe(
      map(([dashboard, loading]) => ({
        loading,
        dashboard,
      }))
    );
  }
}
