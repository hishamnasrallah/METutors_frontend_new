import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addLookups, getLookups } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import { ICity, ICountry, ILanguage, IProgram } from 'src/app/core/models';
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
  step: number = 4;
  cities!: ICity[];
  countries!: ICountry[];
  languages!: ILanguage[];
  coursePrograms!: IProgram[];
  sendAccountSub?: Subscription;
  fetchCitiesSub?: Subscription;
  fetchCountriesSub?: Subscription;
  fetchLanguagesSub?: Subscription;
  getCourseProgramsSub?: Subscription;

  constructor(
    private _authService: AuthService,
    private _tutorsService: TutorsService,
    private _lookupsService: LookupsService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this._prepareCountries();
    this._prepareLanguages();
    this._prepareCourseProgram();
    // this.step =
    //   +this._authService.decodeToken()?.user?.profileCompletedStep + 1;
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

  ngOnDestroy(): void {
    this.sendAccountSub?.unsubscribe();
    this.fetchCitiesSub?.unsubscribe();
    this.fetchCountriesSub?.unsubscribe();
    this.fetchLanguagesSub?.unsubscribe();
    this.getCourseProgramsSub?.unsubscribe();
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
}
