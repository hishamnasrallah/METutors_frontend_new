import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory, IClassroom, ITutor } from 'src/app/core/models';
import { CoursesService, TutorsService } from 'src/app/core/services';

@Component({
  selector: 'metutors-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  teachers: ITutor[] = [];
  categories: ICategory[] = [];
  classroomsPrepSub?: Subscription;
  classroomsLangSub?: Subscription;
  classroomsPrep: IClassroom[] = [];
  classroomsLang: IClassroom[] = [];
  getFeaturedTutorsSub?: Subscription;
  fetchMainServicesSub?: Subscription;

  constructor(
    private _coursesService: CoursesService,
    private _tutorsService: TutorsService
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
  }

  ngOnDestroy(): void {
    this.classroomsPrepSub?.unsubscribe();
    this.classroomsLangSub?.unsubscribe();
    this.fetchMainServicesSub?.unsubscribe();
    this.getFeaturedTutorsSub?.unsubscribe();
  }
}
