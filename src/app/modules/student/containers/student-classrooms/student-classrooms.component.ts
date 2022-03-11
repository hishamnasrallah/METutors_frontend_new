import {
  animate,
  group,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { IClassroom } from 'src/app/core/models';
import { CoursesService } from 'src/app/core/services';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCore from '@metutor/core/state';
import { IUser } from '@metutor/core/models';
import * as fromRoot from '@metutor/state';

@Component({
  selector: 'metutors-student-classrooms',
  templateUrl: './student-classrooms.component.html',
  styleUrls: ['./student-classrooms.component.scss'],
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
export class StudentClassroomsComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;

  openActive = true;
  isLoading?: boolean;
  openCompleted = true;
  activeClassrooms: IClassroom[] = [];
  completedClassrooms: IClassroom[] = [];

  constructor(
    private _courseService: CoursesService,
    private _store: Store<any>
  ) {}

  ngOnInit(): void {
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this.isLoading = true;
    this._courseService.fetchMyClassrooms().subscribe(
      (response) => {
        this.isLoading = false;
        if (response && response.length) {
          this.activeClassrooms = response.filter(
            (classroom: any) => classroom?.isComplete === false
          );

          this.completedClassrooms = response.filter(
            (classroom: any) => classroom?.isComplete === true
          );
        }
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
