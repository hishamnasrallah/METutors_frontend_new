import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
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
  tutorsCounts$: Observable<any>;
  tutors$: Observable<ITutor[] | null>;

  name: string;
  selectedIndex: number;
  selectedTutor?: ITutor;
  interviewStatus = InterviewStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;
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
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingCurrentTutors);
  }
}
