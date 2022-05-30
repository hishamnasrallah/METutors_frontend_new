import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { TutorStatus } from 'src/app/config';
import { ITutor } from 'src/app/core/models';
import {
  state,
  style,
  group,
  trigger,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'metutors-select-tutor-form',
  templateUrl: './select-tutor-form.component.html',
  styleUrls: ['./select-tutor-form.component.scss'],
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
export class SelectTutorFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() price: number | null;
  @Input() tutors: ITutor[] | null;
  @Input() loading: boolean | null;
  @Input() hours: number | undefined;

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
