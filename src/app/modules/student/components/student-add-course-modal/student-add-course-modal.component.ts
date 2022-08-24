import {
  Inject,
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';

import {
  state,
  style,
  group,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import {
  WEEK_DAYS,
  LONG_DAYS_WEEK,
  WEEK_FULL_DAYS,
  SORTED_DAYS_WEEK,
  calculateListDays,
  calculateDurationTime,
  generalConstants,
} from '@metutor/config';

import groupBy from 'lodash/groupBy';
import { DatePipe } from '@angular/common';
import { IClass, IInvoiceDetails } from '@metutor/core/models';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormValidationUtilsService } from '@metutor/core/validators';

@Component({
  selector: 'metutors-student-add-course-modal',
  templateUrl: './student-add-course-modal.component.html',
  styleUrls: ['./student-add-course-modal.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
  providers: [DatePipe],
})
export class StudentAddCourseModalComponent implements OnInit {
  @Input() set timeSlots(slots: any) {
    if (slots) {
      this.timeSlot = slots;
      this.availabilities = groupBy(slots.availabilites, 'day');

      if (slots?.weekdays?.length) {
        slots.weekdays.forEach((day: any) =>
          this.weekDays.push(WEEK_DAYS[day])
        );
      }
    }
  }

  @Input() price: number;
  @Input() isCreating: boolean;
  @Input() showModal: boolean = false;
  @Input() isLoadingTimeSlots: boolean;
  @Input() invoiceDetails: IInvoiceDetails;
  @Input() isLoadingInvoiceDetails: boolean;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() calculateInvoice: EventEmitter<any> = new EventEmitter<any>();
  @Output() tutorAvailability: EventEmitter<void> = new EventEmitter<void>();

  step = 1;
  lastStep = 1;
  timeSlot: any;
  form: FormGroup;
  availabilities: any;
  weekDays: any[] = [];
  minDate = new Date();
  classrooms!: IClass[];
  objectKeys = Object.keys;
  listDays = LONG_DAYS_WEEK;
  heading = 'Add New Classes';
  weekDayName = WEEK_FULL_DAYS;
  daysSorted = SORTED_DAYS_WEEK;
  classroomTimeDuration = generalConstants.classroomTimeDuration;
  subHeading =
    "Kindly view tutor's availability prior to selecting new date and time";

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _datePipe: DatePipe,
    private _fv: FormValidationUtilsService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group(
      {
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        days: [null, Validators.required],
        duration: [{ value: 0, disabled: true }, Validators.required],
        hours: [{ value: 0, disabled: true }, Validators.required],
        totalClasses: [{ value: 0, disabled: true }, Validators.required],
        tempDuration: [0, Validators.required],
        tempHours: [0, Validators.required],
        tempTotalClasses: [0, Validators.required],
        classes: [null],
      },
      {
        validators: this._fv.classroomTimeDurationValidator(
          'tempDuration',
          'startTime',
          'endTime'
        ),
      }
    );
  }

  get startTime(): AbstractControl | null {
    return this.form.get('startTime');
  }

  get endTime(): AbstractControl | null {
    return this.form.get('endTime');
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get endDate(): AbstractControl | null {
    return this.form.get('endDate');
  }

  get duration(): AbstractControl | null {
    return this.form.get('duration');
  }

  get tempDuration(): AbstractControl | null {
    return this.form.get('tempDuration');
  }

  get days(): AbstractControl | null {
    return this.form.get('days');
  }

  get totalClasses(): AbstractControl | null {
    return this.form.get('totalClasses');
  }

  get tempTotalClasses(): AbstractControl | null {
    return this.form.get('tempTotalClasses');
  }

  get hours(): AbstractControl | null {
    return this.form.get('hours');
  }

  get tempHours(): AbstractControl | null {
    return this.form.get('tempHours');
  }

  get allHours(): number {
    return this.classrooms?.reduce(
      (sum: number, hr: any) => sum + +hr?.duration,
      0
    );
  }

  get classes(): AbstractControl | null {
    return this.form.get('classes');
  }

  onCheckout(form: FormGroup): void {
    this.step = 4;
    this.subHeading = '';
    this.heading = 'Checkout';

    this.calculateInvoice.emit(form.value);
  }

  generateClassrooms(form: FormGroup): void {
    if (form.valid) {
      const value: any = this._generateClassroomForm(form.value);
      const listDates = calculateListDays(value.startDate, value.endDate);

      this.classrooms = [];
      listDates.forEach((date, index) => {
        if (value.days?.includes(SORTED_DAYS_WEEK[new Date(date).getDay()])) {
          this.classrooms.push({
            number: index + 1,
            date,
            startTime: value.startTime,
            endTime: value.endTime,
            duration: value.duration,
          });
        }
      });

      this.step = 2;
      this.lastStep = 2;
      this.subHeading = 'Please review new class schedule';
      this.classes?.setValidators([Validators.required]);
      this.classes?.setValue(this.classrooms);
      this.classes?.updateValueAndValidity();
    }
  }

  returnZero(): number {
    return 0;
  }

  onTutorsAvailability(): void {
    this.step = 3;
    this.subHeading = '';
    this.heading = 'Tutor Availability';
    this.tutorAvailability.emit();
  }

  goBack(): void {
    this.step = this.lastStep;
    this.heading = 'Add New Classes';

    this.subHeading =
      this.step === 1
        ? 'Please select classes date to view Tutors availability'
        : 'Please review new class schedule';
  }

  onChangeDateDay(): void {
    if (this.startDate?.value && this.endDate?.value) {
      if (this.endDate.value < this.startDate.value) {
        this.endDate.setValue(null);
      }
    }

    if (
      this.startDate?.value &&
      this.endDate?.value &&
      this.days?.value &&
      this.days?.value.length
    ) {
      const daysCalculated = calculateListDays(
        this.startDate?.value,
        this.endDate?.value
      );

      let repeated = 0;
      daysCalculated.forEach((day) => {
        if (
          this.days?.value.includes(this.daysSorted[new Date(day).getDay()])
        ) {
          repeated = repeated + 1;
        }
      });

      this.totalClasses?.setValue(repeated);
      this.tempTotalClasses?.setValue(repeated);
      this.hours?.setValue(
        +(+this.tempDuration?.value * +this.tempTotalClasses?.value).toFixed(2)
      );
      this.tempHours?.setValue(
        +(+this.tempDuration?.value * +this.tempTotalClasses?.value).toFixed(2)
      );

      return;
    }

    this.totalClasses?.setValue(0);
    this.tempTotalClasses?.setValue(0);
    this.hours?.setValue(0);
    this.tempHours?.setValue(0);
  }

  onChangeDate(): void {
    this.days?.setValue(null);
  }

  onChangeTimePicker(): void {
    if (this.startTime?.value && this.endTime?.value) {
      const duration = calculateDurationTime(
        this.startTime?.value,
        this.endTime?.value
      );
      this.duration?.setValue(duration);
      this.tempDuration?.setValue(duration);
      this.hours?.setValue(
        +(+this.duration?.value * +this.totalClasses?.value).toFixed(2)
      );
      this.tempHours?.setValue(
        +(+this.tempDuration?.value * +this.tempTotalClasses?.value).toFixed(2)
      );

      return;
    }

    this.duration?.setValue(0);
    this.tempDuration?.setValue(0);
    this.hours?.setValue(0);
    this.tempHours?.setValue(0);
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
          this.daysSorted[new Date(dayCalculated).getDay()].toLowerCase() ===
          day.toLowerCase()
        ) {
          isDisabled = false;
        }
      });
    }

    return isDisabled;
  }

  deleteClassroom(id: number | undefined): void {
    const dialogRef = this._dialog.open(DialogRemoveClassroom, {
      width: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.classrooms.forEach((classroom, index) => {
          if (classroom?.number === result) {
            this.classrooms.splice(index, 1);
            this.classes?.setValue(this.classrooms);
          }
        });
      }
    });
  }

  editClassroom(classroom: IClass): void {
    const dialogRef = this._dialog.open(DialogEditClassroom, {
      width: '800px',
      data: { classroom },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.classrooms.forEach((classroom, index) => {
          if (classroom?.number === result?.number) {
            this.classrooms[index] = result;
            this.classes?.setValue(this.classrooms);
          }
        });
      }
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.updatedClassroom.subscribe((result) => {
        if (result) {
          this.classrooms.forEach((classroom, index) => {
            if (classroom?.number === result?.number) {
              this.classrooms[index] = result;
              this.classes?.setValue(this.classrooms);
            }
            dialogSubmitSubscription.unsubscribe();
          });
        }
      });
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit({
        ...form.value,
        totalPrice: this.price * +this.allHours,
      });
    }
  }

  private _generateClassroomForm(form: any) {
    return {
      classes: form?.tempTotalClasses,
      days: form.days,
      duration: form?.tempDuration,
      startDate: this._datePipe.transform(
        new Date(form?.startDate),
        'yyyy-MM-dd'
      ),
      endDate: this._datePipe.transform(new Date(form?.endDate), 'yyyy-MM-dd'),
      startTime: form?.startTime,
      endTime: form?.endTime,
      hours: form?.tempHours,
      type: form?.type,
      seatAttendees: form?.seatAttendees,
    };
  }
}

@Component({
  selector: 'dialog-confirm-delete-classroom',
  templateUrl: 'dialog-confirm-delete-classroom.component.html',
  styles: [
    `
      .confirm-delete h2 {
        font-size: 20px;
        font-weight: bold;
      }
      .confirm-delete p {
        color: #696969;
        font-size: 18px;
      }
      .confirm-delete .btn-confirm {
        background-color: #ff554b;
        color: #fff;
        font-weight: bold;
        padding: 0 20px;
      }
    `,
  ],
})
export class DialogRemoveClassroom {
  constructor(
    public dialogRef: MatDialogRef<DialogRemoveClassroom>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-confirm-edit-classroom',
  templateUrl: 'dialog-confirm-edit-classroom.component.html',
  styleUrls: ['./student-add-course-modal.component.scss'],
  providers: [DatePipe],
})
export class DialogEditClassroom implements OnInit {
  @Output() updatedClassroom = new EventEmitter<IClass>();

  editForm: FormGroup;
  minDate = new Date();
  listDays = LONG_DAYS_WEEK;
  classroomTimeDuration = generalConstants.classroomTimeDuration;

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _fv: FormValidationUtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogEditClassroom>
  ) {
    this.editForm = this._fb.group(
      {
        startDate: [null, Validators.required],
        days: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        duration: [{ value: 0, disabled: true }, Validators.required],
        tempDuration: [0, Validators.required],
        number: [0],
      },
      {
        validators: this._fv.classroomTimeDurationValidator(
          'tempDuration',
          'startTime',
          'endTime'
        ),
      }
    );

    if (data) {
      const classroom = data.classroom;
      this.editForm.patchValue({
        number: classroom.number,
        startDate: new Date(classroom.date),
        days: this._datePipe.transform(new Date(classroom.date), 'EEEE'),
        startTime: classroom.startTime,
        endTime: classroom.endTime,
        duration: classroom.duration,
        tempDuration: classroom.duration,
      });
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  get days(): AbstractControl | null {
    return this.editForm.get('days');
  }

  get startDate(): AbstractControl | null {
    return this.editForm.get('startDate');
  }

  get startTime(): AbstractControl | null {
    return this.editForm.get('startTime');
  }

  get endTime(): AbstractControl | null {
    return this.editForm.get('endTime');
  }

  get duration(): AbstractControl | null {
    return this.editForm.get('duration');
  }

  get tempDuration(): AbstractControl | null {
    return this.editForm.get('tempDuration');
  }

  onChangeTimePicker(): void {
    if (this.startTime?.value && this.endTime?.value) {
      const duration = calculateDurationTime(
        this.startTime?.value,
        this.endTime?.value
      );
      this.duration?.setValue(duration);
      this.tempDuration?.setValue(duration);

      return;
    }

    this.duration?.setValue(0);
    this.tempDuration?.setValue(0);
  }

  onChangeDate(): void {
    if (this.startDate?.value) {
      this.days?.setValue(
        this._datePipe.transform(new Date(this.startDate.value), 'EEEE')
      );
    }
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      const value: IClass = {
        number: form.value.number,
        date:
          this._datePipe.transform(
            new Date(form.value.startDate),
            'yyyy-MM-dd'
          ) || '',
        startTime: form.value.startTime,
        endTime: form.value.endTime,
        duration: form.value.tempDuration,
      };

      this.updatedClassroom.emit(value);
      this.dialogRef.close();
    }
  }
}
