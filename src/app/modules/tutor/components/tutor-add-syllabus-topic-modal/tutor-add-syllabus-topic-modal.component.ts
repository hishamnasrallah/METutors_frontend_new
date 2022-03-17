import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-add-syllabus-topic-modal',
  templateUrl: './tutor-add-syllabus-topic-modal.component.html',
  styleUrls: ['./tutor-add-syllabus-topic-modal.component.scss'],
})
export class TutorAddSyllabusTopicModalComponent implements OnInit {
  @Input() topic: any;
  @Input() showModal = false;
  @Input() totalClasses: number;
  @Input() isSubmitting = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  onClassSelect(selectedClass: any) {
    const val = selectedClass.value ? selectedClass.value : null;
    this.classes?.setValue(val);
  }

  get classes(): AbstractControl | null {
    return this.form.get('classes');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      id: [this.topic ? this.topic?.id : null],
      name: [this.topic ? this.topic?.name : null, Validators.required],
      classes: [
        this.topic ? this.topic?.classes?.length : null,
        Validators.required,
      ],
      description: [
        this.topic ? this.topic?.description : null,
        Validators.required,
      ],
    });
  }
}
