import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { OnInit, Component } from '@angular/core';
import { ICountry, IProgram } from '@metutor/core/models';
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
  loadingPrograms$: Observable<boolean>;
  loadingCountries$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  countries$: Observable<ICountry[] | null>;

  openFilter = true;

  tutors: any[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      avatar:
        'https://testing.zaptatech.com/public/uploads/2022090818361757.jpg',
      qualifications: {
        nameOfUniversity: 'Zagazig university'
      },
      averageRating: 3.5,
      totalFeedbacks: 10,
      country: {
        name: 'Egypt'
      },
      classesTaught: 20,
      bio:
        "Hello everyone my name is Ahmed. I'm a mean stack developer. I hope you like my profile ",
      programs: [
        {
          code: 'AP'
        }
      ],
      subjects: [
        {
          name: 'Mathematics'
        },
        {
          name: 'Calculus'
        },
        {
          name: 'Physics'
        }
      ]
    },
    {
      id: 2,
      name: 'Mohamed Abulrahman',
      avatar:
        'https://testing.zaptatech.com/public/uploads/2022090818173059.jpg',
      qualifications: {
        nameOfUniversity: 'Zagazig university'
      },
      averageRating: 3.5,
      totalFeedbacks: 10,
      country: {
        name: 'Egypt'
      },
      classesTaught: 20,
      bio:
        "Hello everyone my name is Ahmed. I'm a mean stack developer. I hope you like my profile ",
      programs: [
        {
          code: 'AP'
        }
      ],
      subjects: [
        {
          name: 'Mathematics'
        },
        {
          name: 'Calculus'
        },
        {
          name: 'Physics'
        }
      ]
    }
  ];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._preparePrograms();
    this._prepareCountries();
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
}
