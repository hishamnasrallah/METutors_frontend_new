import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ITutor } from 'src/app/core/models';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as fromProfile from '@metutor/modules/profile/state';
import * as fromProfileActions from '@metutor/modules/profile/state/actions';

@Component({
  selector: 'metutors-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
})
export class TutorProfileComponent implements OnInit {
  loading$: Observable<boolean>;
  tutor$: Observable<ITutor | null>;
  tutorAvailability$: Observable<any>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = +(res.get('id') || '');

      this._store.dispatch(fromCore.loadTutor({ id }));
    });

    this.tutor$ = this._store.select(fromCore.selectTutor);
    this.loading$ = this._store.select(fromCore.selectIsLoadingTutor);

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromProfile.selectIsShowTeacherAvailabilityModal
    );
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromProfileActions.openTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromProfileActions.closeTeacherAvailabilityModal());
  }
}
