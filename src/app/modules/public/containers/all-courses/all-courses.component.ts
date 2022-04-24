import { Component, OnInit } from '@angular/core';
import { ICourse } from '@metutor/core/models';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';

@Component({
  selector: 'metutors-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' })),
        ]),
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' })),
        ]),
      ]),
    ]),
  ],
})
export class AllCoursesComponent implements OnInit {
  selectedFilter?: number;
  openFilter: boolean = false;
  courses: ICourse[] = [
    {
      id: 1,
      picture: '',
      name: 'Information Architecture',
      tag: 'Popular',
      description:
        'Understand Bitcoin’s real-life applications and learn how to attack and destroy Bitcoin, Ethereum, smart contracts and Dapps, and alternatives to Bitcoin’s Proof-of-Work',
      totalPrice: '$25',
    },
    {
      id: 2,
      picture: '',
      name: 'Information Architecture',
      tag: 'New',
      description:
        'Understand Bitcoin’s real-life applications and learn how to attack and destroy Bitcoin, Ethereum, smart contracts and Dapps, and alternatives to Bitcoin’s Proof-of-Work',
      totalPrice: '$25',
    },
    {
      id: 3,
      picture: '',
      name: 'Information Architecture',
      tag: 'New',
      description:
        'Understand Bitcoin’s real-life applications and learn how to attack and destroy Bitcoin, Ethereum, smart contracts and Dapps, and alternatives to Bitcoin’s Proof-of-Work',
      totalPrice: '$25',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  changeOpenSelection(id: number) {
    if (this.selectedFilter === id) {
      this.openFilter = false;
      this.selectedFilter = undefined;
    } else {
      this.openFilter = true;
      this.selectedFilter = id;
    }
  }
}
