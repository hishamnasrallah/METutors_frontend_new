/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[meTutorsLettersOnly]',
})
export class LettersOnlyDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(e: any): void {
    const keyCode = e.keyCode;
    const key = e.key;

    if (keyCode === 32 && e.target.selectionStart === 0) {
      e.preventDefault();
    }

    if (
      key &&
      (key.toUpperCase().match('[A-ZÀ-ÚÄ-Üs]+') !== null ||
        key.match('^[\u0621-\u064Asp{N}]+$') !== null ||
        keyCode === 32) // Space
    ) {
      return;
    } else {
      e.preventDefault();
    }
  }
}
