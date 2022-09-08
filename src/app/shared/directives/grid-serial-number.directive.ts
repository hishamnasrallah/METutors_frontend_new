import { Input, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'meTutorsGridSerialNumber',
})
export class GridSerialNumberDirective {
  @Input('meTutorsGridSerialNumber') params: {
    page: number;
    index: number;
    currentPage: number;
  };

  constructor(private _el: ElementRef) {
    console.log(this.params);
    this._el.nativeElement.innerHTML = 5;
  }
}
