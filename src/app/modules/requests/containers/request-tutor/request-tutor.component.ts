import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { isNil, omitBy } from 'lodash';
import { DatePipe } from '@angular/common';
import * as fromCore from '@metutor/core/state';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromRequests from '@metutor/modules/requests/state';
import { FormValidationUtilsService } from '@metutor/core/validators';
import * as fromRequestsActions from '@metutor/modules/requests/state/actions';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import {
  GRADES,
  SORTED_DAYS_WEEK,
  generalConstants,
  calculateListDays,
  TEXTBOOK_EDITION_CONST,
  AcademicTutoringTextbook,
  CLASSROOM_TOPICS_SCALE_NUM,
  COURSE_TUITION_TYPES_CONST
} from 'src/app/config';
import {
  IClass,
  IField,
  ITutor,
  IProgram,
  ICountry,
  ISubject,
  ILanguage
} from 'src/app/core/models';

@Component({
  selector: 'metutors-request-tutor',
  templateUrl: './request-tutor.component.html',
  styleUrls: ['./request-tutor.component.scss'],
  providers: [DatePipe]
})
export class RequestTutorComponent implements OnInit {
  @ViewChild('stepper') private myStepper?: MatStepper;

  uploadedFiles$: Observable<any>;
  price$: Observable<number | null>;
  tutorAvailability$: Observable<any>;
  loadingTutors$: Observable<boolean>;
  fileUploadProgress$: Observable<any>;
  fields$: Observable<IField[] | null>;
  isCreatingCourse$: Observable<boolean>;
  programs$: Observable<IProgram[] | null>;
  subjects$: Observable<ISubject[] | null>;
  countries$: Observable<ICountry[] | null>;
  languages$: Observable<ILanguage[] | null>;
  suggestedTutors$: Observable<ITutor[] | null>;
  availableTutors$: Observable<ITutor[] | null>;
  isLoadingTutorAvailability$: Observable<boolean>;
  showTeacherAvailabilityModal$: Observable<boolean>;
  showChangeCourseScheduleModal$: Observable<boolean>;

  step = 0;
  price: number;
  duration: number;
  selectedCourse: any;
  reviewInfo: any = {};
  tutors: ITutor[] = [];
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
    private _route: ActivatedRoute,
    private _fv: FormValidationUtilsService
  ) {
    this.courseInformationForm = this._fb.group({
      courseProgram: [
        this._route.snapshot.queryParams['program']
          ? +this._route.snapshot.queryParams['program']
          : null,
        Validators.required
      ],
      courseCountry: [
        this._route.snapshot.queryParams['country']
          ? +this._route.snapshot.queryParams['country']
          : null
      ],
      courseGrade: [
        this._route.snapshot.queryParams['grade']
          ? +this._route.snapshot.queryParams['grade']
          : null
      ],
      courseField: [
        this._route.snapshot.queryParams['field']
          ? +this._route.snapshot.queryParams['field']
          : null,
        Validators.required
      ],
      language: [null, Validators.required],
      subject: [
        this._route.snapshot.queryParams['subject']
          ? +this._route.snapshot.queryParams['subject']
          : null,
        Validators.required
      ],
      topics: this._fb.array([]),
      information: [null, Validators.required],
      file: [null],
      name: [null],
      edition: [null],
      author: [null]
    });

    this.classroomDetailsForm = this._fb.group(
      {
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        days: [null, Validators.required],
        type: [COURSE_TUITION_TYPES_CONST.one, Validators.required],
        seatAttendees: [
          1,
          [Validators.required, Validators.max(10), Validators.min(1)]
        ],
        duration: [{ value: 0, disabled: true }, Validators.required],
        hours: [{ value: 0, disabled: true }, Validators.required],
        totalClasses: [{ value: 0, disabled: true }, Validators.required],
        tempDuration: [0, Validators.required],
        tempHours: [0, Validators.required],
        tempTotalClasses: [0, Validators.required]
      },
      {
        validators: [
          this._fv.classroomTimeDurationValidator(
            'tempDuration',
            'startTime',
            'endTime'
          ),
          this._fv.timeAfter24Validator('startDate', 'startTime')
        ]
      }
    );

    this.classroomScheduleForm = this._fb.group({
      classes: [null, Validators.required]
    });

    this.selectTutorForm = this._fb.group({
      tutor: [null, Validators.required]
    });
  }

  get file(): AbstractControl | null {
    return this.courseInformationForm.get('file');
  }

  onUploadFile(file: any): void {
    this._store.dispatch(fromCore.uploadFile({ file }));
  }

  onDeleteFile(id: number): void {
    this._store.dispatch(fromCore.deleteUploadedFile({ id }));
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.enterRequestTutor());
    this._prepareLanguages();
    this._prepareCourseProgram();
    this._prepareCourseCountries();

    if (this._route.snapshot.queryParams['program']) {
      this.fetchCourseField(this._route.snapshot.queryParams['program']);
    }

    if (this._route.snapshot.queryParams['field']) {
      this.fetchCourseFieldSubject(this._route.snapshot.queryParams['field']);
    }

    if (this._route.snapshot.queryParams['subject']) {
      this.calculateEstimatedPrice(this._route.snapshot.queryParams['subject']);
    }

    this.availableTutors$ = this._store
      .select(fromCore.selectGeneratingAvailableTutors)
      .pipe(
        tap(tutors => {
          if (tutors && tutors.length) {
            this.tutors = [...this.tutors, ...tutors];
          }
        })
      );

    this.suggestedTutors$ = this._store
      .select(fromCore.selectGeneratingSuggestedTutors)
      .pipe(
        tap(tutors => {
          if (tutors && tutors.length) {
            this.tutors = [...this.tutors, ...tutors];
          }
        })
      );
    this.loadingTutors$ = this._store.select(fromCore.selectIsGeneratingTutors);
    this.isCreatingCourse$ = this._store.select(fromCore.selectIsCreateClass);

    this.tutorAvailability$ = this._store.select(
      fromCore.selectTutorAvailability
    );

    this.isLoadingTutorAvailability$ = this._store.select(
      fromCore.selectIsLoadingTutorAvailability
    );

    this.showTeacherAvailabilityModal$ = this._store.select(
      fromRequests.selectIsShowTeacherAvailabilityModal
    );

    this.showChangeCourseScheduleModal$ = this._store.select(
      fromRequests.selectIsShowChangeCourseScheduleModal
    );

    this.fileUploadProgress$ = this._store.select(
      fromCore.selectFileUploadingProgress
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap(files => this.file?.setValue(files[0])));
  }

  nextStep(): void {
    this.step += 1;
    this.myStepper?.next();
    this._prepareReviewInfo();

    this.selectedCourse = {
      id: this.courseInformationForm.value.subject,
      name: this.subjects?.filter(
        sub => sub.id === +this.courseInformationForm.value.subject
      )[0]?.name
    };
  }

  backStep(): void {
    this.step -= 1;
    this.myStepper?.previous();
  }

  onTutorAvailability(id: number): void {
    this._store.dispatch(fromRequestsActions.openTeacherAvailabilityModal());
    this._store.dispatch(fromCore.loadTutorAvailability({ id }));
  }

  onCloseTeacherAvailabilityModal(): void {
    this._store.dispatch(fromRequestsActions.closeTeacherAvailabilityModal());
  }

  onOpenChangeCourseScheduleModal(schedule: boolean): void {
    if (schedule)
      this._store.dispatch(fromRequestsActions.openChangeCourseScheduleModal());
    else {
      if (this.myStepper) {
        this.step = 1;
        this.myStepper.selectedIndex = 1;
      }
    }
  }

  onCloseChangeCourseScheduleModal(): void {
    this._store.dispatch(fromRequestsActions.closeChangeCourseScheduleModal());
  }

  changeSchedule(): void {
    if (this.myStepper) {
      this.step = 1;
      this.myStepper.selectedIndex = 1;
    }
  }

  fetchCourseFieldSubject(fieldId: string): void {
    this._store.dispatch(
      fromCore.loadSubjectsByFieldId({
        fieldId
      })
    );
    this.subjects$ = this._store.select(fromCore.selectSubjects).pipe(
      tap(subjects => {
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
          grade: this.courseInformationForm.value?.courseGrade
        })
      );
    }
    this.fields$ = this._store.select(fromCore.selectFields).pipe(
      tap(fields => {
        if (fields && fields.length) {
          this.courseField = fields;
        }
      })
    );
  }

  calculateEstimatedPrice(subjectId: string): void {
    this.selectedCourse = {
      id: subjectId,
      name: this.subjects?.filter(sub => sub.id === +subjectId)[0]?.name
    };
    this._store.dispatch(fromCore.calculateEstimatedPrice({ subjectId }));
    this.price$ = this._store.select(fromCore.selectEstimatedPrice).pipe(
      tap(price => {
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
            duration: value.duration
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
        grade: this.courseInformationForm.value.courseGrade,
        country_id: this.courseInformationForm.value.courseCountry,
        subject_id: this.courseInformationForm.value.subject,
        language_id: this.courseInformationForm.value.language,
        start_date: new Date(
          this.classroomDetailsForm.value.startDate
        ).toISOString(),
        end_date: new Date(
          this.classroomDetailsForm.value.endDate
        ).toISOString(),
        class_rooms: JSON.stringify(appointments)
      };

      this._store.dispatch(
        fromCore.generateTutors({ data: omitBy(data, isNil) })
      );
      this.filterTutors('');
    }
  }

  filterTutors(name: string): void {
    this.availableTutors$ = this._store
      .select(fromCore.selectFilteredGeneratingAvailableTutors, { name })
      .pipe(
        tap(tutors => {
          if (tutors && tutors.length) {
            this.tutors = [...this.tutors, ...tutors];
          }
        })
      );

    this.suggestedTutors$ = this._store
      .select(fromCore.selectFilteredGeneratingSuggestedTutors, { name })
      .pipe(
        tap(tutors => {
          if (tutors && tutors.length) {
            this.tutors = [...this.tutors, ...tutors];
          }
        })
      );
  }

  updatedClassrooms(classrooms: IClass[]): void {
    this.duration =
      Math.abs(
        new Date().getTime() - new Date(classrooms[0].date || '').getTime()
      ) / 3600000;
  }

  onSubmit(): void {
    const data = {
      ...this.courseInformationForm.value,
      ...this._generateClassroomForm(this.classroomDetailsForm.value),
      ...this.selectTutorForm.value,
      subject: this.courseInformationForm.value.subject,
      programName: this.reviewInfo.courseProgram,
      fieldName: this.reviewInfo.courseField,
      tutoringLanguage: this.reviewInfo.languages,
      tutoringType: this.reviewInfo.type,
      tutor: this.reviewInfo.tutor,
      startTime: this.reviewInfo.startTime,
      endTime: this.reviewInfo.endTime,
      totalPrice: this.reviewInfo.price,
      startDate: this._datePipe.transform(
        new Date(this.reviewInfo.startDate),
        'yyyy-MM-dd'
      ),
      endDate: this._datePipe.transform(
        new Date(this.reviewInfo.endDate),
        'yyyy-MM-dd'
      ),
      classes: this.reviewInfo.classes,
      classrooms: this.selectedClassrooms.map((classroom: any) => ({
        date: this._datePipe.transform(new Date(classroom?.date), 'yyyy-MM-dd'),
        day: new Date(classroom.date).getDay(),
        start_time: classroom?.startTime,
        end_time: classroom?.endTime,
        duration: classroom?.duration
      }))
    };

    this._store.dispatch(fromCore.createClass({ data }));
  }

  private _prepareReviewInfo(): void {
    if (this.courseInformationForm.valid) {
      if (this.courseInformationForm.value.courseProgram) {
        this.reviewInfo.courseProgram =
          this.coursePrograms && this.coursePrograms.length
            ? this.coursePrograms.filter(
                sub =>
                  sub?.id === this.courseInformationForm.value.courseProgram
              )[0]?.name
            : '';

        if (
          +this.courseInformationForm.value.courseProgram ===
          generalConstants.nationalId
        ) {
          this.reviewInfo.courseGrade =
            GRADES[this.courseInformationForm.value.courseGrade];

          this.reviewInfo.courseCountry =
            this.courseCountries && this.courseCountries.length
              ? this.courseCountries.filter(
                  country =>
                    country?.id ===
                    this.courseInformationForm.value.courseCountry
                )[0]
              : '';
        }
      }

      if (this.courseInformationForm.value.courseField)
        this.reviewInfo.courseField =
          this.courseField && this.courseField.length
            ? this.courseField.filter(
                sub => sub?.id === this.courseInformationForm.value.courseField
              )[0]?.name
            : '';

      if (this.courseInformationForm.value.language)
        this.reviewInfo.languages =
          this.languages && this.languages.length
            ? this.languages.filter(
                sub => sub?.id === this.courseInformationForm.value.language
              )[0]?.name
            : '';

      if (this.courseInformationForm.value.subject)
        this.reviewInfo.subject =
          this.subjects && this.subjects.length
            ? this.subjects.filter(
                sub => sub?.id === +this.courseInformationForm.value.subject
              )[0]?.name
            : '';

      if (
        this.courseInformationForm.value.topics &&
        this.courseInformationForm.value.topics.length
      )
        this.reviewInfo.topics = this.courseInformationForm.value.topics.map(
          (topic: any) => ({
            name: topic.name,
            scale: CLASSROOM_TOPICS_SCALE_NUM[topic.scale]
          })
        );

      if (this.courseInformationForm.value.information) {
        this.reviewInfo.info = this.courseInformationForm.value.information;

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.info
        )
          this.reviewInfo.information = 'STUDENT_BOOK';

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.pdf
        )
          this.reviewInfo.information = 'STUDENT_TEXTBOOK_PDF';

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.none
        )
          this.reviewInfo.information = 'TEXTBOOK_NOT_REQUIRED';

        if (
          this.courseInformationForm.value.information ===
          AcademicTutoringTextbook.later
        )
          this.reviewInfo.information = 'MORE_INFO_PROVIDED_LATER';
      }

      if (this.courseInformationForm.value.file) {
        this.reviewInfo.file = this.courseInformationForm.value.file;
        this.reviewInfo.filePreview = {
          size: this.courseInformationForm.value.file.size,
          name: this.courseInformationForm.value.file.originalName
        };
      }

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
                duration: item?.duration
              };

              return appoint;
            })
          : [];

      if (this.selectedClassrooms && this.selectedClassrooms.length) {
        this.reviewInfo.startDate = this.selectedClassrooms[0].date;
        this.reviewInfo.startTime = this.selectedClassrooms[0].startTime;

        this.reviewInfo.endDate = this.selectedClassrooms[
          this.selectedClassrooms.length - 1
        ].date;
        this.reviewInfo.endTime = this.selectedClassrooms[
          this.selectedClassrooms.length - 1
        ].endTime;

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
      seatAttendees: form?.seatAttendees
    };
  }

  private _generateAppointments(value: any) {
    let appointments = [];
    if (value && value.length) {
      appointments = value.map((item: any) => {
        const appoint: any = {
          day: SORTED_DAYS_WEEK[new Date(item?.date).getDay()],
          duration: item?.duration,
          start: new Date(
            Date.parse(
              this._datePipe.transform(new Date(item?.date), 'yyyy-MM-dd') +
                ' ' +
                item?.startTime
            )
          )?.toISOString(),
          end: new Date(
            Date.parse(
              this._datePipe.transform(new Date(item?.date), 'yyyy-MM-dd') +
                ' ' +
                item?.endTime
            )
          )?.toISOString()
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
      tap(coursePrograms => {
        if (coursePrograms && coursePrograms.length) {
          this.coursePrograms = coursePrograms;
        }
      })
    );
  }

  private _prepareCourseCountries(): void {
    this._store.dispatch(fromCore.loadProgramCountries());
    this.countries$ = this._store.select(fromCore.selectProgramCountries).pipe(
      tap(courseCountries => {
        if (courseCountries && courseCountries.length) {
          this.courseCountries = courseCountries;
        }
      })
    );
  }

  private _prepareLanguages(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages).pipe(
      tap(languages => {
        if (languages && languages.length) {
          this.languages = languages;
        }
      })
    );
  }
}
