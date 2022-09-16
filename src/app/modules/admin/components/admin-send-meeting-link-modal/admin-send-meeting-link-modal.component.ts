import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-admin-send-meeting-link-modal',
  templateUrl: './admin-send-meeting-link-modal.component.html',
  styleUrls: ['./admin-send-meeting-link-modal.component.scss'],
})
export class AdminSendMeetingLinkModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  form: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      link: [null, [Validators.required]],
    });
  }
}
