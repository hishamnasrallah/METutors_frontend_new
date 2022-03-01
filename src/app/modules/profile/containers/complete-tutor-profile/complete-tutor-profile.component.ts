import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addLookups, getLookups } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import {
  ICity,
  ICountry,
  ICourseField,
  ICourseLevel,
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
  loading = false;
  step: number = 1;
  cities!: ICity[];
  subjects!: ISubject[];
  countries!: ICountry[];
  languages!: ILanguage[];
  fields!: ICourseField[];
  levels!: ICourseLevel[];
  getFieldSub?: Subscription;
  coursePrograms!: IProgram[];
  getLevelsSub?: Subscription;
  sendAccountSub?: Subscription;
  fetchCitiesSub?: Subscription;
  fetchCountriesSub?: Subscription;
  fetchLanguagesSub?: Subscription;
  getCourseProgramsSub?: Subscription;
  getCourseFieldSubjectSub?: Subscription;

  constructor(
    private _router: Router,
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

  fetchFieldSubject(fieldId: string): void {
    this.getCourseFieldSubjectSub = this._lookupsService
      .getCourseFieldSubject(fieldId)
      .subscribe(
        (fetchedValues) => {
          this.subjects = fetchedValues;
          addLookups('courseSubjects', this.subjects);
        },
        () => {}
      );

    this.subjects = getLookups().courseSubjects;
  }

  ngOnDestroy(): void {
    this.getFieldSub?.unsubscribe();
    this.getLevelsSub?.unsubscribe();
    this.sendAccountSub?.unsubscribe();
    this.fetchCitiesSub?.unsubscribe();
    this.fetchCountriesSub?.unsubscribe();
    this.fetchLanguagesSub?.unsubscribe();
    this.getCourseProgramsSub?.unsubscribe();
    this.getCourseFieldSubjectSub?.unsubscribe();
  }

  private _prepareCountries(): void {
    this.fetchCountriesSub = this._lookupsService.getCountries().subscribe(
      (result) => {
        this.countries = result;
        addLookups('countries', this.countries);
      },
      (error) => {
        console.log(error);
      }
    );

    this.countries = getLookups().countries;
  }

  private _prepareLanguages(): void {
    this.fetchLanguagesSub = this._lookupsService.getLanguages().subscribe(
      (result) => {
        this.languages = result;
        addLookups('languages', this.languages);
      },
      (error) => {
        console.log(error);
      }
    );

    this.languages = getLookups().languages;
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
    this.getCourseProgramsSub = this._lookupsService.getPrograms().subscribe(
      (fetchedValues) => {
        this.coursePrograms = fetchedValues;
        addLookups('coursePrograms', this.coursePrograms);
      },
      () => {}
    );

    this.coursePrograms = getLookups().coursePrograms;
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
    this.getLevelsSub = this._lookupsService.getCourseLevel().subscribe(
      (fetchedValues) => {
        this.levels = fetchedValues;
        addLookups('courseLevel', this.levels);
      },
      () => {}
    );

    this.levels = getLookups().courseLevel;
  }
}
