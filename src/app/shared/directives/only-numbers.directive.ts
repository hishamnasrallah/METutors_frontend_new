import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[meTutorsOnlyNumber]',
})
export class OnlyNumberDirective {
  @Input() onlyNumber!: boolean;

  constructor() {}

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: any) {
    let e = <KeyboardEvent>event;

    if (this.onlyNumber) {
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        return;
      }

      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }

      const value = (event.target as HTMLInputElement).value;
      const sp = (value + '').split('.');

      if (sp[1] !== undefined) {
        if (sp[1].length > 1) {
          e.preventDefault();
        }
      }
    }
  }
}
