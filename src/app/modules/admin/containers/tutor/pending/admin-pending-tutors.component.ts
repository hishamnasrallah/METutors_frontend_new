import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TUTOR_STATUSES_CONST } from '@config';
import { ITutor, ITutorFilters } from '@models';

@Component({
  selector: 'metutors-pending',
  templateUrl: './admin-pending-tutors.component.html',
  styleUrls: ['./admin-pending-tutors.component.scss'],
})
export class AdminPendingTutorsComponent implements OnInit {
  tutorsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  pendingTutors$: Observable<ITutor[] | null>;
  rejectedTutors$: Observable<ITutor[] | null>;

  name: string;
  selectedIndex: number;
  selectedTutor?: ITutor;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.selectedIndex = this._route.snapshot.queryParams['tab'] || 0;
  }

  filterTutors(filters: ITutorFilters): void {
    if (this.selectedIndex === 0) {
      this.pendingTutors$ = this._store.select(
        fromCore.selectFilteredPendingTutors,
        {
          ...filters,
        }
      );
    } else {
      this.rejectedTutors$ = this._store.select(
        fromCore.selectFilteredRejectedTutors,
        {
          ...filters,
        }
      );
    }
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  onChangeTab(event: any): void {
    this.name = '';
    this.selectedIndex = event.index;
    this.pendingTutors$ = this._store.select(fromCore.selectPendingTutors);
    this.rejectedTutors$ = this._store.select(fromCore.selectRejectedTutors);
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadPendingTutors());
    this.tutorsCounts$ = this._store.select(fromCore.selectTutorsCounts);
    this.pendingTutors$ = this._store.select(fromCore.selectPendingTutors);
    this.rejectedTutors$ = this._store.select(fromCore.selectRejectedTutors);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingPendingTutors);
  }
}
