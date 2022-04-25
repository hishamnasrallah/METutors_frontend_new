import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-student-makeup-class-modal',
  templateUrl: './student-makeup-class-modal.component.html',
  styleUrls: ['./student-makeup-class-modal.component.scss'],
})
export class StudentMakeupClassModalComponent implements OnInit {
  @Input() isSubmitting: boolean;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private _fb: FormBuilder) {}

  form: FormGroup;
  minDate = new Date();

  ngOnInit(): void {
    this.form = this._fb.group({
      end_time: [null, Validators.required],
      start_time: [null, Validators.required],
      start_date: [null, Validators.required],
    });
  }
}
