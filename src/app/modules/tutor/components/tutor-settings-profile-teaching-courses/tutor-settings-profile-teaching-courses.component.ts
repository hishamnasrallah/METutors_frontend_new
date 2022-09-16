import { generalConstants } from '@metutor/config';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  submittedSubjects: any[] = [];
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
            pricePerHour: +event.target.value > 0 ? event.target.value : null,
          }
        : { ...item }
    );

    this.form.get('subjects')?.setValue(this.submittedSubjects);
    this.form.get('subjects')?.updateValueAndValidity();
    this.form?.markAsDirty();
  }

  onSubmit(form: FormGroup): void {
    if (form.valid) {
      this.submitForm.emit(form);
    }
  }
}
