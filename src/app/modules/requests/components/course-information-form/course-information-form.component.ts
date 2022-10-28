import { TranslateService } from '@ngx-translate/core';
import { AlertNotificationService } from 'src/app/core/components';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import {
  state,
  style,
  group,
  animate,
  trigger,
  transition
} from '@angular/animations';
import {
  GRADES,
  generalConstants,
  TEXTBOOK_EDITION_CONST,
  AcademicTutoringTextbook,
  CLASSROOM_TOPICS_SCALE_NUM
} from 'src/app/config';
import {
  IField,
  IProgram,
  ISubject,
  ICountry,
  ILanguage
} from 'src/app/core/models';

@Component({
  selector: 'metutors-course-information-form',
  templateUrl: './course-information-form.component.html',
  styleUrls: ['./course-information-form.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' }))
        ])
      ])
    ])
  ]
})
export class CourseInformationFormComponent implements OnInit {
  @Input() isFree = false;
  @Input() form!: FormGroup;
  @Input() uploadedFiles: any;
  @Input() selectedCourse: any;
  @Input() fileUploadProgress: any;
  @Input() fields: IField[] | null;
  @Input() subjects: ISubject[] | null;
  @Input() programs: IProgram[] | null;
  @Input() countries: ICountry[] | null;
  @Input() languages: ILanguage[] | null;

  @Output() uploadedFile = new EventEmitter<any>();
  @Output() deleteFile = new EventEmitter<number>();
  @Output() submitForm = new EventEmitter<FormGroup>();
  @Output() changeCourseField = new EventEmitter<string>();
  @Output() changeCourseProgram = new EventEmitter<string>();
  @Output() changeCourseSubject = new EventEmitter<string>();

  grades = GRADES;
  showAddTopic = false;
  topicsScale = CLASSROOM_TOPICS_SCALE_NUM;
  nationalId = generalConstants.nationalId;
  textbookEditions = TEXTBOOK_EDITION_CONST;
  uploadComplete = generalConstants.uploadComplete;
  academicTutoringTextbook = AcademicTutoringTextbook;

  constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this.addTopic();
  }

  onChange(event: any): void {
    const value = event.value;

    if (value === this.academicTutoringTextbook.info) {
      this.name?.setValidators([Validators.required]);
      this.edition?.setValidators([Validators.required]);
      this.author?.setValidators([Validators.required]);
      this.file?.setValidators([]);
    } else if (value === this.academicTutoringTextbook.pdf) {
      this.name?.setValidators([]);
      this.edition?.setValidators([]);
      this.author?.setValidators([]);
      this.file?.setValidators([Validators.required]);
    } else {
      this.name?.setValidators([]);
      this.edition?.setValidators([]);
      this.author?.setValidators([]);
      this.file?.setValidators([]);
    }

    this.name?.updateValueAndValidity();
    this.edition?.updateValueAndValidity();
    this.author?.updateValueAndValidity();
    this.file?.updateValueAndValidity();
  }

  returnZero(): number {
    return 0;
  }

  get field(): AbstractControl | null {
    return this.form.get('courseField');
  }

  get program(): AbstractControl | null {
    return this.form.get('courseProgram');
  }

  get subject(): AbstractControl | null {
    return this.form.get('subject');
  }

  get courseCountry(): AbstractControl | null {
    return this.form.get('courseCountry');
  }

  get courseGrade(): AbstractControl | null {
    return this.form.get('courseGrade');
  }

  get information(): AbstractControl | null {
    return this.form.get('information');
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get edition(): AbstractControl | null {
    return this.form.get('edition');
  }

  get author(): AbstractControl | null {
    return this.form.get('author');
  }

  get file(): AbstractControl | null {
    return this.form.get('file');
  }

  get topics(): FormArray {
    return this.form?.get('topics') as FormArray;
  }

  get checkTableView(): boolean {
    return this.form.value.topics.length > 1
      ? true
      : this.form.value.topics[0].checked === true;
  }

  onChangeCourseProgram(): void {
    this.selectedCourse = null;
    const programId = this.program?.value;

    this.changeCourseProgram.emit(programId);

    if (programId.toString() === generalConstants.nationalId.toString()) {
      this.courseCountry?.setValidators([Validators.required]);
      this.courseGrade?.setValidators([Validators.required]);
    } else {
      this.courseCountry?.setValidators([]);
      this.courseGrade?.setValidators([]);
      this.courseCountry?.setValue(null);
      this.courseGrade?.setValue(null);
    }

    this.courseGrade?.updateValueAndValidity();
    this.courseCountry?.updateValueAndValidity();
  }

  resetValues(): void {
    this.field?.setValue(null);
    this.subject?.setValue(null);
    this.field?.updateValueAndValidity();
    this.subject?.updateValueAndValidity();
  }

  onChangeCourseField(): void {
    this.selectedCourse = null;
    this.subject?.setValue(null);
    this.subject?.updateValueAndValidity();

    const fieldId = this.field?.value;

    this.changeCourseField.emit(fieldId);
  }

  onChangeCourseSubject(): void {
    this.changeCourseSubject.emit(this.subject?.value);
  }

  addNewTopic(index: number): void {
    if (this.form.value.topics[index]?.name.trim()) {
      this.topics.patchValue(
        this.topics.value.map((topic: any, i: number) =>
          i === index ? { ...topic, checked: true } : topic
        )
      );

      this.showAddTopic = true;
    }
  }

  addTopic(): void {
    if (this.form.value.topics?.length >= (this.isFree ? 1 : 10)) return;

    this.topics.push(this.newTopic());
    this.showAddTopic = false;
  }

  removeTopic(i: number): void {
    (this.form?.get('topics') as FormArray).removeAt(i);

    if (this.form.value.topics.length === 0) {
      this.addTopic();
    }

    this.form?.markAsTouched();
    this.form?.updateValueAndValidity();
    this.topics?.updateValueAndValidity();
  }

  newTopic(): FormGroup {
    return this._fb.group({
      scale: [2, Validators.required],
      checked: [false, Validators.requiredTrue],
      name: [null, [Validators.required, Validators.maxLength(120)]]
    });
  }

  onFileUpload(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];

      if (file.type !== 'application/pdf') {
        this._translate
          .get('ONLY_PDF_FILE_ALLOWED')
          .subscribe((res: string) => {
            this._alertNotificationService.error(res);
          });

        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this._alertNotificationService.error('ALLOWED_SIZE_5MB');

        return;
      }

      this.uploadedFile.emit([...event.target.files]);
    }
  }

  onSubmit(form: FormGroup): void {
    this.submitForm.emit(form);
  }
}
