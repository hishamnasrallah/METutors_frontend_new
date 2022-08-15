import { DatePipe } from '@angular/common';
import { generalConstants, GRADES } from 'src/app/config';
import { ICountry, IField, IProgram, ISubject } from 'src/app/core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-complete-tutor-profile-tutoring-courses',
  templateUrl: './complete-tutor-profile-tutoring-courses.component.html',
  styleUrls: ['./complete-tutor-profile-tutoring-courses.component.scss'],
  providers: [DatePipe],
})
export class CompleteTutorProfileTutoringCoursesComponent implements OnInit {
  @Input() fields: IField[];
  @Input() loading: boolean | null;
  @Input() programsList: IProgram[];
  @Input() countries: ICountry[] | null;
  @Input() set subjectsList(_subjects: ISubject[]) {
    if (_subjects && _subjects.length) {
      const output: any[] = [];

      _subjects?.forEach((item: any) => {
        const existing = output.filter((v, i) => v.fieldId == item.fieldId);

        if (existing.length) {
          const existingIndex = output.indexOf(existing[0]);

          output[existingIndex].subjects = [
            ...output[existingIndex].subjects,
            { ...item },
          ];
        } else {
          output.push({
            fieldId: item.fieldId,
            fieldName: item?.fieldName,
            programId: item?.programId,
            countryId: item?.countryId,
            grade: item?.grade,
            subjects: [{ ...item }],
          });
        }
      });

      this.subjects = output;
    }
  }

  @Output() submitForm = new EventEmitter();

  grades = GRADES;
  form: FormGroup;
  subjects: any[];
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      programs: this._fb.array([]),
    });

    this.addProgram();
  }

  ngOnInit(): void {}

  get programs(): FormArray {
    return this.form?.get('programs') as FormArray;
  }

  addProgram(): void {
    this.programs.push(this.newProgram());
  }

  removeProgram(i: number): void {
    (this.form?.get('programs') as FormArray).removeAt(i);
  }

  newProgram(): FormGroup {
    return this._fb.group({
      programId: [null, Validators.required],
      fields: [null, Validators.required],
      subjects: [null, Validators.required],
      sortedSubjects: [[]],
      countries: [null],
      grades: [null],
    });
  }

  checkProgram(id: number): boolean {
    const listPrograms = this.programs.value?.map(
      (item: any) => item?.programId
    );
    const filteredPrograms = listPrograms?.map((item: any) => item?.id);

    return !filteredPrograms.includes(id);
  }

  onChangeProgram({ value }: any, i: number): void {
    if (value.id === this.nationalId) {
      this.programs
        .at(i)
        ?.get('countries')
        ?.setValidators([Validators.required]);
      this.programs.at(i)?.get('grades')?.setValidators([Validators.required]);
    } else {
      this.programs.at(i)?.get('countries')?.clearValidators();
      this.programs.at(i)?.get('grades')?.clearValidators();
    }
    this.programs.at(i)?.get('countries')?.updateValueAndValidity();
    this.programs.at(i)?.get('grades')?.updateValueAndValidity();
  }

  onChange(index: number): void {
    const output: any[] = [];
    const subjects = this.form.value.programs[index].subjects;

    subjects.forEach((item: any) => {
      const existing = output.filter((v, i) => v.fieldId == item.fieldId);

      if (existing.length) {
        const existingIndex = output.indexOf(existing[0]);

        output[existingIndex].subjects = [
          ...output[existingIndex].subjects,
          { ...item, pricePerHour: null },
        ];
      } else {
        output.push({
          fieldId: item.fieldId,
          fieldName: this.fields.filter(
            (field: any) => field.id === item.fieldId
          )[0]?.name,
          countryName: this.countries?.filter(
            (country: any) => country.id === item.countryId
          )[0]?.name,
          subjects: [
            {
              ...item,
              pricePerHour: null,
              gradeName: this.grades[item.grade - 1],
            },
          ],
        });
      }
    });

    this.programs.at(index).patchValue({
      sortedSubjects: output,
    });
  }

  changePrice(
    index: number,
    indexSubjects: number,
    indexSubject: number,
    event: any
  ): void {
    const sortedSubjects = this.programs.at(index).get('sortedSubjects')?.value;

    this.programs.at(index).patchValue({
      sortedSubjects: sortedSubjects.map((subject: any, index: number) => {
        let subject_ = { ...subject };

        if (index === indexSubjects) {
          subject_ = {
            fieldId: subject.fieldId,
            fieldName: subject.fieldName,
            countryName: subject.countryName,
            subjects: subject.subjects.map((sub: any, indexSub: number) =>
              indexSub === indexSubject
                ? {
                    ...sub,
                    pricePerHour:
                      +event.target.value > 0 && +event.target.value <= 20
                        ? event.target.value
                        : null,
                  }
                : { ...sub }
            ),
          };
        }

        return subject_;
      }),
    });
  }

  submitFormData() {
    const allSubjects = [
      ...this.programs.value.map((program: any) => {
        const sortedSubjects = [
          ...program.sortedSubjects.map((subject: any) => [
            ...subject.subjects,
          ]),
        ];

        return sortedSubjects;
      }),
    ];

    const subjects = allSubjects.flat(Infinity);

    const data = {
      step: '5',
      subjects: subjects?.map((subject: any) => ({
        subject_id: subject?.id,
        program_id: subject?.programId,
        country_id: subject?.countryId,
        field_id: subject?.fieldId,
        grade: subject?.grade,
        name: subject?.name,
        hourly_price: +subject?.pricePerHour,
      })),
    };

    this.submitForm.emit(data);
  }
}
