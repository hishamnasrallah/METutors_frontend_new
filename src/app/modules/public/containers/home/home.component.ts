import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ICategory,
  IClassroom,
  IStatistics,
  ITutor,
} from 'src/app/core/models';
import { CoursesService } from 'src/app/core/services';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  teachers?: ITutor[];
  testmonials?: any[];
  classroomsPrepSub?: Subscription;
  classroomsLangSub?: Subscription;
  classroomsPrep: IClassroom[] = [];
  classroomsLang: IClassroom[] = [];
  academicStatistics?: IStatistics[];
  getFeaturedTutorsSub?: Subscription;
  fetchMainServicesSub?: Subscription;

  constructor(private _coursesService: CoursesService) {}

  ngOnInit(): void {
    this.classroomsPrepSub = this._coursesService
      .fetchClassroomsQuery({ homePage: '01' })
      .subscribe((response) => {
        this.classroomsPrep = response.classrooms;
      });

    this.classroomsLangSub = this._coursesService
      .fetchClassroomsQuery({ homePage: '02' })
      .subscribe((response) => {
        this.classroomsLang = response.classrooms;
      });

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

  ngOnDestroy(): void {
    this.classroomsPrepSub?.unsubscribe();
    this.classroomsLangSub?.unsubscribe();
    this.fetchMainServicesSub?.unsubscribe();
    this.getFeaturedTutorsSub?.unsubscribe();
  }
}
