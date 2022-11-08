import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { find, isNil, omitBy } from 'lodash';
import * as fromCore from '@metutor/core/state';
import { OnInit, Component } from '@angular/core';
import {
  ITutor,
  IField,
  IProgram,
  ICountry,
  IExploreTutorsFilters
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
  selector: 'metutors-explore-tutors',
  templateUrl: './explore-tutors.component.html',
  styleUrls: ['./explore-tutors.component.scss'],
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
export class ExploreTutorsComponent implements OnInit {
  count$: Observable<number | null>;
  loadingTutors$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  tutors$: Observable<ITutor[] | null>;
  loadingPrograms$: Observable<boolean>;
  loadingCountries$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;

  page = 1;
  perPage = 10;
  title: string;
  country: number;
  openFilter = true;
  program: number = 0;
  fields: number[] = [];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._preparePrograms();
    this._prepareCountries();
    this._prepareTutors();
    this.onFilterTutors();
  }

  onChangeProgram({
    program,
    country
  }: {
    program: number;
    country: number;
  }): void {
    this.page = 1;
    this.fields = [];
    this.program = program;
    this.country = country;
    this.onFilterTutors();
  }

  onPageChange({ page }: { page: number }): void {
    this.page = page;
    this.onFilterTutors();
  }

  onChangeField(event: any, id: number): void {
    this.fields = [...this.fields];

    if (event?.checked) this.fields.push(id);
    else this.fields.splice(this.fields.indexOf(id), 1);

    this.onFilterTutors();
  }

  removeField(id: number): void {
    this.fields = [...this.fields];
    this.fields.splice(this.fields.indexOf(id), 1);
    this.onFilterTutors();
  }

  getFieldObject(fields: IField[], id: number): IField | undefined {
    return find(fields, { id });
  }

  onFilterTutors(): void {
    const filters: IExploreTutorsFilters = {
      search: this.title || undefined,
      country_id: this.country ? this.country : undefined,
      program: this.program,
      page: this.page,
      field_ids:
        this.fields && this.fields.length
          ? JSON.stringify(this.fields)
          : undefined
    };

    this._store.dispatch(
      fromCore.exploreTutors({ filters: omitBy(filters, isNil) })
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

  private _prepareTutors(): void {
    this.tutors$ = this._store.select(fromCore.selectExploreTutors);
    this.loadingTutors$ = this._store.select(
      fromCore.selectIsLoadingExploreTutors
    );
    this.count$ = this._store.select(fromCore.selectExploreTutorsCount);
    this.fields$ = this._store.select(
      fromCore.selectExploreTutorsFieldsOfStudy
    );
  }
}
