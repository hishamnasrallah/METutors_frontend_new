import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClassroom } from 'src/app/core/models';
import { CoursesService, TutorsService } from 'src/app/core/services';
import { AlertNotificationService } from 'src/app/core/components';

@Component({
  selector: 'metutors-leave-feedback-popup',
  template: '',
})
export class LeaveFeedbackPopupComponent implements OnInit, OnChanges {
  @Input() openLeaveFeedbackPopop?: boolean;
  @Input() classroom?: IClassroom;
  @Input() isStudentView?: boolean;

  @Output() closeDialog = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['openLeaveFeedbackPopop'] &&
      changes['openLeaveFeedbackPopop']?.currentValue
    ) {
      const dialogRef = this.dialog.open(DialogLeaveFeedbackPopup, {
        width: '1000px',
        data: { classroom: this.classroom, isStudentView: this.isStudentView },
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.closeDialog.emit(false);
      });
    }
  }
}

@Component({
  selector: 'leave-feedback-popup',
  templateUrl: './leave-feedback-popup.component.html',
  styleUrls: ['./leave-feedback-popup.component.scss'],
})
export class DialogLeaveFeedbackPopup implements OnInit, OnDestroy {
  classroom?: IClassroom;
  isSendFeedback = false;
  isStudentView?: boolean;
  tutorFeedbackForm!: FormGroup;
  courseFeedbackForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogLeaveFeedbackPopup>,
    private _formBuilder: FormBuilder,
    private _tutorService: TutorsService,
    private _coursesService: CoursesService,
    private _alertNotificationService: AlertNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.classroom = data.classroom;
      this.isStudentView = data.isStudentView;
    }
  }

  ngOnInit(): void {
    this.tutorFeedbackForm = this._formBuilder.group({
      expertSubject: [null, Validators.required],
      presentTopics: [null, Validators.required],
      skillfulStudents: [null, Validators.required],
      alwaysTime: [null, Validators.required],
      feedback: [null, Validators.required],
    });

    this.courseFeedbackForm = this._formBuilder.group({
      rate: [null, Validators.required],
      feedback: [null, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmitTutorFeedback(tutorForm: FormGroup): void {
    if (tutorForm.valid) {
      this.isSendFeedback = true;
      this._tutorService
        .sendTutorFeedback({
          ...tutorForm.value,
          tutorId: this.classroom?.tutor?.id,
          classroomId: this.classroom?.id,
        })
        .subscribe(
          (response) => {
            this.isSendFeedback = false;
            this._alertNotificationService.success(
              'Your feedback has been sent successfully.'
            );
            this.tutorFeedbackForm?.reset();
            this.onNoClick();
          },
          (error) => {
            this.isSendFeedback = false;
            this._alertNotificationService.error('Error in sending feedback');
          }
        );
    }
  }

  onSubmitCourseFeedback(courseForm: FormGroup): void {
    if (courseForm.valid) {
      this.isSendFeedback = true;
      this._coursesService
        .sendCourseFeedback({
          ...courseForm.value,
          classroomId: this.classroom?.id,
        })
        .subscribe(
          (response) => {
            this.isSendFeedback = false;
            this._alertNotificationService.success(
              'Your feedback has been sent successfully.'
            );
            this.tutorFeedbackForm?.reset();
            this.onNoClick();
          },
          (error) => {
            this.isSendFeedback = false;
            this._alertNotificationService.error('Error in sending feedback');
          }
        );
    }
  }

  ngOnDestroy(): void {}
}
