import { Component, OnDestroy, OnInit } from '@angular/core';
import { MiscService } from 'src/app/core/services';

@Component({
  selector: 'metutors-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  founders: any[] = [
    {
      image: '',
      name: 'Claudio Giglieri',
      position: 'Co-creator of MEtutors',
    },
    {
      image: '',
      name: 'Elsie Mendoza',
      position: 'VP of Engineering',
    },
    {
      image: '',
      name: 'Philip Castro',
      position: 'CEO at MEtutors',
    },
    {
      image: '',
      name: 'Carrie Angela',
      position: 'Co-Founder, Head of Product',
    },
  ];

  whyMeTutorsList = [
    {
      id: 1,
      value: 'Very competitive prices',
    },
    {
      id: 2,
      value: 'Personalized course design',
    },
    {
      id: 3,
      value: 'Powerful online tools and technology',
    },
    {
      id: 4,
      value: 'Highly trained and dynamic instructors',
    },
    {
      id: 5,
      value: 'Flexible scheduling for people on the go',
    },
    {
      id: 6,
      value: 'Attentive and responsive customer support',
    },
    {
      id: 7,
      value: 'Provide a relax yet professional learning environment',
    },
    {
      id: 8,
      value: 'Innovative, stimulating and efficacious lessons',
    },
  ];

  constructor(private _miscService: MiscService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
