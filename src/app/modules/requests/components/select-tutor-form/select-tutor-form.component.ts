import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TutorStatus } from 'src/app/config';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-select-tutor-form',
  templateUrl: './select-tutor-form.component.html',
  styleUrls: ['./select-tutor-form.component.scss'],
})
export class SelectTutorFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() tutors: ITutor[] | null;
  @Input() loading: boolean | null;

  @Output() onBack = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  tutorStatus = TutorStatus;

  constructor() {}

  ngOnInit(): void {}

  get tutor(): AbstractControl | null {
    return this.form.get('tutor');
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.submitForm.emit(form.value);
    }
  }
}
