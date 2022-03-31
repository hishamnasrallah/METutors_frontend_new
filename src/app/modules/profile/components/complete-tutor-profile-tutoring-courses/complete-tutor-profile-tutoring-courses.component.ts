import { DatePipe } from '@angular/common';
import { generalConstants } from 'src/app/config';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ICountry,
  IField,
  ILevel,
  IProgram,
  ISubject,
} from 'src/app/core/models';

@Component({
  selector: 'metutors-complete-tutor-profile-tutoring-courses',
  templateUrl: './complete-tutor-profile-tutoring-courses.component.html',
  styleUrls: ['./complete-tutor-profile-tutoring-courses.component.scss'],
  providers: [DatePipe],
})
export class CompleteTutorProfileTutoringCoursesComponent implements OnInit {
  @Input() loading: boolean | null;
  @Input() fields: IField[] | null;
  @Input() programs: IProgram[] | null;
  @Input() countries: ICountry[] | null;
  @Input() subjectsList: ISubject[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() changeField = new EventEmitter();

  form: FormGroup;
  openSubject = true;
  selectedSubject: number = 0;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      subjects: this._fb.array([]),
      program: [null, Validators.required],
      country: [null],
    });

    this.addSubject();
  }

  ngOnInit(): void {}

  get program(): AbstractControl | null {
    return this.form.get('program');
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get subjects(): FormArray {
    return this.form?.get('subjects') as FormArray;
  }

  removeSubject(i: number): void {
    (this.form?.get('subjects') as FormArray).removeAt(i);

    if (this.form.value.subjects.length === 0) {
      this.addSubject();
    }
  }

  newSubject(): FormGroup {
    return this._fb.group({
      field: [null, Validators.required],
      subject: [null, Validators.required],
    });
  }

  addSubject(): void {
    this.subjects.push(this.newSubject());
  }

  onChangeField(event: any): void {
    this.changeField.emit(event?.value?.id);
  }

  onOpenChange(state: boolean, index: number): void {
    if (state === false) {
      this.selectedSubject = index + 1;
    }
  }

  submitFormData() {
    const data = {
      step: '4',
      subjects: this.subjects?.value?.map((subject: any) => ({
        field_id: subject?.field?.id,
        subject_id: [subject?.field?.id],
      })),
      program_id: this.program?.value,
      country_id: this.country?.value,
    };

    this.submitForm.emit(data);
  }
}
