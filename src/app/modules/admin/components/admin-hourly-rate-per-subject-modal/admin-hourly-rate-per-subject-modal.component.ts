import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generalConstants } from '@metutor/config';

@Component({
  selector: 'metutors-admin-hourly-rate-per-subject-modal',
  templateUrl: './admin-hourly-rate-per-subject-modal.component.html',
  styleUrls: ['./admin-hourly-rate-per-subject-modal.component.scss'],
})
export class AdminHourlyRatePerSubjectModalComponent implements OnInit {
  @Input() showModal = false;
  @Input() sortedSubjects: any[];
  @Input() isAcceptingRequest: boolean;
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

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  submittedSubjects: any[] = [];
  nationalId = generalConstants.nationalId;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      subjects: [],
      message: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  changePrice(id: number, event: any): void {
    this.submittedSubjects = this.submittedSubjects.map((item: any) =>
      item.id === id
        ? {
            ...item,
            pricePerHour: +event.target.value > 0 ? event.target.value : null,
          }
        : { ...item }
    );

    this.form.get('subjects')?.setValue(this.submittedSubjects);
    this.form.get('subjects')?.updateValueAndValidity();
  }
}
