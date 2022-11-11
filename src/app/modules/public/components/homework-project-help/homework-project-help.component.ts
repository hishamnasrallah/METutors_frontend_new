import { environment } from '@environment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { generalConstants, GRADES } from '@metutor/config';
import { MatSelectChange } from '@angular/material/select';
import { ViewPricesDialogComponent } from '../view-prices-dialog';
import { ChooseCountryDialogComponent } from '@metutor/shared/components';
import { ICountry, IField, IProgram, ISubject } from '@metutor/core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectProgramStudyingDialogComponent } from '../select-program-studying-dialog';

@Component({
  selector: 'metutors-homework-project-help',
  templateUrl: './homework-project-help.component.html',
  styleUrls: ['./homework-project-help.component.scss']
})
export class HomeworkProjectHelpComponent implements OnInit {
  @Input() programs: IProgram[];
  @Input() countries: ICountry[];
  @Input() fields: IField[] | null;
  @Input() subjects: ISubject[] | null;
  @Input() loadingFields: boolean | null;
  @Input() loadingSubjects: boolean | null;
  @Input() loadingCountries: boolean | null;

  @Output() changeProgram = new EventEmitter<any>();
  @Output() viewSubjectDetails = new EventEmitter<any>();

  step = 1;
  grade: number;
  homework: any;
  grades = GRADES;
  country: number;
  isShowMore = false;
  selectedField: number;
  selectedProgram: IProgram;
  nationalId = generalConstants.nationalId;
  imageURL = environment.fieldOfStudiesImage;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 900,
    navText: [
      '<mat-icon>chevron_left</mat-icon>',
      '<mat-icon>chevron_right</mat-icon>'
    ],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      }
    },
    nav: false
  };

  homeworks = [
    {
      id: 1,
      img: 'assets/svg/homework.svg',
      title: 'GENERAL_HOMEWORK_HELP',
      desc: 'STEP_STEP_EXPLANATIONS'
    },
    {
      id: 2,
      img: 'assets/svg/book.svg',
      title: 'SUBJECT_SPECIFIC_HELP',
      desc: 'ALL_YOUR_QUESTIONS_ANSWERED'
    },
    {
      id: 3,
      img: 'assets/png/prep.png',
      title: 'EXAM_PREP_PRACTICE',
      desc: 'UNDERSTANDING_EXAM_FORMAT_PAST_PAPER'
    },
    {
      id: 4,
      img: 'assets/png/topic.png',
      title: 'SPECIFIC_TOPIC_REVISION',
      desc: 'STUDY_HELP_TOP_TIPS_TUTORS'
    },
    {
      id: 5,
      img: 'assets/png/help.png',
      title: 'PROJECT_HELP',
      desc: 'PLAN_ORGANIZE_COMPLETE_PROJECTS_TIME'
    }
  ];

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  openProgramsList(homework: any): void {
    const dialogRef = this._dialog.open(SelectProgramStudyingDialogComponent, {
      width: '1000px',
      data: { programs: this.programs },
      panelClass: 'overflow-height'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.step = 2;
        this.homework = homework;
        this.selectedProgram = result?.program;

        if (result?.program?.id == this.nationalId) {
          this.grade = result?.grade;
          this.onSelectCountry();
        } else {
          this.changeProgram.emit({
            program: this.selectedProgram?.id?.toString()
          });
        }
      }
    });
  }

  onSelectGrade(event: any): void {
    this.grade = +event.value;

    this.changeProgram.emit({
      program: this.step,
      country: this.country,
      grade: this.grade
    });
  }

  filteredSubjects(id: number): ISubject[] {
    if (this.selectedProgram?.id === this.nationalId) {
      return this.subjects && this.subjects.length
        ? this.subjects?.filter(
            (subject: any) =>
              +subject?.fieldId === +id && +subject?.grade! === +this.grade
          )
        : [];
    } else {
      return this.subjects && this.subjects.length
        ? this.subjects?.filter((subject: any) => +subject?.fieldId === +id)
        : [];
    }
  }

  onChangeCourseProgram(event: MatSelectChange): void {
    this.selectedProgram = this.programs.filter(
      program => program.id === event.value
    )[0];

    if (this.selectedProgram?.id === this.nationalId) {
      this.onSelectCountry();
    } else {
      this.changeProgram.emit({
        program: this.selectedProgram?.id?.toString()
      });
    }
  }

  onChangeCountry(event: MatSelectChange): void {
    this.country = this.countries.filter(
      country => country.id === event.value
    )[0]?.id;

    this.changeProgram.emit({
      program: this.selectedProgram?.id?.toString(),
      country: this.country,
      grade: this.grade
    });
  }

  onViewPrices(): void {
    const dialogRef = this._dialog.open(ViewPricesDialogComponent, {
      width: '800px',
      data: {
        fields: this.fields,
        subjects: this.subjects,
        programId: this.selectedProgram?.id
      },
      panelClass: 'overflow-height'
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  onSelectCountry(): void {
    const dialogRef = this._dialog.open(ChooseCountryDialogComponent, {
      width: '1000px',
      data: { countries: this.countries, isLoading: this.loadingCountries },
      panelClass: 'overflow-height'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.country = result?.country?.id;
        this.grade = result?.grade;
        this.changeProgram.emit({
          program: this.selectedProgram?.id?.toString(),
          country: this.country,
          grade: result?.grade
        });
      }
    });
  }
}
