import { ITutor } from '@models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { generalConstants, InterviewStatus } from '@config';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-tutor-profile',
  templateUrl: './admin-tutor-profile.component.html',
  styleUrls: ['./admin-tutor-profile.component.scss'],
})
export class AdminTutorProfileComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tutor$: Observable<ITutor | null>;
  tutorAvailability$: Observable<any>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;

  nationalId = generalConstants.nationalId;

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = +(res.get('id') || '');

      this._prepareTutor(id);
    });

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

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromAdminAction.openAdminTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromAdminAction.closeAdminTeacherAvailabilityModal());
  }

  private _prepareTutor(id: number): void {
    this._store.dispatch(fromCore.loadAdminTutor({ id }));
    this.tutor$ = this._store.select(fromCore.selectTutor);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTutor);
  }
}
