import { DatePipe } from '@angular/common';
import { ILevel, ITutor } from 'src/app/core/models';
import {
  Input,
  Inject,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  SORTED_DAYS_WEEK,
  calculateListDays,
  convertTimeToDateISO,
  AVAILABILITY_HOURS_CONST,
  COURSE_TUITION_TYPES_CONST,
} from 'src/app/config';

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
  @Input() set tutor(_tutor: ITutor) {
    if (_tutor) {
      this.form.patchValue({
        startDate: _tutor?.specifications?.availabilityStartDate,
        endDate: _tutor?.specifications?.availabilityEndDate,
        typeOfTutoring: _tutor?.specifications?.typeOfTutoring,
      });

      const output: any[] = [];
      _tutor?.availability?.forEach((avail: any) => {
        if (!this.selectedDays.includes(+avail?.day)) {
          this.selectedDays.push(+avail?.day);
        }

        const existing = output.filter((v) => +v.day == +avail.day);

        if (existing.length) {
          const existingIndex = output.indexOf(existing[0]);

          output[existingIndex].timeSlots = [
            ...output[existingIndex].timeSlots,
            {
              id: avail?.id,
              startTime: avail?.timeFrom,
              endTime: avail?.timeTo,
            },
          ];
        } else {
          output.push({
            day: +avail.day,
            timeSlots: [
              {
                id: avail?.id,
                startTime: avail?.timeFrom,
                endTime: avail?.timeTo,
              },
            ],
          });
        }
      });

      output.forEach((item) => {
        this.availability
          .at(item.day)
          .patchValue({ day: item.day, timeSlots: item.timeSlots });
      });

      this.form?.updateValueAndValidity();
      this.form?.markAsDirty();
    }
  }

  @Output() changeStep = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  minDate = new Date();
  maxDate = new Date();
  days = SORTED_DAYS_WEEK;
  selectedDays: number[] = [];
  types = COURSE_TUITION_TYPES_CONST;

  constructor(private _fb: FormBuilder, private _dialog: MatDialog) {
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

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 80);
  }

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
      // this.selectedDays.splice(this.selectedDays.indexOf(index), 1);
      // this.availability.at(index).patchValue({ day: null, timeSlots: [] });
      this.openDialog(index, this.availability.value[index]);
    } else {
      this.selectedDays.push(index);
      this.availability.at(index).patchValue({ day: index });
      this.openDialog(index, null);
    }
  }

  onChangeStartDate(): void {
    this.endDate?.setValue(null);
    this.endDate?.updateValueAndValidity();
  }

  openDialog(index: number, data: any) {
    const dialogRef = this._dialog.open(DialogSelectAvailabilityDialog, {
      width: '500px',
      data: { index, data },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.length) {
        this.availability.at(index).patchValue({
          day: index,
          timeSlots: result?.map((slot: any) => ({
            startTime: convertTimeToDateISO(slot?.startTime),
            endTime: convertTimeToDateISO(slot?.endTime),
          })),
        });
      } else {
        this.selectedDays.splice(this.selectedDays.indexOf(index), 1);
        this.availability.at(index).patchValue({ day: null, timeSlots: [] });
      }

      this.form?.markAsDirty();
      this.form?.markAsTouched();
    });
  }

  checkDisabledDays(day: string): boolean {
    let isDisabled = true;

    if (this.startDate?.value && this.endDate?.value) {
      const daysCalculated = calculateListDays(
        this.startDate?.value,
        this.endDate?.value
      );

      daysCalculated.forEach((dayCalculated) => {
        if (
          SORTED_DAYS_WEEK[new Date(dayCalculated).getDay()].toLowerCase() ===
          day.toLowerCase()
        ) {
          isDisabled = false;
        }
      });
    }

    return isDisabled;
  }

  submitFormData() {
    if (this.form.touched) {
      const data = {
        step: '4',
        type_of_tutoring: this.typeOfTutoring?.value,
        availability_start_date: new Date(this.startDate?.value).toISOString(),
        availability_end_date: new Date(this.endDate?.value).toISOString(),
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
    } else {
      this.changeStep.emit(5);
    }
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
  tempHours: any = [];
  selectedHoursList: any = [];
  selectedHours: number[] = [];
  hours = AVAILABILITY_HOURS_CONST;

  constructor(
    private _datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogSelectAvailabilityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data.id;

      if (data?.data?.timeSlots && data?.data?.timeSlots?.length) {
        data.data.timeSlots.forEach((item: any) => {
          AVAILABILITY_HOURS_CONST.forEach((hour, index) => {
            if (
              hour.startTime ===
              this._datePipe
                .transform(new Date(item?.startTime), 'hh:mm a')
                ?.toLowerCase()
            ) {
              this.selectedHours.push(index);
              this.selectedHoursList.push({
                id: index,
                startTime: hour?.startTime,
                endTime: hour?.endTime,
              });
            }
          });
        });
      }

      this.tempHours = this.selectedHoursList;
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

  selectAll(): void {
    this.selectedHours = [];
    this.selectedHoursList = [];
    AVAILABILITY_HOURS_CONST.forEach((hour, index) => {
      this.selectedHours.push(index);
      this.selectedHoursList.push({
        id: index,
        startTime: hour?.startTime,
        endTime: hour?.endTime,
      });
    });
  }

  unSelectAll(): void {
    this.selectedHours = [];
    this.selectedHoursList = [];
  }
}
