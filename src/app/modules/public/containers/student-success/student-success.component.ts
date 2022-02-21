import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addMisc, getMisc } from 'src/app/config';
import { MiscService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-success',
  templateUrl: './student-success.component.html',
  styleUrls: ['./student-success.component.scss'],
})
export class StudentSuccessComponent implements OnInit, OnDestroy {
  testmonials: any[] = [];
  whyTeachingUsList: any[] = [];
  getWhyTeachingUsSub?: Subscription;
  getFeaturedTestmonialsSub?: Subscription;

  constructor(private _miscService: MiscService) {}

  ngOnInit(): void {
    this.getWhyTeachingUsSub = this._miscService.fetchWhyTeachingUs().subscribe(
      (fetchedValues) => {
        this.whyTeachingUsList = fetchedValues.results;
        addMisc('whyTeachingUsList', this.whyTeachingUsList);
      },
      () => {}
    );

    this.whyTeachingUsList = getMisc().whyTeachingUsList;

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
    this.getWhyTeachingUsSub?.unsubscribe();
    this.getFeaturedTestmonialsSub?.unsubscribe();
  }
}
