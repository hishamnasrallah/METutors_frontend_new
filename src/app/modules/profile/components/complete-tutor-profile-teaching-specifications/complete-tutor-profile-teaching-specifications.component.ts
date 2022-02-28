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
  EDUCATION_LEVELS_CONST,
  SORTED_DAYS_WEEK,
} from 'src/app/config';
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
  @Input() loading?: boolean;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  minDate = new Date();
  days = SORTED_DAYS_WEEK;
  selectedDays: number[] = [];
  levels = EDUCATION_LEVELS_CONST;
  types = COURSE_TUITION_TYPES_CONST;

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
      fieldOfStudy: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      availability: this._fb.array([]),
      typeOfTutoring: [null, [Validators.required]],
      teachingDays: [null, [Validators.required]],
      // teachingHours: [null, [Validators.required]],
    });

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

  get fieldOfStudy(): AbstractControl | null {
    return this.form.get('fieldOfStudy');
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get subject(): AbstractControl | null {
    return this.form.get('subject');
  }

  get endDate(): AbstractControl | null {
    return this.form.get('endDate');
  }

  get typeOfTutoring(): AbstractControl | null {
    return this.form.get('typeOfTutoring');
  }

  get teachingDays(): AbstractControl | null {
    return this.form.get('teachingDays');
  }

  // get teachingHours(): AbstractControl | null {
  //   return this.form.get('teachingHours');
  // }

  get availability(): FormArray {
    return this.form?.get('availability') as FormArray;
  }

  removeAvailability(i: number): void {
    (this.form?.get('availability') as FormArray).removeAt(i);
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
      expected_salary_per_hour: this.salaryPerHour?.value,
      field_of_study: this.fieldOfStudy?.value,
      availability_start_date: this._datePipe.transform(
        this.startDate?.value,
        'dd/MM/yyyy'
      ),
      subject: this.subject?.value,
      availability_end_date: this._datePipe.transform(
        this.endDate?.value,
        'dd/MM/yyyy'
      ),
      type_of_tutoring: this.typeOfTutoring?.value,
      teaching_days: this.teachingDays?.value,
      // teaching_hours: this.teachingHours?.value,
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

/**
 * [
   {
      "day":1,
      "time_slots":[
         {
            "time_from":"10:10PM",
            "time_to":"11:50PM"
         },
         {
            "time_from":"10:10PM",
            "time_to":"11:50PM"
         }
      ]
   },
   {
      "day":1,
      "time_slots":[
         {
            "time_from":"10:10PM",
            "time_to":"11:50PM"
         },
         {
            "time_from":"10:10PM",
            "time_to":"11:50PM"
         }
      ]
   }
]
 */
