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
import { InterviewStatus } from '@metutor/config';
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
  isUpdateTutorProfile$: Observable<boolean>;
  changePasswordSuccess$: Observable<boolean>;
  isSubmittingInterview$: Observable<boolean>;
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

    this.isUpdateTutorProfile$ = this._store.select(
      fromCore.selectIsUpdateTutorProfile
    );

    this.isChangeTutorAvatar$ = this._store.select(
      fromCore.selectIsUploadingAvatar
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

  sendTeacherAccount(tutor: ITutor, data: any): void {
    if (
      tutor?.interviewRequest?.status === InterviewStatus.pending ||
      tutor?.interviewRequest?.status === InterviewStatus.scheduled ||
      tutor?.interviewRequest?.status === InterviewStatus.rejected
    ) {
      return;
    }

    this._store.dispatch(fromCore.updateTutorProfile({ data }));
  }

  changetutorAvatar(file: File): void {
    this._store.dispatch(fromCore.changeAvatar({ file }));
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
