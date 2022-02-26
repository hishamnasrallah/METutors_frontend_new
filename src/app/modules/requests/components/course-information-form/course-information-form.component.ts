import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import {
  AcademicTutoringTextbook,
  formatBytes,
  TEXTBOOK_EDITION_CONST,
} from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import {
  ICourseField,
  ICourseLevel,
  ILanguage,
  IProgram,
  ISubject,
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
export class CourseInformationFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() subjects?: ISubject[];
  @Input() languages?: ILanguage[];
  @Input() coursePrograms?: IProgram[];
  @Input() courseLevel?: ICourseLevel[];
  @Input() courseField?: ICourseField[];

  @Output() submitForm = new EventEmitter<FormGroup>();
  @Output() changeCourseProgram = new EventEmitter<string>();

  filePreview: any;
  textbookEditions = TEXTBOOK_EDITION_CONST;
  academicTutoringTextbook = AcademicTutoringTextbook;

  constructor(private _alertNotificationService: AlertNotificationService) {}

  ngOnInit(): void {}

  onChange(event: any): void {
    const value = event.value;

    if (value === this.academicTutoringTextbook.info) {
      this.name?.setValidators([Validators.required]);
      this.edition?.setValidators([Validators.required]);
      this.author?.setValidators([Validators.required]);
      // this.filePreview = null;
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
      // this.filePreview = null;
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

  onChangeCourseProgram(): void {
    const programId = this.program?.value;

    this.changeCourseProgram.emit(programId);
  }

  onFileUpload(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 5MB');

        return;
      }

      this.form.patchValue({ file });
      this.file?.updateValueAndValidity();
      this.filePreview = {
        name: file.name,
        size: formatBytes(file.size),
      };
    }
  }

  onSubmit(form: FormGroup): void {
    this.submitForm.emit(form);
  }
}