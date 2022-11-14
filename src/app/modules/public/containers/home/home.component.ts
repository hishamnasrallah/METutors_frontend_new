import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import * as fromPublic from '@metutor/modules/public/state';
import * as fromPublicActions from '@metutor/modules/public/state/actions';
import {
  OnInit,
  Component,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  IUser,
  ITutor,
  IField,
  IProgram,
  ISubject,
  ICountry
} from 'src/app/core/models';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  user$: Observable<IUser | null>;
  isDemo$: Observable<number | null>;
  loadingFields$: Observable<boolean>;
  loadingTutors$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  loadingPrograms$: Observable<boolean>;
  loadingSubjects$: Observable<boolean>;
  token$: Observable<string | undefined>;
  loadingCountries$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  loadingSubjectTutors$: Observable<boolean>;
  subjectTutors$: Observable<ITutor[] | null>;
  featuredTutors$: Observable<ITutor[] | null>;
  showViewSubjectDetailsModal$: Observable<boolean>;

  fragment: any;
  subjectData: any;
  testmonials?: any[];

  constructor(
    private _store: Store<any>,
    private _route: ActivatedRoute,
    private _cdRef: ChangeDetectorRef,
    private _viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this._prepareTutors();
    this._preparePrograms();
    this._prepareSubjects();
    this._prepareCountries();
    this._cdRef.detectChanges();

    this.token$ = this._store.select(fromCore.selectToken);
    this.isDemo$ = this._store.select(fromCore.selectStudentIsDemo);
    this.user$ = this._store.select(fromCore.selectUser);

    this.showViewSubjectDetailsModal$ = this._store.select(
      fromPublic.selectShowViewSubjectDetailsModal
    );

    this._route.fragment.subscribe(f => {
      this.fragment = f;
      const element = document.querySelector('#' + f);

      if (element) this._viewportScroller.scrollToAnchor(f!);
    });

    this.testmonials = [
      {
        id: 1,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_1',
        picture: '',
        postedBy: 'Viola Manisa',
        isVerified: true
      },
      {
        id: 2,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_2',
        picture: '',
        postedBy: 'Bryan Arnoldy',
        isVerified: true
      },
      {
        id: 3,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_3',
        picture: '',
        postedBy: 'Joshua William',
        isVerified: true
      },
      {
        id: 4,
        rate: 5,
        content: 'SUCCESS_STORIES_OPTION_4',
        picture: '',
        postedBy: 'George Scott',
        isVerified: true
      }
    ];
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      try {
        const element = document.querySelector('#' + this.fragment);

        if (element) this._viewportScroller.scrollToAnchor(this.fragment!);
      } catch (e) {}
    });
  }

  onOpenViewSubjectDetailsModal(data: any): void {
    this.subjectData = data;
    this._store.dispatch(
      fromCore.loadSubjectFeaturedTutors({ id: data?.subject?.id })
    );
    this._store.dispatch(fromPublicActions.openViewSubjectDetailsModal());
  }

  onCloseViewSubjectDetailsModal(): void {
    this._store.dispatch(fromPublicActions.closeViewSubjectDetailsModal());
  }

  fetchFields({ program, country, grade }: any): void {
    this._store.dispatch(
      fromCore.loadFieldsByProgramId({
        programId: program,
        countryId: country,
        grade
      })
    );
    this.fields$ = this._store.select(fromCore.selectFields);
    this.loadingFields$ = this._store.select(fromCore.selectIsLoadingFields);
  }

  private _prepareTutors(): void {
    this._store.dispatch(fromCore.loadFeaturedTutors());
    this.featuredTutors$ = this._store.select(fromCore.selectFeaturedTutors);
    this.subjectTutors$ = this._store.select(
      fromCore.selectSubjectFeaturedTutors
    );
    this.loadingTutors$ = this._store.select(
      fromCore.selectIsLoadingFeaturedTutors
    );
    this.loadingSubjectTutors$ = this._store.select(
      fromCore.selectIsLoadingSubjectFeaturedTutors
    );
  }

  private _preparePrograms(): void {
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.loadingPrograms$ = this._store.select(
      fromCore.selectIsLoadingPrograms
    );
  }

  private _prepareSubjects(): void {
    this._store.dispatch(fromCore.loadSubjects());
    this.subjects$ = this._store.select(fromCore.selectSubjects);
    this.loadingSubjects$ = this._store.select(
      fromCore.selectIsLoadingSubjects
    );
  }

  private _prepareCountries(): void {
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.loadingCountries$ = this._store.select(
      fromCore.selectIsLoadingCountries
    );
  }
}
