import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TutorStatus } from 'src/app/config';
import { ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-home-featured-tutors',
  templateUrl: './home-featured-tutors.component.html',
  styleUrls: ['./home-featured-tutors.component.scss'],
})
export class HomeFeaturedTutorsComponent implements OnInit {
  @Input() teachers: ITutor[] = [];

  tutorStatus = TutorStatus;
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
        items: 3,
      },
    },
    nav: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
