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
  SORTED_DAYS_WEEK,
  AVAILABILITY_HOURS_CONST,
  COURSE_TUITION_TYPES_CONST,
} from 'src/app/config';
import { ILevel } from 'src/app/core/models';

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
  @Input() levels: ILevel[] | null;

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  minDate = new Date();
  days = SORTED_DAYS_WEEK;
  selectedDays: number[] = [];
  types = COURSE_TUITION_TYPES_CONST;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _datePipe: DatePipe
  ) {
    this.form = this._fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      availability: this._fb.array([]),
      typeOfTutoring: [null, [Validators.required]],
    });

    SORTED_DAYS_WEEK.forEach(() => {
      this.addAvailability();
    });
  }

  ngOnInit(): void {}

  returnZero(): number {
    return 0;
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

  get availability(): FormArray {
    return this.form?.get('availability') as FormArray;
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
      type_of_tutoring: this.typeOfTutoring?.value,
      availability_start_date: this._datePipe.transform(
        this.startDate?.value,
        'yyyy-MM-dd'
      ),
      availability_end_date: this._datePipe.transform(
        this.endDate?.value,
        'yyyy-MM-dd'
      ),
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
