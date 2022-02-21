import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addLookups, addMisc, getLookups, getMisc } from 'src/app/config';
import { ICategory, IClassroom, ITutor } from 'src/app/core/models';
import {
  CoursesService,
  LookupsService,
  MiscService,
  TutorsService,
} from 'src/app/core/services';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  teachers: ITutor[] = [];
  testmonials: any[] = [];
  categories: ICategory[] = [];
  courseFieldSubject: any[] = [];
  classroomsPrepSub?: Subscription;
  classroomsLangSub?: Subscription;
  getCourseFieldSub?: Subscription;
  classroomsPrep: IClassroom[] = [];
  classroomsLang: IClassroom[] = [];
  getFeaturedTutorsSub?: Subscription;
  fetchMainServicesSub?: Subscription;
  getFeaturedTestmonialsSub?: Subscription;

  constructor(
    private _miscService: MiscService,
    private _tutorsService: TutorsService,
    private _coursesService: CoursesService,
    private _lookupsService: LookupsService
  ) {}

  ngOnInit(): void {
    this.fetchMainServicesSub = this._coursesService
      .fetchMainServices()
      .subscribe((response) => {
        this.categories = response.results;
      });

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

    this.getFeaturedTutorsSub = this._tutorsService
      .fetchFeaturedTutors()
      .subscribe(
        (fetchedTutors) => {
          this.teachers = fetchedTutors;
        },
        () => {}
      );

    this.getCourseFieldSub = this._lookupsService
      .fetchCourseFieldSubject()
      .subscribe(
        (fetchedValues) => {
          this.courseFieldSubject = fetchedValues.results;
          addLookups('courseFieldSubject', this.courseFieldSubject);
        },
        () => {}
      );
    this.courseFieldSubject = getLookups().courseFieldSubject;

    this.getFeaturedTestmonialsSub = this._miscService
      .fetchTestmonials()
      .subscribe(
        (fetchedTestmonials) => {
          this.testmonials = fetchedTestmonials.results;
          addMisc('testmonials', this.testmonials);
        },
        () => {}
      );
    this.testmonials = getMisc().testmonials;
  }

  ngOnDestroy(): void {
    this.classroomsPrepSub?.unsubscribe();
    this.classroomsLangSub?.unsubscribe();
    this.getCourseFieldSub?.unsubscribe();
    this.fetchMainServicesSub?.unsubscribe();
    this.getFeaturedTutorsSub?.unsubscribe();
    this.getFeaturedTestmonialsSub?.unsubscribe();
  }
}
