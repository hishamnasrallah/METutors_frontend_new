import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { InterviewStatus, TUTOR_STATUSES_CONST } from '@metutor/config';
import { ITutor, ITutorFilters } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-current-tutors',
  templateUrl: './admin-current-tutors.component.html',
  styleUrls: ['./admin-current-tutors.component.scss'],
})
export class AdminCurrentTutorsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;

  name: string;
  interviewStatus = InterviewStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();
  }

  filterTutors(filters: ITutorFilters): void {
    this.tutors$ = this._store.select(fromCore.selectFilteredCurrentTutors, {
      ...filters,
    });
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadCurrentTutors());
    this.tutors$ = this._store.select(fromCore.selectCurrentTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingCurrentTutors);
  }
}
