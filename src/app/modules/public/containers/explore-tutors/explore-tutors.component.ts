import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IProgram } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import {
  OnInit,
  ViewChild,
  Component,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';
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
export class ExploreTutorsComponent implements OnInit, AfterViewChecked {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;

  loadingPrograms$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;

  step = 0;
  openFilter = true;
  leftDisabled = true;
  rightDisabled = true;

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

  constructor(private _store: Store<any>, private _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkScroll();
    this._preparePrograms();
  }

  ngAfterViewChecked(): void {
    this.checkScroll();
  }

  scrollLeft(): void {
    if (localStorage.getItem('DEFAULT_LANGUAGE') === 'en') {
      this.widgetsContent.nativeElement.scrollLeft -= 200;
    } else {
      this.widgetsContent.nativeElement.scrollLeft += 200;
    }
    this.checkScroll();
  }

  scrollRight(): void {
    if (localStorage.getItem('DEFAULT_LANGUAGE') === 'en') {
      this.widgetsContent.nativeElement.scrollLeft += 200;
    } else {
      this.widgetsContent.nativeElement.scrollLeft -= 200;
    }
    this.checkScroll();
  }

  checkScroll(): void {
    if (this.widgetsContent) {
      let newScrollLeft;
      this.leftDisabled =
        this.widgetsContent.nativeElement.scrollLeft == 0 ? true : false;

      if (localStorage.getItem('DEFAULT_LANGUAGE') === 'en') {
        newScrollLeft = this.widgetsContent.nativeElement.scrollLeft;
      } else {
        newScrollLeft = -this.widgetsContent.nativeElement.scrollLeft;
      }

      const width = this.widgetsContent.nativeElement.clientWidth;
      const scrollWidth = this.widgetsContent.nativeElement.scrollWidth;
      const diff = scrollWidth - (newScrollLeft + width);

      this.rightDisabled = diff <= 50 ? true : false;

      this._cdRef.detectChanges();
    }
  }

  onChangeStep(program: number): void {
    // if (program.id === this.nationalId) {
    //   const dialogRef = this._dialog.open(ChooseCountryDialog, {
    //     width: '1000px',
    //     data: { countries: this.countries, isLoading: this.isLoading },
    //     panelClass: 'overflow-height'
    //   });
    //   dialogRef.afterClosed().subscribe(result => {
    //     if (result) {
    //       this.country = result?.country;
    //       this.grade = result?.grade;
    //       this.step = program.id;
    //       this.selectedProgram = program;
    //       this.changeProgram.emit({
    //         program: program?.id?.toString(),
    //         country: this.country?.id,
    //         grade: result?.grade
    //       });
    //     }
    //   });
    // } else {
    //   this.step = program.id;
    //   this.selectedProgram = program;
    //   this.country = undefined;
    //   this.changeProgram.emit({ program: program?.id?.toString() });
    // }
  }

  private _preparePrograms(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms);
    this.loadingPrograms$ = this._store.select(
      fromCore.selectIsLoadingPrograms
    );
  }
}
