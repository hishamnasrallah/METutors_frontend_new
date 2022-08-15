import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'metutors-char-counter',
  templateUrl: './char-counter.component.html',
  styleUrls: ['./char-counter.component.scss'],
})
export class CharCounterComponent implements OnInit {
  @Input() limit: number;
  @Input() controlName: AbstractControl | null;

  constructor() {}

  ngOnInit(): void {}
}
