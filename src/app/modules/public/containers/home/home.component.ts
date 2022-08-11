import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {
  ITutor,
  IField,
  IProgram,
  ISubject,
  ICountry,
  IStatistics,
} from 'src/app/core/models';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import * as fromPublic from '@metutor/modules/public/state';
import * as fromPublicActions from '@metutor/modules/public/state/actions';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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

  subjectData: any;
  testmonials?: any[];
  academicStatistics?: IStatistics[];

  constructor(
    private _store: Store<any>,
    private _route: ActivatedRoute,
    private _viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this._prepareTutors();
    this._preparePrograms();
    this._prepareSubjects();
    this._prepareCountries();

    this.token$ = this._store.select(fromCore.selectToken);

    this.showViewSubjectDetailsModal$ = this._store.select(
      fromPublic.selectShowViewSubjectDetailsModal
    );

    this._route.fragment.subscribe((f) => {
      const element = document.querySelector('#' + f);

      if (element) this._viewportScroller.scrollToAnchor(f!);
    });

    this.academicStatistics = [
      {
        id: 1,
        icon: 'assets/svg/marketing.svg',
        value: '340',
        type: 'Courses Created',
      },
      {
        id: 1,
        icon: 'assets/svg/create-new.svg',
        value: '30k',
        type: 'Student Enrolled',
      },
      {
        id: 1,
        icon: 'assets/svg/pen.svg',
        value: '40k',
        type: 'Classrooms Attended',
      },
      {
        id: 1,
        icon: 'assets/svg/headset.svg',
        value: '300',
        type: 'Teacher Profiles',
      },
    ];

    this.testmonials = [
      {
        id: 1,
        rate: 5,
        content:
          "I appreciate how top educators focus on conceptual and practical methods to help us apply what we've learned so far. I would 100% recommend it to my friends for sure!",
        picture: '',
        postedBy: 'Viola Manisa',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          'Thank you for offering this course - there is much to learn and I love that I can do it at my own pace from the comfort of my own home ',
        picture: '',
        postedBy: 'Bryan Arnoldy',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          'As a student, I enjoyed the opportunity to explore, learn, and apply a variety of technology-based software, platforms, and tools that helped me enhance my learning experience.',
        picture: '',
        postedBy: 'Joshua William',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          'It is incredible to find such a variety of courses at a really affordable price. The fact that I can take the course anytime, anywhere is a bonus!',
        picture: '',
        postedBy: 'George Scott',
        isVerified: true,
      },
    ];
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

  fetchFields({ program, country }: any): void {
    this._store.dispatch(
      fromCore.loadFieldsByProgramId({ programId: program, countryId: country })
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
    this._store.dispatch(fromCore.loadPrograms());
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
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries);
    this.loadingCountries$ = this._store.select(
      fromCore.selectIsLoadingCountries
    );
  }
}
