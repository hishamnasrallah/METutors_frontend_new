import { Component, OnInit } from '@angular/core';
import { ICourse } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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
  isLoading$: Observable<boolean>;
  exploredCourses$: Observable<any>;

  name?: string;
  openFilter: boolean = true;
  selectedFieldOfStudy: number[] = [];

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareCourses();
  }

  onChangeField(event: any, id: number): void {
    if (event?.checked) {
      this.selectedFieldOfStudy.push(id);
    } else {
      this.selectedFieldOfStudy.splice(
        this.selectedFieldOfStudy.indexOf(id),
        1
      );
    }
  }

  filterCourses(): void {
    this.exploredCourses$ = this._store.select(
      fromCore.selectFilteredExploredCourses,
      {
        name: this.name,
        fieldIds: this.selectedFieldOfStudy,
      }
    );
  }

  private _prepareCourses(): void {
    this._store.dispatch(fromCore.exploreCourses());
    this.exploredCourses$ = this._store.select(fromCore.selectExploredCourses);
    this.isLoading$ = this._store.select(
      fromCore.selectIsLoadingExploredCourses
    );
  }
}
