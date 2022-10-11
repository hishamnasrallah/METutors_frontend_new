import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-languages-testomonial',
  templateUrl: './languages-testomonial.component.html',
  styleUrls: ['./languages-testomonial.component.scss'],
})
export class LanguagesTestomonialComponent implements OnInit {
  @Input() testmonials: any;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 900,
    navText: [
      '<mat-icon>chevron_left</mat-icon>',
      '<mat-icon>chevron_right</mat-icon>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
    },
    nav: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
