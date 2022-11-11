import {
  Input,
  OnInit,
  Output,
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  AfterViewChecked,
  ChangeDetectorRef
} from '@angular/core';

import { environment } from '@environment';
import { MatDialog } from '@angular/material/dialog';
import { generalConstants, GRADES } from '@metutor/config';
import { ViewPricesDialogComponent } from '../view-prices-dialog';
import { ChooseCountryDialogComponent } from '@metutor/shared/components';
import { ICountry, IField, IProgram, ISubject } from '@metutor/core/models';

@Component({
  selector: 'metutors-learning-environment',
  templateUrl: './learning-environment.component.html',
  styleUrls: ['./learning-environment.component.scss']
})
export class LearningEnvironmentComponent implements OnInit, AfterViewChecked {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;

  @Input() fields: IField[] | null;
  @Input() isLoading: boolean | null;
  @Input() subjects: ISubject[] | null;
  @Input() loadingFields: boolean | null;
  @Input() countries?: ICountry[] | null;
  @Input() loadingSubjects: boolean | null;
  @Input() loadingCountries: boolean | null;

  @Input() set programs(_programs: IProgram[] | null) {
    if (_programs && _programs.length) {
      this.programsList = _programs;
      this.selectedProgram = _programs[0];
      this.step = this.selectedProgram?.id;
      this.changeProgram.emit({
        program: this.selectedProgram?.id?.toString()
      });
    }
  }

  @Output() changeProgram = new EventEmitter<any>();
  @Output() viewSubjectDetails = new EventEmitter<any>();

  step: number;
  grade: number;
  grades = GRADES;
  country?: ICountry;
  isShowMore = false;
  leftDisabled = true;
  rightDisabled = true;
  selectedField: number;
  programsList: IProgram[];
  selectedProgram: IProgram;
  nationalId = generalConstants.nationalId;
  imageURL = environment.fieldOfStudiesImage;

  constructor(private _dialog: MatDialog, private _cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.checkScroll();
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

  onChangeStep(program: IProgram): void {
    if (program.id === this.nationalId) {
      const dialogRef = this._dialog.open(ChooseCountryDialogComponent, {
        width: '1000px',
        data: { countries: this.countries, isLoading: this.loadingCountries },
        panelClass: 'overflow-height'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.country = result?.country;
          this.grade = result?.grade;
          this.step = program.id;
          this.selectedProgram = program;
          this.changeProgram.emit({
            program: program?.id?.toString(),
            country: this.country?.id,
            grade: result?.grade
          });
        }
      });
    } else {
      this.step = program.id;
      this.selectedProgram = program;
      this.country = undefined;
      this.changeProgram.emit({ program: program?.id?.toString() });
    }
  }

  onSelectGrade(event: any): void {
    this.grade = +event.value;

    this.changeProgram.emit({
      program: this.step,
      country: this.country?.id,
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
}
