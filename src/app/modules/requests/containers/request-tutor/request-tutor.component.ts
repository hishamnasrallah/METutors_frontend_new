import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable, tap } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import {
  AcademicTutoringTextbook,
  calculateListDays,
  SORTED_DAYS_WEEK,
  TEXTBOOK_EDITION_CONST,
  generalConstants,
} from 'src/app/config';
import {
  IClass,
  IField,
  ILanguage,
  IProgram,
  ISubject,
  ITutor,
  ICountry,
} from 'src/app/core/models';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'metutors-request-tutor',
  templateUrl: './request-tutor.component.html',
  styleUrls: ['./request-tutor.component.scss'],
  providers: [DatePipe],
})
export class RequestTutorComponent implements OnInit {
  @ViewChild('stepper') private myStepper?: MatStepper;

  price$: Observable<number | null>;
  loadingTutors$: Observable<boolean>;
  fields$: Observable<IField[] | null>;
  tutors$: Observable<ITutor[] | null>;
  isCreatingCourse$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;

  price: number;
  tutors?: ITutor[];
  reviewInfo: any = {};
  classrooms!: IClass[];
  subjects!: ISubject[];
  courseField?: IField[];
  languages?: ILanguage[];
  selectTutorForm: FormGroup;
  coursePrograms?: IProgram[];
  courseCountries!: ICountry[];
  selectedClassrooms!: IClass[];
  classroomDetailsForm: FormGroup;
  courseInformationForm: FormGroup;
  classroomScheduleForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _datePipe: DatePipe,
    private _route: ActivatedRoute
  ) {
    this.courseInformationForm = this._fb.group({
      courseProgram: [
        +this._route.snapshot.queryParams['program'],
        Validators.required,
      ],
      courseCountry: [+this._route.snapshot.queryParams['country']],
      courseGrade: [null],
      courseField: [
        +this._route.snapshot.queryParams['field'],
        Validators.required,
      ],
      language: [null, Validators.required],
      subject: [
        +this._route.snapshot.queryParams['subject'],
        Validators.required,
      ],
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
    this._store.dispatch(fromCore.enterRequestTutor());
    this._prepareLanguages();
    this._prepareCourseProgram();
    this._prepareCourseCountries();

    if (this._route.snapshot.queryParams['program']) {
      this.fetchCourseField(this._route.snapshot.queryParams['program']);
      this.fetchCourseFieldSubject(this._route.snapshot.queryParams['program']);
    }

    if (this._route.snapshot.queryParams['subject']) {
      this.calculateEstimatedPrice(this._route.snapshot.queryParams['subject']);
    }

    this.tutors$ = this._store.select(fromCore.selectGeneratingTutors).pipe(
      tap((tutors) => {
        if (tutors && tutors.length) {
          this.tutors = tutors;
        }
      })
    );
    this.loadingTutors$ = this._store.select(fromCore.selectIsGeneratingTutors);
    this.isCreatingCourse$ = this._store.select(fromCore.selectIsCreateClass);
  }

  nextStep(): void {
    this.myStepper?.next();
    this._prepareReviewInfo();
  }

  backStep(): void {
    this.myStepper?.previous();
  }

  fetchCourseFieldSubject(fieldId: string): void {
    this._store.dispatch(
      fromCore.loadSubjectsByFieldId({
        fieldId,
      })
    );
    this.subjects$ = this._store.select(fromCore.selectSubjects).pipe(
      tap((subjects) => {
        if (subjects && subjects.length) {
          this.subjects = subjects;
        }
      })
    );
  }

  fetchCourseField(programId: string): void {
    if (
      programId.toString() === generalConstants.nationalId.toString() &&
      (!this.courseInformationForm.value?.courseCountry ||
        !this.courseInformationForm.value?.courseGrade)
    ) {
      return;
    } else {
      this._store.dispatch(
        fromCore.loadFieldsByProgramId({
          programId,
          countryId: this.courseInformationForm.value?.courseCountry,
          grade: this.courseInformationForm.value?.courseGrade,
        })
      );
    }
    this.fields$ = this._store.select(fromCore.selectFields).pipe(
      tap((fields) => {
        if (fields && fields.length) {
          this.courseField = fields;
        }
      })
    );
  }

  calculateEstimatedPrice(subjectId: string): void {
    this._store.dispatch(fromCore.calculateEstimatedPrice({ subjectId }));
    this.price$ = this._store.select(fromCore.selectEstimatedPrice).pipe(
      tap((price) => {
        if (price) {
          this.price = price;
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
      tutor: this.reviewInfo.tutor,
      startTime: this.reviewInfo.startTime,
      endTime: this.reviewInfo.endTime,
      totalPrice: this.reviewInfo.price,
      startDate: this.reviewInfo.startDate,
      endDate: this.reviewInfo.endDate,
      classes: this.reviewInfo.classes,
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
        this.reviewInfo.startDate = this.selectedClassrooms[0].date;
        this.reviewInfo.startTime = this.selectedClassrooms[0].startTime;

        this.reviewInfo.endDate =
          this.selectedClassrooms[this.selectedClassrooms.length - 1].date;
        this.reviewInfo.endTime =
          this.selectedClassrooms[this.selectedClassrooms.length - 1].endTime;

        this.reviewInfo.hours = this.selectedClassrooms?.reduce(
          (sum: number, hr: any) => sum + +hr?.duration,
          0
        );

        this.reviewInfo.classes = this.selectedClassrooms.length;

        this.reviewInfo.price = +this.reviewInfo.hours * +this.price;
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

  private _prepareCourseCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries).pipe(
      tap((courseCountries) => {
        if (courseCountries && courseCountries.length) {
          this.courseCountries = courseCountries;
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
}
