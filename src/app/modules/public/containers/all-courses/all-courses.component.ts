import { Component, OnInit } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { maxBy, minBy } from 'lodash';
import { filter, Observable, take, tap } from 'rxjs';
import * as fromPublic from '@metutor/modules/public/state';
import * as fromPublicActions from '@metutor/modules/public/state/actions';
import { ICountry, ILanguage, IProgram, ISubject } from '@metutor/core/models';

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
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class AllCoursesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  exploredCourses$: Observable<any>;
  isRequestCourse$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;
  showRequestCourseModal$: Observable<boolean>;

  name?: string;
  minValue: number;
  maxValue: number;
  minPricerPerHour: number;
  maxPricerPerHour: number;
  openFilter: boolean = true;
  openPriceFilter: boolean = false;
  selectedFieldOfStudy: number[] = [];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCourses();
    this._preparePrograms();
    this._prepareSubjects();
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
        maxPricerPerHour: this.maxPricerPerHour,
      }
    );
  }

  requestCourse(data: any): void {
    this._store.dispatch(fromCore.requestCourse({ data }));
  }

  private _prepareCourses(): void {
    this._store.dispatch(fromCore.exploreCourses());
    this.exploredCourses$ = this._store
      .select(fromCore.selectExploredCourses)
      .pipe(
        filter((courses) => !!courses),
        take(1),
        tap((courses) => {
          if (courses && courses?.subjects && courses?.subjects?.length) {
            const min: any = minBy(courses.subjects, 'pricePerHour');
            this.minValue = min?.pricePerHour;

            const max: any = maxBy(courses.subjects, 'pricePerHour');
            this.maxValue = max?.pricePerHour;
          }
        })
      );
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

  private _prepareSubjects(): void {
    this._store.dispatch(fromCore.loadSubjects());
    this.subjects$ = this._store.select(fromCore.selectSubjects);
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }
}
