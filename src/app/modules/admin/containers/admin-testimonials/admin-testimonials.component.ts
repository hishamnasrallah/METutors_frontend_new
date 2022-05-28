import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'metutors-admin-testimonials',
  templateUrl: './admin-testimonials.component.html',
  styleUrls: ['./admin-testimonials.component.scss'],
})
export class AdminTestimonialsComponent implements OnInit {
  view$: Observable<{
    loading: boolean;
    testimonials: any;
  }>;

  constructor(private _store: Store<any>) {}

  onChangeTab(tab: any): void {
    const feedbackBy = tab.index === 0 ? 'teacher' : 'student';
    this._store.dispatch(fromCore.loadAdminTestimonials({ feedbackBy }));
  }

  ngOnInit(): void {
    const feedbackBy = 'teacher';
    this._store.dispatch(fromCore.loadAdminTestimonials({ feedbackBy }));

    this.view$ = combineLatest([
      this._store.select(fromCore.selectIsLoadingAdmin),
      this._store.select(fromCore.selectAdminTestimonials),
    ]).pipe(
      map(([loading, testimonials]) => ({
        loading,
        testimonials,
      }))
    );
  }
}
