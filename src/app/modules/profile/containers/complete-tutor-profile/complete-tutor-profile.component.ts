import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import {
  ICity,
  ICountry,
  IField,
  ILevel,
  ILanguage,
  IProgram,
  ISubject,
} from 'src/app/core/models';

@Component({
  selector: 'metutors-complete-tutor-profile',
  templateUrl: './complete-tutor-profile.component.html',
  styleUrls: ['./complete-tutor-profile.component.scss'],
})
export class CompleteTutorProfileComponent implements OnInit {
  step$: Observable<number>;
  loading$: Observable<boolean>;
  cities$: Observable<ICity[] | null>;
  levels$: Observable<ILevel[] | null>;
  fields$: Observable<IField[] | null>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareLevels();
    this._prepareFields();
    this._prepareCountries();
    this._prepareLanguages();
    this._prepareCourseProgram();

    this._store.dispatch(fromCore.enterCompleteProfile());
    this.step$ = this._store.select(fromCore.selectProfileStep);
    this.loading$ = this._store.select(fromCore.selectIsCompleteTutorProfile);
  }

  sendTeacherAccount(data: any, nextStep: number): void {
    this._store.dispatch(fromCore.completeTutorProfile({ data, nextStep }));
  }

  loadCities(countryId: string): void {
    this._prepareCitiesByCountryId(countryId);
  }

  fetchFieldSubject(fieldId: string): void {
    this._store.dispatch(fromCore.loadSubjectsByFieldId({ fieldId }));
    this.subjects$ = this._store.select(fromCore.selectSubjects);
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store.select(fromCore.selectCountries);
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
}
