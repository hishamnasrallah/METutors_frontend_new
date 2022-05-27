import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'metutors-admin-testimonials',
  templateUrl: './admin-testimonials.component.html',
  styleUrls: ['./admin-testimonials.component.scss'],
})
export class AdminTestimonialsComponent implements OnInit {
  view$: Observable<{
    loading: boolean;
    feedback: any;
  }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    // this._store.dispatch(fromCore.loadAdminStudentsFeedback());

    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminStudentsFeedback),
      this._store.select(fromCore.selectIsLoadingAdminStudentsFeedback),
    ]).pipe(
      map(([feedback, loading]) => ({
        feedback,
        loading,
      }))
    );
  }
}
