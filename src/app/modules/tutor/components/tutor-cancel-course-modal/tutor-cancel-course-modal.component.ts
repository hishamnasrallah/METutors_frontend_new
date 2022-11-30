import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-cancel-course-modal',
  templateUrl: './tutor-cancel-course-modal.component.html',
  styleUrls: ['./tutor-cancel-course-modal.component.scss'],
})
export class TutorCancelCourseModalComponent implements OnInit {
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;
  isCanceling$: Observable<boolean>;

  constructor(private _store: Store<any>, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isCanceling$ = this._store.select(fromCore.selectIsCancelingCourse);

    this.form = this._formBuilder.group({
      reason: [null, [Validators.required, Validators.minLength(10)]],
    });
  }
}
