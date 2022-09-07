import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import * as fromRoot from '@metutor/state';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

import {
  ICity,
  IUser,
  ITutor,
  ICountry,
  ILanguage,
  SubmitInterviewInput,
} from '@metutor/core/models';

import * as fromTutor from '@metutor/modules/tutor/state';
import { generalConstants, InterviewStatus } from '@metutor/config';
import * as fromTutorAction from '@metutor/modules/tutor/state/actions';

@Component({
  selector: 'metutors-tutor-settings',
  templateUrl: './tutor-settings.component.html',
  styleUrls: ['./tutor-settings.component.scss'],
})
export class TutorSettingsComponent implements OnInit {
  layout$: any;
  isAvatar: boolean;
  user$: Observable<IUser | null>;
  tutor$: Observable<ITutor | null>;
  cities$: Observable<ICity[] | null>;
  fileUploadProgress$: Observable<any>;
  isLoadingTutor$: Observable<boolean>;
  isChangingPassword$: Observable<boolean>;
  isChangeTutorCover$: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  isChangeTutorAvatar$: Observable<boolean>;
  languages$: Observable<ILanguage[] | null>;
  isUpdateTutorProfile$: Observable<boolean>;
  changePasswordSuccess$: Observable<boolean>;
  isSubmittingInterview$: Observable<boolean>;
  showSubmitInterviewModal$: Observable<boolean>;

  tab = 'MY_PROFILE';
  uploadComplete = generalConstants.uploadComplete;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCountries();
    this._prepareLanguages();

    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this.tutor$ = this._store.select(fromCore.selectProfileTutor);
    this.isLoadingTutor$ = this._store.select(
      fromCore.selectIsLoadingProfileTutor
    );

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              if (this.isAvatar) {
                this._store.dispatch(
                  fromCore.changeAvatar({ file: response.url })
                );
              } else {
                this._store.dispatch(
                  fromCore.changeCover({ file: response.url })
                );
              }
            }

            this._store.dispatch(fromCore.resetUploadFileProgress());
          });
        })
      );

    this.isUpdateTutorProfile$ = this._store.select(
      fromCore.selectIsUpdateTutorProfile
    );

    this.isChangeTutorAvatar$ = this._store.select(
      fromCore.selectIsUploadingAvatar
    );

    this.isChangeTutorCover$ = this._store.select(
      fromCore.selectIsUploadingCover
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

  onChangeTutorAvatar(file: any): void {
    this.isAvatar = true;
    this._store.dispatch(
      fromCore.uploadFile({ file: [...file], uploadType: 'avatar' })
    );
  }

  onChangeTutorCover(file: any): void {
    this.isAvatar = false;
    this._store.dispatch(
      fromCore.uploadFile({ file: [...file], uploadType: 'cover' })
    );
  }

  onJoinMeeting(interviewId: number): void {
    this._store.dispatch(fromCore.joinInterview({ interviewId }));
  }

  onUpdatePreferences(data: any): void {
    this._store.dispatch(fromCore.updateTutorPreferences({ data }));
  }

  logout(): void {
    this._store.dispatch(fromCore.logout());
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store.select(fromCore.selectCountries);
  }

  private _prepareCitiesByCountryId(countryId: string): void {
    this._store.dispatch(fromCore.loadCities({ countryId }));
    this.cities$ = this._store.select(fromCore.selectCities);
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }
}
