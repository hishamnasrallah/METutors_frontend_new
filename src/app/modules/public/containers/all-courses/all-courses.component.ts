import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { isNil, omitBy } from 'lodash';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as fromPublic from '@metutor/modules/public/state';
import * as fromPublicActions from '@metutor/modules/public/state/actions';
import {
  IField,
  ISubject,
  ICountry,
  IProgram,
  ILanguage,
  IExploreCoursesFilters
} from '@metutor/core/models';
import {
  state,
  style,
  group,
  trigger,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'metutors-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' }))
        ])
      ])
    ])
  ]
})
export class AllCoursesComponent implements OnInit {
  count$: Observable<number | null>;
  loadingCourses$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  isRequestCourse$: Observable<boolean>;
  loadingPrograms$: Observable<boolean>;
  loadingCountries$: Observable<boolean>;
  courses$: Observable<ISubject[] | null>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;
  showRequestCourseModal$: Observable<boolean>;
  selectedProgram$: Observable<IProgram | null>;

  page = 1;
  program = 0;
  perPage = 10;
  title: string;
  country: number;
  minValue: number;
  maxValue: number;
  minPricerPerHour: number;
  maxPricerPerHour: number;
  openFilter: boolean = true;
  openPriceFilter: boolean = false;
  selectedFieldOfStudy: number[] = [];

  constructor(private _store: Store<any>, private _route: ActivatedRoute) {
    this._route.paramMap.subscribe((res: ParamMap) => {
      this.program = +res.get('programId')! || 0;
      this.country = +this._route.snapshot.queryParams['country'] || 0;

      this.onFilterCourses();
    });
  }

  ngOnInit(): void {
    this._prepareCourses();
    this._preparePrograms();
    this._prepareCountries();
    this._prepareLanguages();

    this.showRequestCourseModal$ = this._store.select(
      fromPublic.selectShowRequestCourseModal
    );

    this.isRequestCourse$ = this._store.select(fromCore.selectIsRequestCourse);
  }

  onOpenRequestCourseModal(): void {
    this._store.dispatch(fromPublicActions.openRequestCourseModal());
  }

  onCloseRequestCourseModal(): void {
    this._store.dispatch(fromPublicActions.closeRequestCourseModal());
  }

  onChangeProgram({
    program,
    country
  }: {
    program: number;
    country: number;
  }): void {
    this.page = 1;
    this.program = program;
    this.country = country;
    this.onFilterCourses();
  }

  onChangeField(event: any, id: number): void {
    if (event?.checked) {
      this.selectedFieldOfStudy.push(id);
    } else {
      this.selectedFieldOfStudy.splice(
        this.selectedFieldOfStudy.indexOf(id),
        1
      );
    }
  }

  onPageChange({ page }: { page: number }): void {
    this.page = page;
    this.onFilterCourses();
  }

  onChangeValue(value: any): void {
    this.minPricerPerHour = value?.value;
    this.maxPricerPerHour = value?.highValue;
  }

  onFilterCourses(): void {
    const filters: IExploreCoursesFilters = {
      search: this.title || undefined,
      country_id: this.country,
      program: this.program,
      page: this.page
    };

    this._store.dispatch(
      fromCore.exploreCourses({ filters: omitBy(filters, isNil) })
    );
  }

  requestCourse(data: any): void {
    this._store.dispatch(fromCore.requestCourse({ data }));
  }

  private _prepareCourses(): void {
    this.courses$ = this._store.select(fromCore.selectExploreCourses);
    this.count$ = this._store.select(fromCore.selectExploreCoursesCount);
    this.fields$ = this._store.select(
      fromCore.selectExploreCoursesFieldsOfStudy
    );
    this.selectedProgram$ = this._store.select(
      fromCore.selectExploreCoursesProgram
    );
    this.loadingCourses$ = this._store.select(
      fromCore.selectIsLoadingExploreCourses
    );
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.loadingPrograms$ = this._store.select(
      fromCore.selectIsLoadingPrograms
    );
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.loadingCountries$ = this._store.select(
      fromCore.selectIsLoadingCountries
    );
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }
}
