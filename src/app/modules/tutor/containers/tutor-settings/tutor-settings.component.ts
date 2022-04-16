import { Store } from '@ngrx/store';
import * as fromRoot from '@metutor/state';
import { filter, Observable, tap } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import * as fromTutor from '@metutor/modules/tutor/state';
import {
  ICity,
  ICountry,
  ITutor,
  IUser,
  SubmitInterviewInput,
} from '@metutor/core/models';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-settings',
  templateUrl: './tutor-settings.component.html',
  styleUrls: ['./tutor-settings.component.scss'],
})
export class TutorSettingsComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  tutor$: Observable<ITutor | null>;
  cities$: Observable<ICity[] | null>;
  isLoadingTutor$: Observable<boolean>;
  isChangingPassword$: Observable<boolean>;
  isChangeTutorCover$: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  isChangeTutorAvatar$: Observable<boolean>;
  changePasswordSuccess$: Observable<boolean>;
  isSubmittingInterview$: Observable<boolean>;
  isCompleteTutorProfile$: Observable<boolean>;
  showSubmitInterviewModal$: Observable<boolean>;

  tab = 'MY_PROFILE';

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCountries();

    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this.tutor$ = this._store.select(fromCore.selectProfileTutor);
    this.isLoadingTutor$ = this._store.select(
      fromCore.selectIsLoadingProfileTutor
    );

    this.isCompleteTutorProfile$ = this._store.select(
      fromCore.selectIsCompleteTutorProfile
    );

    this.isChangeTutorAvatar$ = this._store.select(
      fromCore.selectIsChangeTutorAvatar
    );

    this.isChangeTutorCover$ = this._store.select(
      fromCore.selectIsChangeTutorCover
    );

    this.isSubmittingInterview$ = this._store.select(
      fromCore.selectIsSubmittingInterview
    );

    this.isChangingPassword$ = this._store.select(
      fromCore.selectIsChangingPassword
    );

    this.changePasswordSuccess$ = this._store.select(
      fromCore.selectChangePasswordSuccess
    );

    this.showSubmitInterviewModal$ = this._store.select(
      fromTutor.selectSubmitInterviewModal
    );
  }

  onOpenSubmitInterview() {
    this._store.dispatch(fromTutorAction.openTutorSubmitInterviewModal());
  }

  onCloseSubmitInterview() {
    this._store.dispatch(fromTutorAction.closeTutorSubmitInterviewModal());
  }

  onChangePassword(value: any): void {
    this._store.dispatch(fromCore.changePassword({ value }));
  }

  onSubmitInterview(submitInterviewInput: SubmitInterviewInput): void {
    this._store.dispatch(fromCore.submitInterview({ submitInterviewInput }));
  }

  loadCities(countryId: string): void {
    this._prepareCitiesByCountryId(countryId);
  }

  sendTeacherAccount(data: any): void {
    this._store.dispatch(fromCore.completeTutorProfile({ data, nextStep: 6 }));
  }

  changetutorAvatar(file: File): void {
    this._store.dispatch(fromCore.changeTutorAvatar({ file }));
  }

  changetutorCover(file: File): void {
    this._store.dispatch(fromCore.changeTutorCover({ file }));
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store.select(fromCore.selectCountries);
  }

  private _prepareCitiesByCountryId(countryId: string): void {
    this._store.dispatch(fromCore.loadCities({ countryId }));
    this.cities$ = this._store.select(fromCore.selectCities);
  }
}
