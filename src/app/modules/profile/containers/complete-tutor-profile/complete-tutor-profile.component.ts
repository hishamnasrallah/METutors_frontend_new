import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import {
  ICity,
  IField,
  ILevel,
  ITutor,
  ICountry,
  ISubject,
  IProgram,
  ILanguage,
} from 'src/app/core/models';

@Component({
  selector: 'metutors-complete-tutor-profile',
  templateUrl: './complete-tutor-profile.component.html',
  styleUrls: ['./complete-tutor-profile.component.scss'],
})
export class CompleteTutorProfileComponent implements OnInit {
  step$: Observable<number>;
  loading$: Observable<boolean>;
  tutor$: Observable<ITutor | null>;
  cities$: Observable<ICity[] | null>;
  levels$: Observable<ILevel[] | null>;
  fields$: Observable<IField[] | null>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;
  programCountries$: Observable<ICountry[] | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareLevels();
    this._prepareFields();
    this._prepareSubjects();
    this._prepareCountries();
    this._prepareLanguages();
    this._prepareCourseProgram();
    this._prepareProgramCountries();

    this._store.dispatch(fromCore.loadProfileTutor());
    this._store.dispatch(fromCore.enterCompleteProfile());
    this.step$ = this._store.select(fromCore.selectProfileStep);
    this.tutor$ = this._store.select(fromCore.selectProfileTutor);
    this.loading$ = this._store.select(fromCore.selectIsCompleteTutorProfile);
  }

  sendTeacherAccount(data: any, nextStep: number): void {
    this._store.dispatch(fromCore.completeTutorProfile({ data, nextStep }));
  }

  backBtn(prevStep: number): void {
    this._store.dispatch(fromCore.changeTutorProfileStep({ prevStep }));
  }

  loadCities(countryId: string): void {
    this._prepareCitiesByCountryId(countryId);
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store.select(fromCore.selectCountries);
  }

  private _prepareProgramCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.programCountries$ = this._store.select(
      fromCore.selectProgramCountries
    );
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }

  private _prepareCitiesByCountryId(countryId: string): void {
    this._store.dispatch(fromCore.loadCities({ countryId }));
    this.cities$ = this._store.select(fromCore.selectCities);
  }

  private _prepareCourseProgram(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
  }

  private _prepareFields(): void {
    this._store.dispatch(fromCore.loadFields());
    this.fields$ = this._store.select(fromCore.selectFields);
  }

  private _prepareLevels(): void {
    this._store.dispatch(fromCore.loadLevels());
    this.levels$ = this._store.select(fromCore.selectLevels);
  }

  private _prepareSubjects(): void {
    this._store.dispatch(fromCore.loadSubjects());
    this.subjects$ = this._store.select(fromCore.selectSubjects);
  }
}
