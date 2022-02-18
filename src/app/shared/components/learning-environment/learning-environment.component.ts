import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addLookups, getLookups } from 'src/app/config';
import { LookupsService } from 'src/app/core/services';

@Component({
  selector: 'metutors-learning-environment',
  templateUrl: './learning-environment.component.html',
  styleUrls: ['./learning-environment.component.scss'],
})
export class LearningEnvironmentComponent implements OnInit, OnDestroy {
  courseFieldSubject: any[] = [];
  getCourseFieldSub?: Subscription;

  constructor(private _lookupsService: LookupsService) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy(): void {
    this.getCourseFieldSub?.unsubscribe();
  }
}
