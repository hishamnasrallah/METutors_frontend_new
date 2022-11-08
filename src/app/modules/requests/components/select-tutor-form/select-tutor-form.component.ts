import { TutorStatus } from 'src/app/config';
import { ITutor, IClass } from 'src/app/core/models';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() selectedCourse!: any;
  @Input() price: number | null;
  @Input() loading: boolean | null;
  @Input() hours: number | undefined;
  @Input() suggestedTutors: ITutor[] | null;
  @Input() availableTutors: ITutor[] | null;
  @Input() set classrooms(classes: IClass[] | undefined) {
    if (classes && classes.length) {
      this.duration =
        Math.abs(
          new Date().getTime() - new Date(classes[0].date || '').getTime()
        ) / 3600000;
    }
  }
  @Input() set duration(value: number) {
    if (value) {
      this._duration = value;
      this.schedule = '';
    }
  }

  @Output() onBack = new EventEmitter();
  @Output() submitForm = new EventEmitter();
  @Output() filterTutors: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeSchedule: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() tutorAvailability: EventEmitter<number> =
    new EventEmitter<number>();

  schedule: string;
  _duration: number;
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

  onSearch(text: string): void {
    this.filterTutors.emit(text);
  }

  onViewAvailability(id: number): void {
    this.tutorAvailability.emit(id);
  }

  onChangeSchedule(data: any): void {
    if (data.value === '1') {
      this.changeSchedule.emit(false);
    } else {
      if (this._duration < 48) {
        this.tutor?.setValidators([Validators.required]);
        this.tutor?.updateValueAndValidity();
        this.changeSchedule.emit(true);
      } else {
        this.tutor?.setValidators([]);
        this.tutor?.updateValueAndValidity();
      }
    }
  }
}
