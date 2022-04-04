import { DatePipe } from '@angular/common';
import { generalConstants, GRADES } from 'src/app/config';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICountry, IField, IProgram, ISubject } from 'src/app/core/models';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'metutors-complete-tutor-profile-tutoring-courses',
  templateUrl: './complete-tutor-profile-tutoring-courses.component.html',
  styleUrls: ['./complete-tutor-profile-tutoring-courses.component.scss'],
  providers: [DatePipe],
})
export class CompleteTutorProfileTutoringCoursesComponent implements OnInit {
  @Input() loading: boolean | null;
  @Input() fields: IField[] | null;
  @Input() programsList: IProgram[];
  @Input() countries: ICountry[] | null;
  @Input() subjectsList: ISubject[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() changeField = new EventEmitter();

  grades = GRADES;
  form: FormGroup;
  openSubject = true;
  selectedSubject: number = 0;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      programs: this._fb.array([]),
      // program: [null, Validators.required],
      // country: [null],
    });

    this.addProgram();
  }

  ngOnInit(): void {}

  get programs(): FormArray {
    return this.form?.get('programs') as FormArray;
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get subjects(): FormArray {
    return this.form?.get('subjects') as FormArray;
  }

  removeProgram(i: number): void {
    (this.form?.get('programs') as FormArray).removeAt(i);

    if (this.form.value.programs.length === 0) {
      this.addSubject();
    }
  }

  newProgram(): FormGroup {
    return this._fb.group({
      programId: [null, Validators.required],
      fieldId: [null, Validators.required],
      subjects: [null, Validators.required],
      countries: [null],
      grades: [null],
    });
  }

  addProgram(): void {
    this.programs.push(this.newProgram());
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

  checkProgram(id: number): boolean {
    const listPrograms = this.programs.value.map((item: any) => item.programId);

    if (listPrograms.includes(id)) {
      return false;
    }

    return true;
  }

  onChangeProgram({ value }: any, i: number): void {
    // console.log(value);
    // console.log(this.programs.value)
    // if (value === this.nationalId) {
    //   // this.programs.value[i]?.countries?.setValidators(Validators.required);
    //   // this.programs.at(i)?.addValidators
    //   this.programs.at(i)?.controls.name.clearValidators();
    // } else {
    //   this.programs.value[i]?.countries?.setValidators([]);
    // }
  }

  submitFormData() {
    const data = {
      step: '4',
      // subjects: this.subjects?.value?.map((subject: any) => ({
      //   field_id: subject?.field?.id,
      //   subject_id: [subject?.field?.id],
      // })),
      // program_id: this.program?.value,
      // country_id: this.country?.value,
    };

    this.submitForm.emit(data);
  }
}
