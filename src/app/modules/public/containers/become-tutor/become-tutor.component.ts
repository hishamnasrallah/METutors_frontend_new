import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addMisc, getMisc } from 'src/app/config';
import { IStatistics } from 'src/app/core/models';
import { MiscService } from 'src/app/core/services';

@Component({
  selector: 'metutors-become-tutor',
  templateUrl: './become-tutor.component.html',
  styleUrls: ['./become-tutor.component.scss'],
})
export class BecomeTutorComponent implements OnInit, OnDestroy {
  step?: string;
  becomeTutors: any;
  opportunities = [];
  selectedCourse: any;
  whyTeachingUsList: any[] = [];
  requestCoursesList: any[] = [];
  tutorStatistics?: IStatistics[];
  getBecomeTutorsSub?: Subscription;
  getOpportunitiesSub?: Subscription;
  getWhyTeachingUsSub?: Subscription;
  getTutorStatisticsSub?: Subscription;
  getRequestCoursesListSub?: Subscription;

  constructor(private _miscService: MiscService) {}

  ngOnInit(): void {
    this.getBecomeTutorsSub = this._miscService.fetchBecomeTutors().subscribe(
      (fetchedValues) => {
        this.becomeTutors = fetchedValues;
        addMisc('becomeTutors', this.becomeTutors);
      },
      () => {}
    );
    this.becomeTutors = getMisc().becomeTutors;

    this.getTutorStatisticsSub = this._miscService
      .fetchTutorStatistics()
      .subscribe(
        (fetchedTutor) => {
          this.tutorStatistics = fetchedTutor;
          addMisc('tutorStatistics', this.tutorStatistics);
        },
        () => {}
      );
    this.tutorStatistics = getMisc().tutorStatistics;

    this.getOpportunitiesSub = this._miscService.fetchOpportunities().subscribe(
      (fetchedOpportunities) => {
        this.opportunities = fetchedOpportunities.results;
        addMisc('opportunities', this.opportunities);
      },
      () => {}
    );
    this.opportunities = getMisc().opportunities;

    this.getRequestCoursesListSub = this._miscService
      .fetchRequestCoursesList()
      .subscribe(
        (fetchedValues) => {
          this.requestCoursesList = fetchedValues.results;
          if (this.requestCoursesList && this.requestCoursesList.length) {
            this.selectedCourse = this.requestCoursesList[0];
            this.step = 'STEP' + this.selectedCourse?.id;
          }
          addMisc('requestCoursesList', this.requestCoursesList);
        },
        () => {}
      );
    this.requestCoursesList = getMisc().requestCoursesList;

    this.getWhyTeachingUsSub = this._miscService.fetchWhyTeachingUs().subscribe(
      (fetchedValues) => {
        this.whyTeachingUsList = fetchedValues.results;
        addMisc('whyTeachingUsList', this.whyTeachingUsList);
      },
      () => {}
    );
    this.whyTeachingUsList = getMisc().whyTeachingUsList;
  }

  ngOnDestroy(): void {
    this.getBecomeTutorsSub?.unsubscribe();
    this.getTutorStatisticsSub?.unsubscribe();
    this.getOpportunitiesSub?.unsubscribe();
    this.getRequestCoursesListSub?.unsubscribe();
    this.getWhyTeachingUsSub?.unsubscribe();
  }
}
