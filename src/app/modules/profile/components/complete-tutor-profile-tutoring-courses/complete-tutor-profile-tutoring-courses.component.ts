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
            countryFlag: item?.country?.flag,
            grade: item?.grade,
            subjects: [{ ...item }],
          });
        }
      });

      this.subjects = output;
    }
  }

  @Output() changeStep = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  grades = GRADES;
  form: FormGroup;
  subjects: any[];
  pricesLength = 0;
  subjectLength = 0;
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

    this._updateLengthes();
  }

  removeProgram(i: number): void {
    (this.form?.get('programs') as FormArray).removeAt(i);

    this._updateLengthes();
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

  onChangeProgram({ value }: any, index: number): void {
    if (value.id === this.nationalId) {
      this.programs
        .at(index)
        ?.get('countries')
        ?.setValidators([Validators.required]);
      this.programs
        .at(index)
        ?.get('grades')
        ?.setValidators([Validators.required]);
    } else {
      this.programs.at(index)?.get('countries')?.clearValidators();
      this.programs.at(index)?.get('grades')?.clearValidators();
    }

    this.programs.at(index).patchValue({
      grades: [],
      fields: [],
      subjects: [],
      countries: [],
      sortedSubjects: [],
    });

    this.programs.at(index)?.get('grades')?.updateValueAndValidity();
    this.programs.at(index)?.get('countries')?.updateValueAndValidity();
    this.programs.at(index)?.get('sortedSubjects')?.updateValueAndValidity();

    this._updateLengthes();
  }

  resetSubjects(index: number): void {
    this.programs.at(index).patchValue({
      fields: [],
      subjects: [],
      sortedSubjects: [],
    });

    this.programs.at(index)?.get('sortedSubjects')?.updateValueAndValidity();

    this._updateLengthes();
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
          {
            ...item,
            pricePerHour: null,
            gradeName: this.grades[item.grade - 1],
          },
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
          countryFlag: this.countries?.filter(
            (country: any) => country.id === item.countryId
          )[0]?.flag,
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

    this._updateLengthes();
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
            countryFlag: subject.countryFlag,
            subjects: subject.subjects.map((sub: any, indexSub: number) =>
              indexSub === indexSubject
                ? {
                    ...sub,
                    pricePerHour:
                      +event.target.value > 0 && +event.target.value <= 100
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

    this._updateLengthes();
  }

  checkEmptySubjects(index: number, indexSubjects: number): boolean {
    let isEmpty = true;

    const subjectsLength = [
      ...[...this.programs.value[index].sortedSubjects[indexSubjects].subjects],
    ]?.flat(Infinity)?.length;
    const filledSubjectsLength = [
      ...[
        ...this.programs.value[index].sortedSubjects[
          indexSubjects
        ].subjects?.filter((sub: any) => sub.pricePerHour),
      ],
    ]?.flat(Infinity)?.length;

    if (filledSubjectsLength === subjectsLength) isEmpty = false;

    return isEmpty;
  }

  checkIfNoFieldsExists(index: number): boolean {
    let isNoData = false;
    const selectedProgram = this.form.value.programs[index];

    if (selectedProgram?.programId?.id === this.nationalId) {
      const list =
        this.fields && this.fields?.length
          ? this.fields.filter(
              (field) =>
                +selectedProgram?.programId?.id === +field.programId &&
                selectedProgram.countries?.includes(+field.countryId)
            )
          : [];

      if (list.length === 0) isNoData = true;
    } else {
      const list =
        this.fields && this.fields?.length
          ? this.fields.filter(
              (field) => +selectedProgram?.programId?.id === +field.programId
            )
          : [];

      if (list.length === 0) isNoData = true;
    }

    return isNoData;
  }

  checkIfNoSubjectsExists(index: number): boolean {
    let isNoData = false;
    const selectedProgram = this.form.value.programs[index];

    if (selectedProgram?.programId?.id === this.nationalId) {
      const list =
        this.subjects && this.subjects?.length
          ? this.subjects.filter(
              (subject) =>
                +selectedProgram?.programId?.id === +subject.programId &&
                selectedProgram.fields?.includes(+subject.fieldId) &&
                selectedProgram.countries?.includes(+subject.countryId) &&
                selectedProgram.grades?.includes(+subject.grade)
            )
          : [];

      if (list.length === 0) isNoData = true;
    } else {
      const list =
        this.subjects && this.subjects?.length
          ? this.subjects.filter(
              (subject) =>
                +selectedProgram?.programId?.id === +subject.programId &&
                selectedProgram.fields?.includes(+subject.fieldId)
            )
          : [];

      if (list.length === 0) isNoData = true;
    }

    return isNoData;
  }

  submitFormData(): void {
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

  private _updateLengthes(): void {
    this.subjectLength = [
      ...this.programs.value?.map((program: any) => {
        const sortedSubjects = [
          ...program.sortedSubjects.map((subject: any) => [
            ...subject.subjects,
          ]),
        ];

        return sortedSubjects;
      }),
    ]?.flat(Infinity)?.length;

    this.pricesLength = [
      ...this.programs.value?.map((program: any) => {
        const sortedSubjects = [
          ...program.sortedSubjects.map((subject: any) => [
            ...subject.subjects.filter((sub: any) => sub.pricePerHour),
          ]),
        ];

        return sortedSubjects;
      }),
    ]?.flat(Infinity)?.length;
  }
}
