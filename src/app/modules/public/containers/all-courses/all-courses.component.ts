import { Store } from '@ngrx/store';
import { maxBy, minBy } from 'lodash';
import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { filter, Observable, take, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as fromPublic from '@metutor/modules/public/state';
import { MoneyService } from '@metutor/core/services/money.service';
import { ICountry, ILanguage, IProgram } from '@metutor/core/models';
import * as fromPublicActions from '@metutor/modules/public/state/actions';
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
  isLoading$: Observable<boolean>;
  exploredCourses$: Observable<any>;
  isRequestCourse$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;
  showRequestCourseModal$: Observable<boolean>;

  lang: string;
  name?: string;
  minValue: number;
  maxValue: number;
  minPricerPerHour: number;
  maxPricerPerHour: number;
  openFilter: boolean = true;
  openPriceFilter: boolean = false;
  selectedFieldOfStudy: number[] = [];
  programImage = environment.programImage;

  constructor(
    private _store: Store<any>,
    private _money: MoneyService,
    private _translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._prepareCourses();
    this._preparePrograms();
    this._prepareCountries();
    this._prepareLanguages();

    this.lang = this._translate.currentLang;
    this._translate.onLangChange.subscribe(
      () => (this.lang = this._translate.currentLang)
    );

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

  onChangeValue(value: any): void {
    this.minPricerPerHour = value?.value;
    this.maxPricerPerHour = value?.highValue;
    this.filterCourses();
  }

  filterCourses(): void {
    this.exploredCourses$ = this._store.select(
      fromCore.selectFilteredExploredCourses,
      {
        name: this.name,
        fieldIds: this.selectedFieldOfStudy,
        minPricerPerHour: this.minPricerPerHour,
        maxPricerPerHour: this.maxPricerPerHour
      }
    );
  }

  requestCourse(data: any): void {
    this._store.dispatch(fromCore.requestCourse({ data }));
  }

  private _prepareCourses(): void {
    this._store.dispatch(fromCore.exploreCourses());
    this.exploredCourses$ = this._store.select(fromCore.selectExploredCourses);
    this.exploredCourses$.subscribe(courses => {
      if (courses && courses?.subjects && courses?.subjects?.length) {
        const min: any = minBy(courses.subjects, 'pricePerHour');
        this.minValue = min?.pricePerHour;

        const max: any = maxBy(courses.subjects, 'pricePerHour');
        this.maxValue = max?.pricePerHour;

        // this._store
        //   .select(fromCore.selectCurrentCurrency)
        //   .subscribe((toCurrency) => {
        //     this._money
        //       .convert(
        //         parseFloat(min?.pricePerHour.toString()),
        //         toCurrency,
        //         false,
        //         true
        //       )
        //       .subscribe((res) => (this.minValue = res.toFixed(2)));

        //     this._money
        //       .convert(
        //         parseFloat(max?.pricePerHour.toString()),
        //         toCurrency,
        //         false,
        //         true
        //       )
        //       .subscribe((res) => (this.maxValue = res.toFixed(2)));
        //   });
      }
    });
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingExploredCourses
    );
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
  }

  private _prepareCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }
}
