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
  generalConstants,
  calculateListDays,
  calculateDurationTime,
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

  @Input() course: any;
  @Input() price: number;
  @Input() isCreating: boolean;
  @Input() isGetInvoiceEmail: boolean;
  @Input() showModal: boolean = false;
  @Input() isLoadingTimeSlots: boolean;
  @Input() invoiceDetails: IInvoiceDetails;
  @Input() isLoadingInvoiceDetails: boolean;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() getInvoiceEmail: EventEmitter<any> = new EventEmitter<any>();
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
    this.heading = 'CHECKOUT';

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

  getInvoicingEmail(invoiceDetails: IInvoiceDetails): void {
    this.getInvoiceEmail.emit({
      noOfClasses: invoiceDetails.noOfClasses,
      pricePerHour: invoiceDetails.pricePerHour,
      totalHours: invoiceDetails.totalHours,
      totalAmount: invoiceDetails.totalAmount,
      invoiceNumber: '#IN37738',
      date: new Date(),
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

  printToCart(invoiceDetails: IInvoiceDetails): void {
    const values = this.form.value;
    const popupWinindow = window.open(
      '',
      '_blank',
      'toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=4000, height=4000'
    );

    popupWinindow?.document.open();
    popupWinindow?.document.write(
      `
      <html>
        <head>
          <title>Invoice Details</title>
          <link href="https://fonts.googleapis.com/css2?family=Proxima+Nova" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
          *{font-family: "Proxima Nova", sans-serif;} body{padding:20px}
          .invoice-header {margin-bottom: 35px;} .invoice-header span { margin-right: 5px; } .invoice-header .invoice-email, .invoice-header .print, ul li.coupon, .pay-now { display:none !important } ul li { margin-bottom: 15px; } ul li span { color: #696969; font-size: 16px; } ul li strong { color: #000; font-size: 16px; } ul li.promocode span, ul li.promocode strong { color: #ff554b; } ul li.total-payment { padding: 15px 0; border-top: 1px solid #e2e2e2; } ul li.coupon span, ul li.total-payment span, ul li.coupon strong, ul li.total-payment strong { font-size: 18px; } .have-coupon input { border-radius: 4px 0 0 4px; } .have-coupon button { border-radius: 0 4px 4px 0; background-color: #2a2a2a; color: #fff; }
          .class-details h2 { color: #2a2a2a; font-size: 20px; height: 50px; } .class-details .card { border-radius: 12px; border: solid 1px #e2e2e2; background-color: #fff; box-shadow: none; margin-bottom: 20px; } .class-details .card h3 { color: #696969; font-size: 16px; } .class-details .card h4 { white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis; color: #2a2a2a; font-size: 16px; font-weight: bold; } .class-details .card h5 { color: #2a2a2a; font-size: 13px; margin: 10px 0 0; } .class-details .card .count { color: #ff8300; font-weight: bold; margin-right: 5px; } .class-details .card .review { color: #7d7d7d; font-size: 14px; } .class-details .card ul li { margin: 5px 0; } .class-details .card ul li span { margin-left: 10px; color: #2a2a2a; font-size: 15px; } .class-details .card .informations span { color: #696969 !important; } .class-details .card .informations strong { color: #2a2a2a; font-size: 14px; } .class-details .card .b-border { padding-bottom: 1rem; border-bottom: 1px solid #e2e2e2; } .class-details .card .info img { width: 40px; height: 40px; border-radius: 50%; } .class-details .card .info h2 { color: #2a2a2a; font-size: 14px; height: auto; font-weight: bold; } .class-details .card .info h3 { color: #696969; font-size: 12px; margin: 0; } .class-details .card .info h6 { color: #696969; font-size: 16px; margin-bottom: 15px; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="container invoice-details mt-15-sm p-0">
            <div class="row flex-column-reverse-sm">
              <div class="col-md-8">
                <h2 class="f-size-30-md-sm h-auto-sm">Invoice details</h2>
                <div class="card">
                  <div class="card-body">
                    <div class="row invoice-header">
                    <div class="col-md-9">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item mb-0 me-4">
                          <span class="f-size-15-md-sm">Invoice #</span>
                          <strong class="f-size-15-md-sm">IN37738</strong>
                        </li>
                        <li class="list-inline-item mb-0 me-4">
                          <span class="f-size-15-md-sm">Order #</span>
                          <strong class="f-size-15-md-sm">IN37738</strong>
                        </li>
                        <li class="list-inline-item mb-0 me-4">
                          <span class="f-size-15-md-sm">Date #</span>
                          <strong class="f-size-15-md-sm">${this._datePipe.transform(
                            new Date(),
                            'MMM dd, y'
                          )}</strong>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h3 class="title f-size-20-md-sm mt-15-sm">Invoice Details</h3>
                    <ul class="list-unstyled">
                      <li class="d-flex justify-content-between">
                        <span class="f-size-15-md-sm">Total Hours </span>
                        <strong class="f-size-15-md-sm">${
                          invoiceDetails?.totalHours
                        } hour${
        +invoiceDetails?.totalHours! > 1 ? 's' : ''
      }</strong>
                      </li>
                      <li class="d-flex justify-content-between">
                        <span class="f-size-15-md-sm">Hourly Rate</span>
                        <strong class="f-size-15-md-sm">$${
                          invoiceDetails?.pricePerHour
                        }</strong>
                      </li>
                      <li class="d-flex justify-content-between">
                        <span class="f-size-15-md-sm">Total Amount Due</span>
                        <strong class="f-size-15-md-sm">$${
                          invoiceDetails?.totalAmount
                        }</strong>
                      </li>
                      <li class="d-flex justify-content-between promocode">
                        <span class="f-size-15-md-sm">Promo code 0% off</span>
                        <strong class="f-size-15-md-sm">$0.00</strong>
                      </li>
                      <li class="d-flex justify-content-between total-payment">
                        <span class="f-size-15-md-sm">Total payment</span>
                        <strong class="f-size-15-md-sm">$${
                          invoiceDetails?.totalAmount
                        }</strong>
                      </li>
                    </ul>                
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                  <div class="class-details">
                  <h2 class="d-flex align-items-center f-size-17-md-sm h-auto-sm">Classroom Details</h2>
                  <div class="card">
                    <div class="card-body">
                      <ul class="list-unstyled row informations b-border">
                        <li class="col-12 d-flex justify-content-between">
                          <span class="m-0">Course ID</span>
                          <strong>CID${this.course?.id}</strong>
                        </li>
                        <li class="col-12">
                          <span class="m-0 d-block">Course Details</span>
                          <strong class="d-block">${
                            this.course?.courseName
                          }</strong>
                        </li>
                        <li class="col-12">
                          <span class="m-0 d-block">Program</span>
                          <strong class="d-block">${
                            this.course?.program?.name
                          }</strong>
                        </li>
                        <li class="col-12">
                          <span class="m-0 d-block">Course Field</span>
                          <strong class="d-block">${
                            this.course?.field?.name
                          }</strong>
                        </li>
                        <li class="col-12">
                          <span class="m-0 d-block">Tutoring Language</span>
                          <strong class="d-block">${
                            this.course?.language?.name
                          }</strong>
                        </li>
                        <li class="col-12">
                          <span class="m-0 d-block">Tutoring Type</span>
                          <strong class="d-block">${this.course?.classroomType}</strong>
                        </li>
                      </ul>
                
                      <h3 class="details">Classroom Details</h3>
                      <ul class="list-unstyled row b-border">
                        <li class="col-12">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
                            <g fill="none" fill-rule="evenodd">
                              <g>
                                <g>
                                  <g>
                                    <g>
                                      <g>
                                        <g>
                                          <path d="M0 0L18 0 18 18 0 18z"
                                            transform="translate(-226 -1999) translate(0 1315) translate(210 343) translate(6 6) translate(10 275) translate(0 60)" />
                                          <path fill="#949494" fill-rule="nonzero"
                                            d="M9.75 13.5V15h3v1.5h-7.5V15h3v-1.5h-6c-.414 0-.75-.336-.75-.75V3c0-.414.336-.75.75-.75h13.5c.414 0 .75.336.75.75v9.75c0 .414-.336.75-.75.75h-6zM7.5 5.625v4.5l3.75-2.25-3.75-2.25z"
                                            transform="translate(-226 -1999) translate(0 1315) translate(210 343) translate(6 6) translate(10 275) translate(0 60)" />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span>Total Classes: ${
                            values?.tempTotalClasses
                          } Class${
        +values?.tempTotalClasses! > 1 ? 'es' : ''
      }</span>
                        </li>
                        <li class="col-12">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
                            <g fill="none" fill-rule="evenodd">
                              <g>
                                <g>
                                  <g>
                                    <g>
                                      <g>
                                        <g>
                                          <path d="M0 0L18 0 18 18 0 18z"
                                            transform="translate(-418 -1999) translate(0 1315) translate(210 343) translate(6 6) translate(10 275) translate(192 60)" />
                                          <path fill="#949494" fill-rule="nonzero"
                                            d="M12.75 2.25h3c.414 0 .75.336.75.75v12c0 .414-.336.75-.75.75H2.25c-.414 0-.75-.336-.75-.75V3c0-.414.336-.75.75-.75h3V.75h1.5v1.5h4.5V.75h1.5v1.5zM3 6.75v7.5h12v-7.5H3zm1.5 3h3.75v3H4.5v-3z"
                                            transform="translate(-418 -1999) translate(0 1315) translate(210 343) translate(6 6) translate(10 275) translate(192 60)" />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span>Start Date: ${this._datePipe.transform(
                            new Date(values?.startDate),
                            'yyyy-MM-dd'
                          )}</span>
                        </li>
                        <li class="col-12">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M7 8H6.5V20H17.5V8H17H7ZM19.5 8V20H20C20.5523 20 21 19.5523 21 19V9C21 8.44772 20.5523 8 20 8H19.5ZM4 8H4.5V20H4C3.44772 20 3 19.5523 3 19V9C3 8.44772 3.44772 8 4 8ZM17 6H20C21.6569 6 23 7.34315 23 9V19C23 20.6569 21.6569 22 20 22H4C2.34315 22 1 20.6569 1 19V9C1 7.34315 2.34315 6 4 6H7C7 4.34315 8.34315 3 10 3H14C15.6569 3 17 4.34315 17 6ZM15 6C15 5.44772 14.5523 5 14 5H10C9.44772 5 9 5.44772 9 6H15Z"
                              fill="#92929D" />
                          </svg>
                          <span>End Date: ${this._datePipe.transform(
                            new Date(values?.endDate),
                            'yyyy-MM-dd'
                          )}</span>
                        </li>
                        <li class="col-12">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
                            <g fill="none" fill-rule="evenodd">
                              <g>
                                <g>
                                  <g>
                                    <g>
                                      <g>
                                        <g>
                                          <path d="M0 0L18 0 18 18 0 18z"
                                            transform="translate(-226 -2029) translate(0 1315) translate(210 343) translate(6 6) translate(10 275) translate(0 90)" />
                                          <path fill="#949494" fill-rule="nonzero"
                                            d="M9 16.5c-4.142 0-7.5-3.358-7.5-7.5 0-4.142 3.358-7.5 7.5-7.5 4.142 0 7.5 3.358 7.5 7.5 0 4.142-3.358 7.5-7.5 7.5zM9.75 9V5.25h-1.5v5.25h4.5V9h-3z"
                                            transform="translate(-226 -2029) translate(0 1315) translate(210 343) translate(6 6) translate(10 275) translate(0 90)" />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span>Time: ${values?.startTime} : ${
        values?.endTime
      }</span>
                        </li>
                        <li class="col-12">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 18 18">
                            <g fill="none" fill-rule="evenodd">
                              <g>
                                <g>
                                  <g>
                                    <g>
                                      <g>
                                        <path d="M0 0L18 0 18 17.963 0 17.963z"
                                          transform="translate(-626 -1939) translate(0 1315) translate(610 343) translate(6 6) translate(10 275)" />
                                        <path fill="#949494" fill-rule="nonzero"
                                          d="M9 1.497c4.14 0 7.5 3.353 7.5 7.485 0 4.131-3.36 7.484-7.5 7.484-4.14 0-7.5-3.353-7.5-7.484C1.5 4.85 4.86 1.497 9 1.497zm2.652 3.78L7.94 8.982 9 10.04l3.713-3.705-1.061-1.058z"
                                          transform="translate(-626 -1939) translate(0 1315) translate(610 343) translate(6 6) translate(10 275)" />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          <span>Duration : ${values?.tempHours} hour${
        +values?.tempHours! > 1 ? 's' : ''
      }</span>
                        </li>
                      </ul>
                
                      <div class="row info">
                        <h6 class="details col-12">Classroom tutor</h6>
                        <div class="col-lg-2 col-3">
                          <img src="${
                            this.course?.teacher?.avatar
                          }" alt="" draggable="false">
                        </div>
                        <div class="col-lg-10 col-9 d-flex justify-content-center flex-column">
                          <h2><bdi>${this.course?.teacher?.firstName} ${
        this.course?.teacher?.lastName
      }</bdi></h2>
                          <h3>${
                            this.course?.teacher?.userQualification
                              ?.nameOfUniversity
                          } </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>            
              </div>
            </div>
          </div>
        </body>
      </html>`
    );
    popupWinindow?.document.close();
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
