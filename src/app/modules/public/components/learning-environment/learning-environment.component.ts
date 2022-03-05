import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { generalConstants } from '@metutor/config';
import { ICountry, IField, IProgram, ISubject } from '@metutor/core/models';

@Component({
  selector: 'metutors-learning-environment',
  templateUrl: './learning-environment.component.html',
  styleUrls: ['./learning-environment.component.scss'],
})
export class LearningEnvironmentComponent implements OnInit {
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
        program: this.selectedProgram?.id?.toString(),
      });
    }
  }

  @Output() changeProgram = new EventEmitter<any>();

  step: number;
  country: number | null;
  programsList: IProgram[];
  selectedProgram: IProgram;

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  onChangeStep(program: IProgram): void {
    if (program.id === generalConstants.nationalId) {
      const dialogRef = this._dialog.open(ChooseCountryDialog, {
        width: '1000px',
        data: { countries: this.countries, isLoading: this.isLoading },
        panelClass: 'choose-country',
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.country = result;
          this.step = program.id;
          this.selectedProgram = program;
          this.changeProgram.emit({
            program: program?.id?.toString(),
            country: this.country,
          });
        }
      });
    } else {
      this.step = program.id;
      this.selectedProgram = program;
      this.changeProgram.emit({ program: program?.id?.toString() });
    }
  }

  onViewPrices(): void {
    const dialogRef = this._dialog.open(ViewPricesDialog, {
      width: '800px',
      data: { fields: this.fields, subjects: this.subjects },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}

@Component({
  selector: 'choose-country-dialog',
  templateUrl: 'choose-country-dialog.html',
  styleUrls: ['./learning-environment.component.scss'],
})
export class ChooseCountryDialog {
  isLoading: boolean;
  countries: ICountry[];

  constructor(
    public dialogRef: MatDialogRef<ChooseCountryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.countries = data.countries;
      this.isLoading = data.isLoading;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectCountry(countryId: number): void {
    this.dialogRef.close(countryId);
  }
}

@Component({
  selector: 'view-prices-dialog',
  templateUrl: 'view-prices-dialog.html',
  styleUrls: ['./learning-environment.component.scss'],
})
export class ViewPricesDialog {
  fieldId!: string;
  fields: IField[];
  subjects: ISubject[];

  constructor(
    public dialogRef: MatDialogRef<ViewPricesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.fields = data.fields;
      this.subjects = data.subjects;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
