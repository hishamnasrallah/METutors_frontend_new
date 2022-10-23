import { FormBuilder, FormGroup } from '@angular/forms';
import { generalConstants, InterviewStatus } from '@metutor/config';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-settings-profile-teaching-courses',
  templateUrl: './tutor-settings-profile-teaching-courses.component.html',
  styleUrls: ['./tutor-settings-profile-teaching-courses.component.scss'],
})
export class TutorSettingsProfileTeachingCoursesComponent implements OnInit {
  @Input() status: string;
  @Input() isSubmitting: boolean;
  @Input() sortedSubjects: any[];
  @Input() set subjects(_subjects: any) {
    if (_subjects && _subjects.length) {
      this.submittedSubjects = _subjects.map((item: any) => ({
        id: item.id,
        pricePerHour: item.pricePerHour,
      }));

      this.form.get('subjects')?.setValue(this.submittedSubjects);
      this.form.get('subjects')?.updateValueAndValidity();
    }
  }

  @Output() submitForm = new EventEmitter();

  form: FormGroup;
  pricesLength = 0;
  subjectLength = 0;
  submittedSubjects: any[] = [];
  interviewStatus = InterviewStatus;
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      subjects: [],
    });
  }

  ngOnInit(): void {}

  changePrice(id: number, event: any): void {
    this.submittedSubjects = this.submittedSubjects.map((item: any) =>
      item.id === id
        ? {
            ...item,
            pricePerHour:
              +event.target.value > 0 && +event.target.value <= 100
                ? event.target.value
                : null,
          }
        : { ...item }
    );

    this.sortedSubjects = this.sortedSubjects?.map((subject: any) => ({
      ...subject,
      fieldId: subject.fieldId,
      fieldName: subject.fieldName,
      countryName: subject.countryName,
      countryFlag: subject.countryFlag,
      subjects: subject.subjects.map((sub: any) =>
        sub?.id === id
          ? {
              ...sub,
              pricePerHour:
                +event.target.value > 0 && +event.target.value <= 100
                  ? event.target.value
                  : null,
            }
          : { ...sub }
      ),
    }));

    this.form.get('subjects')?.setValue(this.submittedSubjects);
    this.form.get('subjects')?.updateValueAndValidity();
    this.form?.markAsDirty();
    this._updateLengthes();
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form);

      this.form.markAsPristine();
    }
  }

  private _updateLengthes(): void {
    this.pricesLength = [
      ...this.sortedSubjects?.map((subject: any) => [
        ...subject.subjects?.filter((sub: any) => sub.pricePerHour),
      ]),
    ]?.flat(Infinity)?.length;

    this.subjectLength = [
      ...this.sortedSubjects.map((subject: any) => [...subject.subjects]),
    ]?.flat(Infinity)?.length;
  }
}
