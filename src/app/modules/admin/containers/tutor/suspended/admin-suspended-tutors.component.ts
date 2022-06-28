import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ITutor, ITutorFilters } from '@models';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-suspended',
  templateUrl: './admin-suspended-tutors.component.html',
  styleUrls: ['./admin-suspended-tutors.component.scss'],
})
export class AdminSuspendedTutorsComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutorAvailability$: Observable<any>;
  tutors$: Observable<ITutor[] | null>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  name: string;
  selectedTutor?: ITutor;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTutors();

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromAdmin.selectIsShowTeacherAvailabilityModal
    );
  }

  onOpenTeacherAvailabilityModal(id: number): void {
    this._store.dispatch(fromAdminAction.openAdminTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTeacherAvailabilityModal());
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
