import { generalConstants } from '@metutor/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-hourly-rate-per-subject-modal',
  templateUrl: './admin-hourly-rate-per-subject-modal.component.html',
  styleUrls: ['./admin-hourly-rate-per-subject-modal.component.scss']
})
export class AdminHourlyRatePerSubjectModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() sortedSubjects: any[];
  @Input() isAcceptingRequest: boolean;
  @Input() set tutor(_tutor: any) {
    this.tutorName = _tutor.name;

    if (_tutor?.subjects && _tutor?.subjects.length) {
      this.submittedSubjects = _tutor.subjects.map((item: any) => ({
        id: item.id,
        pricePerHour: item.pricePerHour
      }));

      this.form.get('subjects')?.setValue(this.submittedSubjects);
      this.form.get('subjects')?.updateValueAndValidity();
      this.form?.markAsDirty();
      this.form?.markAsTouched();
      this._updateLengthes();
    }
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  pricesLength = 0;
  subjectLength = 0;
  tutorName: string;
  submittedSubjects: any[] = [];
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      subjects: [],
      message: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const message = `Hi ${this.tutorName}, \nCongrats! You have been accepted to teach on MEtutors and will receive a confirmation email shortly. Welcome to the team! \n\n\nTalent Acquisition Team \nMEtutors`;

    this.form.get('message')?.setValue(message);
    this.form.markAsDirty();
    this._updateLengthes();
  }

  changePrice(id: number, event: any): void {
    this.submittedSubjects = this.submittedSubjects.map((item: any) =>
      item.id === id
        ? {
            ...item,
            pricePerHour:
              +event.target.value > 0 && +event.target.value <= 100
                ? event.target.value
                : null
          }
        : { ...item }
    );
    this.sortedSubjects = this.sortedSubjects.map(subject => {
      const list = subject.subjects.map((item: any) =>
        item.id === id
          ? {
              ...item,
              pricePerHour:
                +event.target.value > 0 && +event.target.value <= 100
                  ? event.target.value
                  : null
            }
          : { ...item }
      );

      return { ...subject, subjects: list };
    });

    this.form.get('subjects')?.setValue(this.submittedSubjects);
    this.form.get('subjects')?.updateValueAndValidity();
    this.form?.markAsDirty();
    this._updateLengthes();
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
