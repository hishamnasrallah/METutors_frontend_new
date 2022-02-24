import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AcademicTutoringTextbook,
  addLookups,
  addMisc,
  CLASSROOM_TYPES_CONST,
  getLookups,
  getMisc,
  LONG_DAYS_WEEK,
  TEXTBOOK_EDITION_CONST,
} from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import {
  IClass,
  ICourseField,
  ICourseLevel,
  ILanguage,
  IProgram,
  ISubject,
  ITutor,
} from 'src/app/core/models';
import {
  CoursesService,
  LookupsService,
  MiscService,
  TutorsService,
} from 'src/app/core/services';

@Component({
  selector: 'metutors-request-tutor',
  templateUrl: './request-tutor.component.html',
  styleUrls: ['./request-tutor.component.scss'],
  providers: [DatePipe],
})
export class RequestTutorComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') private myStepper?: MatStepper;

  prices: any;
  tutors?: ITutor[];
  reviewInfo: any = {};
  classrooms!: IClass[];
  subjects!: ISubject[];
  languages?: ILanguage[];
  loadingTutors?: boolean;
  selectTutorForm: FormGroup;
  coursePrograms?: IProgram[];
  loadingClassrooms?: boolean;
  courseLevel?: ICourseLevel[];
  courseField?: ICourseField[];
  selectedClassrooms!: IClass[];
  classroomDetailsForm: FormGroup;
  courseInformationForm: FormGroup;
  classroomScheduleForm: FormGroup;
  getCourseLevelSub?: Subscription;
  getCourseFieldSub?: Subscription;
  isCreatingCourse: boolean = false;
  getCourseProgramsSub?: Subscription;
  getCourseFieldSubjectSub?: Subscription;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _miscService: MiscService,
    private _tutorsService: TutorsService,
    private _lookupsService: LookupsService,
    private _coursesService: CoursesService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.courseInformationForm = this._fb.group({
      courseProgram: [null, Validators.required],
      courseLevel: [null, Validators.required],
      courseField: [null, Validators.required],
      preferedTutoringLanguage: [null, Validators.required],
      subject: [null, Validators.required],
      information: [null, Validators.required],
      file: [null],
      name: [null],
      edition: [null],
      author: [null],
    });

    this.classroomDetailsForm = this._fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      days: [null, Validators.required],
      type: [null, Validators.required],
      seatAttendees: [
        1,
        [Validators.required, Validators.max(10), Validators.min(1)],
      ],
      duration: [{ value: 0, disabled: true }, Validators.required],
      hours: [{ value: 0, disabled: true }, Validators.required],
      totalClasses: [{ value: 0, disabled: true }, Validators.required],
      tempDuration: [0, Validators.required],
      tempHours: [0, Validators.required],
      tempTotalClasses: [0, Validators.required],
    });

    this.classroomScheduleForm = this._fb.group({
      classes: [null, Validators.required],
    });

    this.selectTutorForm = this._fb.group({
      tutor: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // this._prepareLanguages();
    this._prepareCourseLevel();
    // this._prepareCourseField();
    this._prepareCourseProgram();
    // this._fetchAcademicTutoringPrice();
  }

  nextStep(): void {
    this.myStepper?.next();
    this._prepareReviewInfo();
  }

  backStep(): void {
    this.myStepper?.previous();
  }

  fetchCourseFieldSubject(fieldId: string): void {
    this.getCourseFieldSubjectSub = this._lookupsService
      .getCourseFieldSubject(fieldId)
      .subscribe(
        (fetchedValues) => {
          this.subjects = fetchedValues;
          addLookups('courseSubjects', this.subjects);
        },
        () => {}
      );

    this.subjects = getLookups().courseSubjects;
  }

  fetchCourseField(fieldId: string): void {
    this.getCourseFieldSub = this._lookupsService
      .getCourseField(fieldId)
      .subscribe(
        (fetchedValues) => {
          this.courseField = fetchedValues;
          addLookups('courseField', this.courseField);
        },
        () => {}
      );

    this.courseField = getLookups().courseField;
  }

  generateClassRooms(): void {
    if (this.classroomDetailsForm.valid) {
      const value = this._generateClassroomForm(
        this.classroomDetailsForm.value
      );
      this.loadingClassrooms = true;
      this._coursesService.generateClassRooms(value).subscribe(
        (result) => {
          this.loadingClassrooms = false;
          if (result && result.length) {
            this.classrooms = [];

            result.forEach((item: any, index: number) => {
              this.classrooms[index] = {
                ...item,
                duration: this.classroomDetailsForm.value.tempDuration,
              };
            });
            this.selectedClassrooms = this.classrooms;
          }
        },
        (error) => {
          this.loadingClassrooms = false;
          this._alertNotificationService.error(
            'Error in generating the classrooms'
          );
        }
      );
    }
  }

  loadTutors(classrooms: IClass[]): void {
    if (classrooms && classrooms.length) {
      this.selectedClassrooms = classrooms;
      const appointments = this._generateAppointments(classrooms);

      const value = {
        course_field: this.courseInformationForm.value.courseField,
        subject: this.courseInformationForm.value.subject,
        start_date: this._datePipe.transform(
          new Date(this.classroomDetailsForm.value?.startDate),
          'yyyy-MM-dd'
        ),
        end_date: this._datePipe.transform(
          new Date(this.classroomDetailsForm.value?.endDate),
          'yyyy-MM-dd'
        ),
        appointments,
      };

      this.loadingTutors = true;
      this._tutorsService.generateTutors(value).subscribe(
        (result) => {
          this.loadingTutors = false;
          this.tutors = result;
        },
        (error) => {
          this.loadingTutors = false;
          this._alertNotificationService.error(
            'Error in generating the tutors'
          );
        }
      );
    }
  }

  onSubmit(): void {
    const value = {
      ...this.courseInformationForm.value,
      ...this._generateClassroomForm(this.classroomDetailsForm.value),
      ...this.selectTutorForm.value,
      classrooms: this.selectedClassrooms.map((item: any) => {
        const classroom: any = {
          number: item.number,
          title: item.title,
          seat_attendees: item.attendees,
          _status_id: item.id,
          _date: item.date,
          _class_start_time: item.startTime,
          _class_end_time: item.endTime,
        };

        return classroom;
      }),
    };

    this.isCreatingCourse = true;
    this._coursesService.createCourse(value).subscribe(
      (response) => {
        this.isCreatingCourse = false;
        this.classroomDetailsForm.reset();
        this.classroomScheduleForm.reset();
        this.courseInformationForm.reset();
        this.selectTutorForm.reset();
        this._alertNotificationService.success(
          'Congrats! Your request has been created successfully!'
        );
        this._router.navigate([
          '/payment/invoice-details',
          response?.result?.id,
        ]);
      },
      (error) => {
        this.isCreatingCourse = false;
        this._alertNotificationService.error(
          'An error occured while creating the course '
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.getCourseLevelSub?.unsubscribe();
    this.getCourseFieldSub?.unsubscribe();
    this.getCourseProgramsSub?.unsubscribe();
  }

  private _prepareReviewInfo(): void {
    if (this.courseInformationForm.valid) {
      if (this.courseInformationForm.value.courseLevel)
        this.reviewInfo.courseLevel =
          this.courseLevel && this.courseLevel.length
            ? this.courseLevel.filter(
                (sub) =>
                  sub?.id === this.courseInformationForm.value.courseLevel
              )[0]?.name
            : '';
      if (this.courseInformationForm.value.courseField)
        this.reviewInfo.courseField =
          this.courseField && this.courseField.length
            ? this.courseField.filter(
                (sub) =>
                  sub?.code === this.courseInformationForm.value.courseField
              )[0]?.name
            : '';
      if (this.courseInformationForm.value.preferedTutoringLanguage)
        this.reviewInfo.preferedTutoringLanguage =
          this.languages && this.languages.length
            ? this.languages.filter(
                (sub) =>
                  sub?.id ===
                  this.courseInformationForm.value.preferedTutoringLanguage
              )[0]?.name
            : '';
      if (this.courseInformationForm.value.subject)
        this.reviewInfo.subject =
          this.subjects && this.subjects.length
            ? this.subjects.filter(
                (sub) => sub?.id === +this.courseInformationForm.value.subject
              )[0]?.name
            : '';
      if (this.courseInformationForm.value.information) {
        this.reviewInfo.info = this.courseInformationForm.value.information;

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.info
        )
          this.reviewInfo.information = 'Student book';

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.pdf
        )
          this.reviewInfo.information = 'Student textbook pdf';

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.later
        )
          this.reviewInfo.information = 'No textbook';
      }

      if (this.courseInformationForm.value.file)
        this.reviewInfo.file = this.courseInformationForm.value.file;

      if (this.courseInformationForm.value.name)
        this.reviewInfo.name = this.courseInformationForm.value.name;

      if (this.courseInformationForm.value.edition)
        this.reviewInfo.edition =
          TEXTBOOK_EDITION_CONST[this.courseInformationForm.value.edition];

      if (this.courseInformationForm.value.author)
        this.reviewInfo.author = this.courseInformationForm.value.author;
    }

    if (this.classroomDetailsForm.valid) {
      const classroomValue = this._generateClassroomForm(
        this.classroomDetailsForm.value
      );

      if (classroomValue.startDate)
        this.reviewInfo.startDate = classroomValue.startDate;

      if (classroomValue.endDate)
        this.reviewInfo.endDate = classroomValue.endDate;

      if (classroomValue.startTime)
        this.reviewInfo.startTime = this._datePipe.transform(
          new Date(this.classroomDetailsForm.value?.startTime),
          'h:mm a'
        );

      if (classroomValue.endTime)
        this.reviewInfo.endTime = this._datePipe.transform(
          new Date(this.classroomDetailsForm.value?.endTime),
          'h:mm a'
        );

      if (classroomValue.days)
        this.reviewInfo.days = classroomValue.days.map(
          (day: number) => LONG_DAYS_WEEK[day - 1]
        );

      if (classroomValue.type)
        this.reviewInfo.type = CLASSROOM_TYPES_CONST[classroomValue.type];

      if (classroomValue.seatAttendees)
        this.reviewInfo.seatAttendees = classroomValue.seatAttendees;

      if (classroomValue.duration)
        this.reviewInfo.duration = classroomValue.duration;

      if (classroomValue.hours) this.reviewInfo.hours = classroomValue.hours;

      if (classroomValue.classes)
        this.reviewInfo.classes = classroomValue.classes;
    }

    if (this.classroomScheduleForm.valid) {
      this.reviewInfo.appointments =
        this.selectedClassrooms && this.selectedClassrooms.length
          ? this.selectedClassrooms.map((item: any) => {
              const appoint: any = {
                date: this._datePipe.transform(
                  new Date(item?.date),
                  'yyyy-MM-dd'
                ),
                startTime: item?.startTime,
                endTime: item?.endTime,
                duration: item?.duration,
              };

              return appoint;
            })
          : [];

      if (this.selectedClassrooms && this.selectedClassrooms.length) {
        const hours = this.selectedClassrooms?.reduce(
          (sum: number, hr: any) => sum + +hr?.duration,
          0
        );

        if (
          this.classroomDetailsForm.value?.type.toString() ===
          Object.keys(CLASSROOM_TYPES_CONST)[0].toString()
        ) {
          this.reviewInfo.price = +this.prices?.oneOnOne * +hours;
        } else {
          this.reviewInfo.price = +this.prices?.groupStudy * +hours;
        }
      }
    }

    if (this.selectTutorForm.valid) {
      if (this.selectTutorForm.value.tutor)
        this.reviewInfo.tutor =
          this.tutors && this.tutors.length
            ? this.tutors.filter(
                (sub: ITutor) => +sub?.id === +this.selectTutorForm.value.tutor
              )[0]
            : {};
    }
  }

  private _generateClassroomForm(form: any) {
    return {
      classes: form?.tempTotalClasses,
      days:
        form.days && form.days.length
          ? form.days.map((day: any) => LONG_DAYS_WEEK.indexOf(day) + 1)
          : [],
      duration: form?.tempDuration,
      startDate: this._datePipe.transform(
        new Date(form?.startDate),
        'yyyy-MM-dd'
      ),
      endDate: this._datePipe.transform(new Date(form?.endDate), 'yyyy-MM-dd'),
      startTime: this._datePipe.transform(new Date(form?.startTime), 'HH:mm'),
      endTime: this._datePipe.transform(new Date(form?.endTime), 'HH:mm'),
      hours: form?.tempHours,
      type: form?.type,
      seatAttendees: form?.seatAttendees,
    };
  }

  private _generateAppointments(value: any) {
    let appointments = [];
    if (value && value.length) {
      appointments = value.map((item: any) => {
        const appoint: any = {
          date: this._datePipe.transform(new Date(item?.date), 'yyyy-MM-dd'),
          from_time: item?.startTime,
          to_time: item?.endTime,
        };

        return appoint;
      });

      return appointments;
    }
    return [];
  }

  private _prepareCourseLevel(): void {
    this.getCourseLevelSub = this._lookupsService.getCourseLevel().subscribe(
      (fetchedValues) => {
        this.courseLevel = fetchedValues.results;
        addLookups('courseLevel', this.courseLevel);
      },
      () => {}
    );

    this.courseLevel = getLookups().courseLevel;
  }

  private _prepareCourseProgram(): void {
    this.getCourseProgramsSub = this._lookupsService.getPrograms().subscribe(
      (fetchedValues) => {
        this.coursePrograms = fetchedValues;
        addLookups('coursePrograms', this.coursePrograms);
      },
      () => {}
    );

    this.coursePrograms = getLookups().coursePrograms;
  }

  private _prepareLanguages(): void {
    // this.getCourseFieldSub = this._miscService.getLanguages().subscribe(
    //   (fetchedValues) => {
    //     this.languages = fetchedValues;
    //     addMisc('languages', this.languages);
    //   },
    //   () => {}
    // );
    // this.languages = getMisc().languages;
  }

  private _fetchAcademicTutoringPrice(): void {
    this.getCourseFieldSub = this._miscService
      ._fetchAcademicTutoringPrice()
      .subscribe(
        (fetchedValues) => {
          this.prices = fetchedValues;
          addMisc('prices', this.prices);
        },
        () => {}
      );

    this.prices = getMisc().prices;
  }
}
