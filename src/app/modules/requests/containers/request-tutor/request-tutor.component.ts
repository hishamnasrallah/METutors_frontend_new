import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertNotificationService } from 'src/app/core/components';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import {
  AcademicTutoringTextbook,
  calculateListDays,
  SORTED_DAYS_WEEK,
  TEXTBOOK_EDITION_CONST,
} from 'src/app/config';
import {
  IClass,
  IField,
  ILevel,
  ILanguage,
  IProgram,
  ISubject,
  ITutor,
} from 'src/app/core/models';
import { CoursesService, TutorsService } from 'src/app/core/services';
import { Store } from '@ngrx/store';

@Component({
  selector: 'metutors-request-tutor',
  templateUrl: './request-tutor.component.html',
  styleUrls: ['./request-tutor.component.scss'],
  providers: [DatePipe],
})
export class RequestTutorComponent implements OnInit {
  @ViewChild('stepper') private myStepper?: MatStepper;

  loadingTutors$: Observable<boolean>;
  levels$: Observable<ILevel[] | null>;
  fields$: Observable<IField[] | null>;
  tutors$: Observable<ITutor[] | null>;
  isCreatingCourse$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  languages$: Observable<ILanguage[] | null>;

  prices: any;
  tutors?: ITutor[];
  reviewInfo: any = {};
  classrooms!: IClass[];
  subjects!: ISubject[];
  courseLevel?: ILevel[];
  courseField?: IField[];
  languages?: ILanguage[];
  selectTutorForm: FormGroup;
  coursePrograms?: IProgram[];
  selectedClassrooms!: IClass[];
  classroomDetailsForm: FormGroup;
  courseInformationForm: FormGroup;
  classroomScheduleForm: FormGroup;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _datePipe: DatePipe,
    private _coursesService: CoursesService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.courseInformationForm = this._fb.group({
      courseProgram: [null, Validators.required],
      courseLevel: [null, Validators.required],
      courseField: [null, Validators.required],
      language: [null, Validators.required],
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
    // if (this._authService.getIsTutorAuth()) {
    //   this._alertNotificationService.error(
    //     'You dont have a permission to access this page from tutor account'
    //   );
    //   this._router.navigate(['/']);
    // }

    this._prepareLanguages();
    this._prepareCourseLevel();
    this._prepareCourseProgram();

    this.tutors$ = this._store.select(fromCore.selectGeneratingTutors).pipe(
      tap((tutors) => {
        if (tutors && tutors.length) {
          this.tutors = tutors;
        }
      })
    );
    this.loadingTutors$ = this._store.select(fromCore.selectIsGeneratingTutors);
    this.isCreatingCourse$ = this._store.select(fromCore.selectIsCreateClass);
    // this._fetchAcademicTutoringPrice();
  }

  nextStep(): void {
    this.myStepper?.next();
    this._prepareReviewInfo();
  }

  backStep(): void {
    this.myStepper?.previous();
  }

  fetchCourseFieldSubject(programId: string): void {
    this._store.dispatch(fromCore.loadSubjectsByProgramId({ programId }));
    this.subjects$ = this._store.select(fromCore.selectSubjects).pipe(
      tap((subjects) => {
        if (subjects && subjects.length) {
          this.subjects = subjects;
        }
      })
    );
  }

  fetchCourseField(programId: string): void {
    this._store.dispatch(fromCore.loadFieldsByProgramId({ programId }));
    this.fields$ = this._store.select(fromCore.selectFields).pipe(
      tap((fields) => {
        if (fields && fields.length) {
          this.courseField = fields;
        }
      })
    );
  }

  generateClassRooms(): void {
    if (this.classroomDetailsForm.valid) {
      const value: any = this._generateClassroomForm(
        this.classroomDetailsForm.value
      );
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
    }
  }

  loadTutors(classrooms: IClass[]): void {
    if (classrooms && classrooms.length) {
      this.selectedClassrooms = classrooms;
      const appointments = this._generateAppointments(classrooms);

      const data = {
        program_id: this.courseInformationForm.value.courseProgram,
        field_of_study_id: this.courseInformationForm.value.courseField,
        subject_id: this.courseInformationForm.value.subject,
        language_id: this.courseInformationForm.value.language,
        class_rooms: appointments,
      };

      this._store.dispatch(fromCore.generateTutors({ data }));
    }
  }

  onSubmit(): void {
    const data = {
      ...this.courseInformationForm.value,
      ...this._generateClassroomForm(this.classroomDetailsForm.value),
      ...this.selectTutorForm.value,
      classrooms: this.selectedClassrooms.map((classroom: any) => ({
        date: classroom?.date,
        day: new Date(classroom.date).getDay(),
        start_time: classroom?.startTime,
        end_time: classroom?.endTime,
        duration: classroom?.duration,
      })),
    };

    this._store.dispatch(fromCore.createClass({ data }));
  }

  private _prepareReviewInfo(): void {
    if (this.courseInformationForm.valid) {
      if (this.courseInformationForm.value.courseProgram)
        this.reviewInfo.courseProgram =
          this.coursePrograms && this.coursePrograms.length
            ? this.coursePrograms.filter(
                (sub) =>
                  sub?.id === this.courseInformationForm.value.courseProgram
              )[0]?.name
            : '';

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
                  sub?.id === this.courseInformationForm.value.courseField
              )[0]?.name
            : '';

      if (this.courseInformationForm.value.language)
        this.reviewInfo.languages =
          this.languages && this.languages.length
            ? this.languages.filter(
                (sub) => sub?.id === this.courseInformationForm.value.language
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
          AcademicTutoringTextbook.none
        )
          this.reviewInfo.information = 'Textbooks not required';

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
        this.reviewInfo.startTime = this.classroomDetailsForm.value?.startTime;

      if (classroomValue.endTime)
        this.reviewInfo.endTime = this.classroomDetailsForm.value?.endTime;

      if (classroomValue.days) this.reviewInfo.days = classroomValue.days;

      if (classroomValue.type) this.reviewInfo.type = classroomValue.type;

      if (classroomValue.seatAttendees)
        this.reviewInfo.seatAttendees = classroomValue.seatAttendees;

      if (classroomValue.duration)
        this.reviewInfo.duration = classroomValue.duration;

      if (classroomValue.hours) this.reviewInfo.hours = classroomValue.hours;

      if (classroomValue.classes)
        this.reviewInfo.classes = classroomValue.classes;
    }

    if (this.classroomScheduleForm.valid) {
      this.selectedClassrooms = this.classroomScheduleForm.value.classes;
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

        this.reviewInfo.price = 100;
        // if (
        //   this.classroomDetailsForm.value?.type.toString() ===
        //   Object.keys(CLASSROOM_TYPES_CONST)[0].toString()
        // ) {
        //   this.reviewInfo.price = +this.prices?.oneOnOne * +hours;
        // } else {
        //   this.reviewInfo.price = +this.prices?.groupStudy * +hours;
        // }
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

  private _generateAppointments(value: any) {
    let appointments = [];
    if (value && value.length) {
      appointments = value.map((item: any) => {
        const appoint: any = {
          date: this._datePipe.transform(new Date(item?.date), 'yyyy-MM-dd'),
          day: SORTED_DAYS_WEEK[new Date(item?.date).getDay()],
          startTime: item?.startTime,
          endTime: item?.endTime,
          duration: item?.duration,
        };

        return appoint;
      });

      return appointments;
    }
    return [];
  }

  private _prepareCourseLevel(): void {
    this._store.dispatch(fromCore.loadLevels());
    this.levels$ = this._store.select(fromCore.selectLevels).pipe(
      tap((levels) => {
        if (levels && levels.length) {
          this.courseLevel = levels;
        }
      })
    );
  }

  private _prepareCourseProgram(): void {
    this._store.dispatch(fromCore.loadPrograms());
    this.programs$ = this._store.select(fromCore.selectPrograms).pipe(
      tap((coursePrograms) => {
        if (coursePrograms && coursePrograms.length) {
          this.coursePrograms = coursePrograms;
        }
      })
    );
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages).pipe(
      tap((languages) => {
        if (languages && languages.length) {
          this.languages = languages;
        }
      })
    );
  }

  // private _fetchAcademicTutoringPrice(): void {
  //   this.getCourseFieldSub = this._miscService
  //     ._fetchAcademicTutoringPrice()
  //     .subscribe(
  //       (fetchedValues) => {
  //         this.prices = fetchedValues;
  //         addMisc('prices', this.prices);
  //       },
  //       () => {}
  //     );

  //   this.prices = getMisc().prices;
  // }
}
