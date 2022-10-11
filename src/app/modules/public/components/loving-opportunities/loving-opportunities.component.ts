import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-loving-opportunities',
  templateUrl: './loving-opportunities.component.html',
  styleUrls: ['./loving-opportunities.component.scss'],
})
export class LovingOpportunitiesComponent implements OnInit {
  @Input() opportunities?: any[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 900,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
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
