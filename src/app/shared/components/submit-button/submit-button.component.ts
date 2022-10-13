import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
})
export class SubmitButtonComponent implements OnInit {
  @Input() form?: FormGroup;
  @Input() extraClasses?: string;
  @Input() isDisabled: boolean | undefined;
  @Input() isSubmitting: boolean | null | undefined;

  constructor() {}

  ngOnInit(): void {}
}
