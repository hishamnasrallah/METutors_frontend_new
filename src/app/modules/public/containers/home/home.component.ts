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
import * as fromPublic from '@metutor/modules/public/state';
import * as fromPublicActions from '@metutor/modules/public/state/actions';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loadingFields$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  loadingPrograms$: Observable<boolean>;
  loadingSubjects$: Observable<boolean>;
  loadingCountries$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  showViewSubjectDetailsModal$: Observable<boolean>;

  subjectData: any;
  teachers?: ITutor[];
  testmonials?: any[];
  academicStatistics?: IStatistics[];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._preparePrograms();
    this._prepareSubjects();
    this._prepareCountries();

    this.showViewSubjectDetailsModal$ = this._store.select(
      fromPublic.selectShowViewSubjectDetailsModal
    );

    this.academicStatistics = [
      {
        id: 1,
        icon: 'assets/svg/marketing.svg',
        value: '340',
        type: 'Courses created',
      },
      {
        id: 1,
        icon: 'assets/svg/create-new.svg',
        value: '30k',
        type: 'Courses enrolled',
      },
      {
        id: 1,
        icon: 'assets/svg/pen.svg',
        value: '40k',
        type: 'Classrooms watched',
      },
      {
        id: 1,
        icon: 'assets/svg/headset.svg',
        value: '300',
        type: 'Tickets issued',
      },
    ];

    this.teachers = [
      {
        id: 1,
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        roleName: 'University of canada',
        averageRating: 4.5,
        totalFeedbacks: 10,
        country: 'Egypt',
        studentsTeaching: 100,
        bio: "Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: 1, name: 'Geographics' },
          { id: 2, name: 'Math' },
          { id: 3, name: 'Science' },
        ],
      },
      {
        id: 2,
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        roleName: 'University of canada',
        averageRating: 4.5,
        totalFeedbacks: 10,
        country: 'Egypt',
        studentsTeaching: 100,
        bio: "Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: 1, name: 'Geographics' },
          { id: 2, name: 'Math' },
          { id: 3, name: 'Science' },
        ],
      },
      {
        id: 3,
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        roleName: 'University of canada',
        averageRating: 4.5,
        totalFeedbacks: 10,
        country: 'Egypt',
        studentsTeaching: 100,
        bio: "Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: 1, name: 'Geographics' },
          { id: 2, name: 'Math' },
          { id: 3, name: 'Science' },
        ],
      },
    ];

    this.testmonials = [
      {
        id: 1,
        rate: 5,
        content:
          'I received great customer service from the specialists who helped me. I would recommend to anyone who wants quality.',
        picture: '',
        postedBy: 'Viola Manisa',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          "Very responsive and competent! I've never dealt with annsurance company this customer-friendly in my entire life.",
        picture: '',
        postedBy: 'Bryan Arnoldy',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          'My experience with this platform so far has been great. Everything is easy, from signing the contract to making an appointment.',
        picture: '',
        postedBy: 'Joshua William',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          "It's the best online insurance you can find. Easy, without hidden costs and you can be very sure. our data is completely save.",
        picture: '',
        postedBy: 'George Scott',
        isVerified: true,
      },
    ];
  }

  onOpenViewSubjectDetailsModal(date: any): void {
    this.subjectData = date;
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
