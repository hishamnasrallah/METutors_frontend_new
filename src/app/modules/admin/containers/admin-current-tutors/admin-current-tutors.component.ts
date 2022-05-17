import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  InterviewStatus,
  TutorStatus,
  TUTOR_STATUSES_CONST,
} from '@metutor/config';
import { ITutor, ITutorFilters } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-current-tutors',
  templateUrl: './admin-current-tutors.component.html',
  styleUrls: ['./admin-current-tutors.component.scss'],
})
export class AdminCurrentTutorsComponent implements OnInit {
  tutorsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;
  activeTutors$: Observable<ITutor[] | null>;
  inActiveTutors$: Observable<ITutor[] | null>;

  name: string;
  selectedIndex: number;
  selectedTutor?: ITutor;
  tutorStatus = TutorStatus;
  interviewStatus = InterviewStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;
  }

  filterTutors(filters: ITutorFilters): void {
    if (this.selectedIndex === 0) {
      this.tutors$ = this._store.select(fromCore.selectFilteredCurrentTutors, {
        ...filters,
        status: undefined,
      });
    } else if (this.selectedIndex === 1) {
      this.activeTutors$ = this._store.select(
        fromCore.selectFilteredCurrentTutors,
        {
          ...filters,
          status: TutorStatus.active,
        }
      );
    } else if ((this.selectedIndex = 2)) {
      this.inActiveTutors$ = this._store.select(
        fromCore.selectFilteredCurrentTutors,
        {
          ...filters,
          status: TutorStatus.deactive,
        }
      );
    }
  }

  onChangeTab(event: any): void {
    this.name = '';
    this.selectedIndex = event.index;
    this.tutors$ = this._store.select(fromCore.selectCurrentTutors);
    this.activeTutors$ = this._store.select(fromCore.selectCurrentActiveTutors);
    this.inActiveTutors$ = this._store.select(
      fromCore.selectCurrentInactiveTutors
    );
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadCurrentTutors());
    this.tutors$ = this._store.select(fromCore.selectCurrentTutors);
    this.activeTutors$ = this._store.select(fromCore.selectCurrentActiveTutors);
    this.inActiveTutors$ = this._store.select(
      fromCore.selectCurrentInactiveTutors
    );
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingCurrentTutors);
  }
}
