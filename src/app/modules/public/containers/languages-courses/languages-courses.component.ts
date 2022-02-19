import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { addMisc, getMisc } from 'src/app/config';
import { ICategory, ICourse } from 'src/app/core/models';
import { CoursesService, MiscService } from 'src/app/core/services';

@Component({
  selector: 'metutors-languages-courses',
  templateUrl: './languages-courses.component.html',
  styleUrls: ['./languages-courses.component.scss'],
})
export class LanguagesCoursesComponent implements OnInit {
  testmonials = [];
  category?: ICategory;
  langCourseIntro: any;
  categoryCourses?: ICourse[];
  fetchServiceSub?: Subscription;
  categoryCoursesSub?: Subscription;
  getFeaturedTestmonialsSub?: Subscription;
  getFetchLangCourseIntroductionSub?: Subscription;

  constructor(
    private _title: Title,
    private _courseService: CoursesService,
    private _miscService: MiscService
  ) {}

  ngOnInit(): void {
    this.fetchServiceSub = this._courseService
      .fetchService(2)
      .subscribe((response) => {
        this.category = response;
        this._title.setTitle(this.category?.name || '');
      });

    this.getFetchLangCourseIntroductionSub = this._miscService
      .fetchLangCourseIntroduction()
      .subscribe(
        (response) => {
          this.langCourseIntro = response.results;
          addMisc('langCourseIntro', this.langCourseIntro);
        },
        () => {}
      );

    this.langCourseIntro = getMisc().langCourseIntro;

    this.categoryCoursesSub = this._courseService
      .fetchCategoryCourses(2)
      .subscribe((response) => {
        this.categoryCourses = response;
      });

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
    this.fetchServiceSub?.unsubscribe();
    this.getFetchLangCourseIntroductionSub?.unsubscribe();
    this.categoryCoursesSub?.unsubscribe();
    this.getFeaturedTestmonialsSub?.unsubscribe();
  }
}
