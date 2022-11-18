import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { find, isNil, omitBy } from 'lodash';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { generalConstants } from '@metutor/config';
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
  range$: Observable<any | null>;
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
  minPrice?: number;
  maxPrice?: number;
  countries: ICountry[];
  fields: number[] = [];
  openFilter: boolean = true;
  openPriceFilter: boolean = false;

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
    if (
      this.program !== generalConstants.nationalId &&
      this.program === program
    )
      return;

    this.page = 1;
    this.fields = [];
    this.program = program;
    this.country = country;
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.onFilterCourses();
  }

  onPageChange({ page }: { page: number }): void {
    if (page === this.page) return;

    this.page = page;
    window.scrollTo(0, 0);
    this.onFilterCourses();
  }

  onChangeField(event: any, id: number): void {
    this.fields = [...this.fields];

    if (event?.checked) this.fields.push(id);
    else this.fields.splice(this.fields.indexOf(id), 1);

    this.onFilterCourses();
  }

  removeField(id: number): void {
    this.fields = [...this.fields];
    this.fields.splice(this.fields.indexOf(id), 1);
    this.onFilterCourses();
  }

  getFieldObject(fields: IField[], id: number): IField | undefined {
    return find(fields, { id });
  }

  onChangeValue(range: any): void {
    this.minPrice = range.value;
    this.maxPrice = range.highValue;

    this.onFilterCourses();
  }

  onFilterCourses(): void {
    const filters: IExploreCoursesFilters = {
      search: this.title || undefined,
      country_id: this.country ? this.country : undefined,
      program: this.program,
      page: this.page,
      price_start: this.minPrice,
      price_end: this.maxPrice,
      field_ids:
        this.fields && this.fields.length
          ? JSON.stringify(this.fields)
          : undefined
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
    this.range$ = this._store.select(fromCore.selectExploreCoursesRange);
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
