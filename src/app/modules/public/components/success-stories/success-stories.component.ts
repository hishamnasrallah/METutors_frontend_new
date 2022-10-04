import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'metutors-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss'],
})
export class SuccessStoriesComponent implements OnInit {
  @Input() desc: string;
  @Input() title: string;
  @Input() testmonials?: any[];

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
        items: 1,
      },
      740: {
        items: 3,
      },
    },
    nav: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
