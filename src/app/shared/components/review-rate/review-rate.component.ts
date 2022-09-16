import { Input, OnInit, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'metutors-review-rate',
  templateUrl: './review-rate.component.html',
  styleUrls: ['./review-rate.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReviewRateComponent),
      multi: true,
    },
  ],
})
export class ReviewRateComponent implements OnInit, ControlValueAccessor {
  @Input() id = 1;
  @Input() set rate(data: number) {
    this._rate = data;
    this.onChange(data);
    this.onTouched();
  }
  @Input() readOnly = false;

  get rate(): number {
    return this._rate;
  }

  hoverIndex = -1;
  list = [1, 2, 3, 4, 5];
  private _rate: number;

  constructor() {}

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.rate = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}

  ratedValue(value: number): void {
    this.rate = value;
  }
}
