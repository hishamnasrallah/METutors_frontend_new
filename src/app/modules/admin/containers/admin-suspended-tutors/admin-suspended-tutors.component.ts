import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { ITutor, ITutorFilters } from '@metutor/core/models';

@Component({
  selector: 'metutors-admin-suspended-tutors',
  templateUrl: './admin-suspended-tutors.component.html',
  styleUrls: ['./admin-suspended-tutors.component.scss'],
})
export class AdminSuspendedTutorsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutors$: Observable<ITutor[] | null>;

  name: string;
  selectedTutor?: ITutor;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();
  }

  filterTutors(filters: ITutorFilters): void {
    this.tutors$ = this._store.select(fromCore.selectFilteredSuspendedTutors, {
      ...filters,
    });
  }

  onFilterTutors(): void {
    this.filterTutors({
      name: this.name,
    });
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadSuspendedTutors());
    this.tutors$ = this._store.select(fromCore.selectSuspendedTutors);
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingSuspendedTutors
    );
  }
}
