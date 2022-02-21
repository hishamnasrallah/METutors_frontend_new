import { Component, OnInit } from '@angular/core';
import { IStatistics, ITutor } from 'src/app/core/models';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  teachers?: ITutor[];
  testmonials?: any[];
  academicStatistics?: IStatistics[];

  constructor() {}

  ngOnInit(): void {
    this.academicStatistics = [
      {
        id: 1,
        icon: 'assets/svg/marketing.svg',
        value: '340',
        type: 'Courses created',
      },
      {
        id: 1,
        icon: 'assets/svg/create-new.svg',
        value: '30k',
        type: 'Courses enrolled',
      },
      {
        id: 1,
        icon: 'assets/svg/pen.svg',
        value: '40k',
        type: 'Classrooms watched',
      },
      {
        id: 1,
        icon: 'assets/svg/headset.svg',
        value: '300',
        type: 'Tickets issued',
      },
    ];

    this.teachers = [
      {
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        major: 'University of canada',
        rate: 4.5,
        reviewsCount: 10,
        country: 'Egypt',
        studentNumber: 100,
        bio: "Bio: Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: '1', name: 'Geographics' },
          { id: '2', name: 'Math' },
          { id: '3', name: 'Science' },
        ],
      },
      {
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        major: 'University of canada',
        rate: 4.5,
        reviewsCount: 10,
        country: 'Egypt',
        studentNumber: 100,
        bio: "Bio: Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: '1', name: 'Geographics' },
          { id: '2', name: 'Math' },
          { id: '3', name: 'Science' },
        ],
      },
      {
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        major: 'University of canada',
        rate: 4.5,
        reviewsCount: 10,
        country: 'Egypt',
        studentNumber: 100,
        bio: "Bio: Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: '1', name: 'Geographics' },
          { id: '2', name: 'Math' },
          { id: '3', name: 'Science' },
        ],
      },
      {
        avatar: '',
        status: 'Online',
        name: 'Anna Mendez',
        major: 'University of canada',
        rate: 4.5,
        reviewsCount: 10,
        country: 'Egypt',
        studentNumber: 100,
        bio: "Bio: Hello everyone! My name is Charlene and I'm from China.",
        subjects: [
          { id: '1', name: 'Geographics' },
          { id: '2', name: 'Math' },
          { id: '3', name: 'Science' },
        ],
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
