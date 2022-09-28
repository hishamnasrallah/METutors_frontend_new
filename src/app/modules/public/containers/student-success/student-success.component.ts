import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { IStatistics } from '@metutor/core/models';

@Component({
  selector: 'metutors-student-success',
  templateUrl: './student-success.component.html',
  styleUrls: ['./student-success.component.scss'],
})
export class StudentSuccessComponent implements OnInit {
  token$: Observable<string | undefined>;

  testmonials?: any[];
  academicStatistics?: IStatistics[];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.token$ = this._store.select(fromCore.selectToken);

    this.academicStatistics = [
      {
        id: 1,
        icon: 'assets/svg/marketing.svg',
        value: '340',
        type: 'Courses Created',
      },
      {
        id: 1,
        icon: 'assets/svg/create-new.svg',
        value: '30K',
        type: 'Students Enrolled',
      },
      {
        id: 1,
        icon: 'assets/svg/pen.svg',
        value: '10K',
        type: 'Classrooms Attended',
      },
      {
        id: 1,
        icon: 'assets/svg/headset.svg',
        value: '300+',
        type: 'Teacher Profiles',
      },
    ];

    this.testmonials = [
      {
        id: 1,
        rate: 5,
        content:
          'I received great customer service from the specialists who helped me. I would recommend to anyone who wants quality.',
        picture: '',
        postedBy: 'Viola Manisa',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          "Very responsive and competent! I've never dealt with annsurance company this customer-friendly in my entire life.",
        picture: '',
        postedBy: 'Bryan Arnoldy',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          'My experience with this platform so far has been great. Everything is easy, from signing the contract to making an appointment.',
        picture: '',
        postedBy: 'Joshua William',
        isVerified: true,
      },
      {
        id: 1,
        rate: 5,
        content:
          "It's the best online insurance you can find. Easy, without hidden costs and you can be very sure. our data is completely save.",
        picture: '',
        postedBy: 'George Scott',
        isVerified: true,
      },
    ];
  }
}
