import { FormControlDirective, FormControlName } from '@angular/forms';
import { Directive, HostListener, Input, Optional } from '@angular/core';

@Directive({
  selector: '[meTutorsTrimInput]'
})
export class TrimInputDirective {
  @Input() type?: string;

  constructor(
    @Optional() private _formControlDir: FormControlDirective,
    @Optional() private _formControlName: FormControlName
  ) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any): void {
    const keyCode = e.keyCode;

    if (keyCode === 32 && e.target.selectionStart === 0) {
      e.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  trimValue(): void {
    const control =
      this._formControlDir?.control || this._formControlName?.control;

    if (typeof control.value === 'string' && this.type !== 'password') {
      control.setValue(control.value.trim());
    }
  }
}
