import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { TUTOR_STATUSES_CONST } from '@metutor/config';
import { ITutor, ITutorFilters } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-pending-tutors',
  templateUrl: './admin-pending-tutors.component.html',
  styleUrls: ['./admin-pending-tutors.component.scss'],
})
export class AdminPendingTutorsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;

  name: string;
  selectedTutor?: ITutor;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();
  }

  filterTutors(filters: ITutorFilters): void {
    this.tutors$ = this._store.select(fromCore.selectFilteredPendingTutors, {
      ...filters,
    });
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadPendingTutors());
    this.tutors$ = this._store.select(fromCore.selectPendingTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingPendingTutors);
  }
}
