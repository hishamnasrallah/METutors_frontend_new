import { DatePipe } from '@angular/common';
import {
  Input,
  Inject,
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
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  LONG_DAYS_WEEK,
  generalConstants,
  calculateDurationTime,
} from 'src/app/config';
import { IClass } from 'src/app/core/models';
import { FormValidationUtilsService } from '@metutor/core/validators';

@Component({
  selector: 'metutors-list-classrooms-form',
  templateUrl: './list-classrooms-form.component.html',
  styleUrls: ['./list-classrooms-form.component.scss'],
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
})
export class ListClassroomsFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() selectedCourse!: any;
  @Input() price: number | null;

  @Input() set classrooms(classes: IClass[] | undefined) {
    if (classes) {
      this._classrooms = classes;
      this.classes?.setValue(classes);
      this.classes?.updateValueAndValidity();
    }
  }

  @Output() onBack = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() loadTutors = new EventEmitter<IClass[]>();
  @Output() updatedClassrooms = new EventEmitter<IClass[]>();

  _classrooms: IClass[];

  constructor(private _dialog: MatDialog) {}

  ngOnInit(): void {}

  get classes(): AbstractControl | null {
    return this.form.get('classes');
  }

  get hours(): number {
    return this._classrooms?.reduce(
      (sum: number, hr: any) => sum + +hr?.duration,
      0
    );
  }

  deleteClassroom(id: number | undefined): void {
    const dialogRef = this._dialog.open(DialogRemoveClassroom, {
      width: '500px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._classrooms.forEach((classroom, index) => {
          if (classroom?.number === result) {
            this._classrooms.splice(index, 1);
            this.classes?.setValue(this._classrooms);
            this.classes?.updateValueAndValidity();
            this.updatedClassrooms.emit(this._classrooms);
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
        this._classrooms.forEach((classroom, index) => {
          if (classroom?.number === result?.number) {
            this._classrooms[index] = result;
            this.classes?.setValue(this._classrooms);
            this.classes?.updateValueAndValidity();
            this.updatedClassrooms.emit(this._classrooms);
          }
        });
      }
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.updatedClassroom.subscribe((result) => {
        if (result) {
          this._classrooms.forEach((classroom, index) => {
            if (classroom?.number === result?.number) {
              this._classrooms[index] = result;
              this.classes?.setValue(this._classrooms);
              this.classes?.updateValueAndValidity();
              this.updatedClassrooms.emit(this._classrooms);
            }
            dialogSubmitSubscription.unsubscribe();
          });
        }
      });
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
  styleUrls: ['./list-classrooms-form.component.scss'],
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
