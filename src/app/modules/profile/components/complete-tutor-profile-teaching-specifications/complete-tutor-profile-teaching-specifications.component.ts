import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  AVAILABILITY_HOURS_CONST,
  COURSE_TUITION_TYPES_CONST,
  SORTED_DAYS_WEEK,
  generalConstants,
} from 'src/app/config';
import {
  ICountry,
  IField,
  ILevel,
  IProgram,
  ISubject,
} from 'src/app/core/models';
import { FormValidationUtilsService } from 'src/app/core/validators';

@Component({
  selector: 'metutors-complete-tutor-profile-teaching-specifications',
  templateUrl:
    './complete-tutor-profile-teaching-specifications.component.html',
  styleUrls: [
    './complete-tutor-profile-teaching-specifications.component.scss',
  ],
  providers: [DatePipe],
})
export class CompleteTutorProfileTeachingSpecificationsComponent
  implements OnInit
{
  @Input() loading: boolean | null;
  @Input() fields: IField[] | null;
  @Input() levels: ILevel[] | null;
  @Input() programs: IProgram[] | null;
  @Input() countries: ICountry[] | null;
  @Input() subjectsList: ISubject[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() changeField = new EventEmitter();

  form: FormGroup;
  openSubject = true;
  minDate = new Date();
  days = SORTED_DAYS_WEEK;
  selectedSubject: number = 0;
  selectedDays: number[] = [];
  types = COURSE_TUITION_TYPES_CONST;
  nationalId = generalConstants.nationalId;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _datePipe: DatePipe,
    private _fv: FormValidationUtilsService
  ) {
    this.form = this._fb.group({
      levelOfEducation: [null, [Validators.required]],
      salaryPerHour: [
        null,
        [
          Validators.required,
          Validators.min(5),
          Validators.max(999),
          this._fv.numbersOnlyValidation,
        ],
      ],
      startDate: [null, [Validators.required]],
      subjects: this._fb.array([]),
      endDate: [null, [Validators.required]],
      program: [null, Validators.required],
      country: [null],
      availability: this._fb.array([]),
      typeOfTutoring: [null, [Validators.required]],
    });

    this.addSubject();
    SORTED_DAYS_WEEK.forEach(() => {
      this.addAvailability();
    });
  }

  ngOnInit(): void {}

  returnZero(): number {
    return 0;
  }

  get levelOfEducation(): AbstractControl | null {
    return this.form.get('levelOfEducation');
  }

  get salaryPerHour(): AbstractControl | null {
    return this.form.get('salaryPerHour');
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get endDate(): AbstractControl | null {
    return this.form.get('endDate');
  }

  get typeOfTutoring(): AbstractControl | null {
    return this.form.get('typeOfTutoring');
  }

  get program(): AbstractControl | null {
    return this.form.get('program');
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get availability(): FormArray {
    return this.form?.get('availability') as FormArray;
  }

  get subjects(): FormArray {
    return this.form?.get('subjects') as FormArray;
  }

  removeSubject(i: number): void {
    (this.form?.get('subjects') as FormArray).removeAt(i);

    if (this.form.value.subjects.length === 0) {
      this.addSubject();
    }
  }

  newSubject(): FormGroup {
    return this._fb.group({
      field: [null, Validators.required],
      subject: [null, Validators.required],
    });
  }

  addSubject(): void {
    this.subjects.push(this.newSubject());
  }

  newAvailability(): FormGroup {
    return this._fb.group({
      day: [null],
      timeSlots: [[]],
    });
  }

  addAvailability(): void {
    this.availability.push(this.newAvailability());
  }

  onChangeDay(index: number): void {
    if (this.selectedDays.includes(index)) {
      this.selectedDays.splice(this.selectedDays.indexOf(index), 1);
      this.availability.at(index).patchValue({ day: null, timeSlots: [] });
    } else {
      this.selectedDays.push(index);
      this.availability.at(index).patchValue({ day: index });
      this.openDialog(index);
    }
  }

  onChangeField(event: any): void {
    this.changeField.emit(event?.value?.id);
  }

  onOpenChange(state: boolean, index: number): void {
    if (state === false) {
      this.selectedSubject = index + 1;
    }
  }

  openDialog(index: number) {
    const dialogRef = this._dialog.open(DialogSelectAvailabilityDialog, {
      width: '500px',
      data: index,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.length) {
        this.availability
          .at(index)
          .patchValue({ day: index, timeSlots: result });
      } else {
        this.selectedDays.splice(this.selectedDays.indexOf(index), 1);
        this.availability.at(index).patchValue({ day: null, timeSlots: [] });
      }
    });
  }

  submitFormData() {
    const data = {
      step: '4',
      level_of_education: this.levelOfEducation?.value,
      type_of_tutoring: this.typeOfTutoring?.value,
      expected_salary_per_hour: this.salaryPerHour?.value,
      availability_start_date: this._datePipe.transform(
        this.startDate?.value,
        'yyyy-MM-dd'
      ),
      availability_end_date: this._datePipe.transform(
        this.endDate?.value,
        'yyyy-MM-dd'
      ),
      subjects: this.subjects?.value?.map((subject: any) => ({
        field_id: subject?.field?.id,
        subject_id: [subject?.field?.id],
      })),
      program_id: this.program?.value,
      country_id: this.country?.value,
      availability: this.availability?.value
        ?.filter((itm: any) => itm?.day != null)
        ?.map((item: any) => ({
          day: item?.day,
          time_slots: item?.timeSlots?.map((slot: any) => ({
            start_time: slot?.startTime,
            end_time: slot?.endTime,
          })),
        })),
    };

    this.submitForm.emit(data);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'select-availability-hours.dialog.html',
  styleUrls: [
    './complete-tutor-profile-teaching-specifications.component.scss',
  ],
})
export class DialogSelectAvailabilityDialog {
  id!: number;
  selectedHoursList: any = [];
  selectedHours: number[] = [];
  hours = AVAILABILITY_HOURS_CONST;

  constructor(
    public dialogRef: MatDialogRef<DialogSelectAvailabilityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectHour(hour: any, index: number): void {
    if (this.selectedHours.includes(index)) {
      this.selectedHours.splice(this.selectedHours.indexOf(index), 1);
      this.selectedHoursList.forEach((item: any, i: number) => {
        if (item.id === index) this.selectedHoursList.splice(i, 1);
      });
    } else {
      this.selectedHours.push(index);
      this.selectedHoursList.push({
        id: index,
        startTime: hour?.startTime,
        endTime: hour?.endTime,
      });
    }
  }
}
