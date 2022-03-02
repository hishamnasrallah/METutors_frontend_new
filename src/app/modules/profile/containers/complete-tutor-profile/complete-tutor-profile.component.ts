import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { addLookups, getLookups } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
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
import {
  AuthService,
  LookupsService,
  TutorsService,
} from 'src/app/core/services';

@Component({
  selector: 'metutors-complete-tutor-profile',
  templateUrl: './complete-tutor-profile.component.html',
  styleUrls: ['./complete-tutor-profile.component.scss'],
})
export class CompleteTutorProfileComponent implements OnInit, OnDestroy {
  levels$: Observable<ILevel[] | null>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;

  loading = false;
  step: number = 1;
  cities!: ICity[];
  fields!: IField[];
  countries!: ICountry[];
  getFieldSub?: Subscription;
  sendAccountSub?: Subscription;
  fetchCitiesSub?: Subscription;

  constructor(
    private _router: Router,
    private _store: Store<any>,
    private _authService: AuthService,
    private _tutorsService: TutorsService,
    private _lookupsService: LookupsService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this._prepareLevels();
    this._prepareFields();
    this._prepareCountries();
    this._prepareLanguages();
    this._prepareCourseProgram();
    this.step =
      +this._authService.decodeToken()?.user?.profileCompletedStep + 1;

    if (this.step > 4) {
      this._router.navigate([
        '/profile',
        'tutor-profile',
        this._authService.decodeToken()?.user?.id,
      ]);
    }
  }

  sendTeacherAccount(data: any, step: number): void {
    this.loading = true;
    this.sendAccountSub = this._tutorsService
      .sendTeacherAccount(data)
      .subscribe(
        (response) => {
          this._alertNotificationService.success(response.message);
          this.step = step;
          this.loading = false;

          if (this.step > 4) {
            this._router.navigate([
              '/profile',
              'tutor-profile',
              this._authService.decodeToken()?.user?.id,
            ]);
          }
        },
        (error) => {
          this.loading = false;
          this._alertNotificationService.error(
            error.error?.message || 'Error in submitting the form'
          );
        }
      );
  }

  loadCities(countryName: string): void {
    let countryId: number = 0;

    this.countries.forEach((country) => {
      if (country?.name === countryName) {
        countryId = country?.id;
      }
    });

    this._prepareCitiesByCountryId(countryId);
  }

  fetchFieldSubject(programId: string): void {
    this._store.dispatch(fromCore.loadSubjectsByProgramId({ programId }));
    this.subjects$ = this._store.select(fromCore.selectSubjects);
  }

  ngOnDestroy(): void {
    this.getFieldSub?.unsubscribe();
    this.sendAccountSub?.unsubscribe();
    this.fetchCitiesSub?.unsubscribe();
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store.select(fromCore.selectCountries).pipe(
      tap((countries) => {
        if (countries && countries.length) {
          this.countries = countries;
        }
      })
    );
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }

  private _prepareCitiesByCountryId(countryId: number): void {
    this.fetchCitiesSub = this._lookupsService.getCities(countryId).subscribe(
      (result) => {
        this.cities = result;
        addLookups('cities', this.cities);
      },
      (error) => {
        console.log(error);
      }
    );

    this.cities = getLookups().cities;
  }

  private _prepareCourseProgram(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
  }

  private _prepareFields(): void {
    this.getFieldSub = this._lookupsService.getFields().subscribe(
      (fetchedValues) => {
        this.fields = fetchedValues;
        addLookups('fields', this.fields);
      },
      () => {}
    );

    this.fields = getLookups().fields;
  }

  private _prepareLevels(): void {
    this._store.dispatch(fromCore.loadLevels());
    this.levels$ = this._store.select(fromCore.selectLevels);
  }
}
