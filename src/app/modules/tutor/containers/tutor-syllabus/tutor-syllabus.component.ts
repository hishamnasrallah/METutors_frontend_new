import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  group,
  animate,
} from '@angular/animations';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { IClassroom, ISyllabus } from 'src/app/core/models';
import { Title } from '@angular/platform-browser';
import { CoursesService } from 'src/app/core/services';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClassroomType, WEEK_DAYS } from '@metutor/config';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { map } from 'rxjs/operators';
import * as fromTutorAction from '../../state/actions';
import * as fromTutor from '../../state';
import { FormGroup } from '@angular/forms';
import { selectIsAddingSyllabusTopic } from '@metutor/core/state';

@Component({
  selector: 'metutors-tutor-syllabus',
  templateUrl: './tutor-syllabus.component.html',
  styleUrls: ['./tutor-syllabus.component.scss'],
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
export class TutorSyllabusComponent implements OnInit {
  subjectId = null;
  selectedCourse = null;
  openCourse: boolean = false;

  isAddingTopic$: Observable<boolean>;
  showAddTopicModal$: Observable<boolean>;
  view$: Observable<{ loading: boolean; syllabus: any }>;

  constructor(private _store: Store<any>) {}

  onShowAddTopicModal(): void {
    this._store.dispatch(fromTutorAction.openTutorAddTopicModal());
  }

  onCloseAddTopicModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorAddTopicModal());
  }

  onAddTopic(form: FormGroup): void {
    this._store.dispatch(fromCore.tutorAddSyllabusTopic({ body: form.value }));
  }

  onSaveSubjectTitle(classId: number): void {
    console.log(classId);
  }

  getDays(weekdays: string) {
    const listDays: any = [];
    const splitDays = weekdays.split(',');
    if (splitDays.length) {
      splitDays.forEach((day: any) => listDays.push(WEEK_DAYS[day]));
    }

    return listDays;
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadTutorSyllabus());
    this.showAddTopicModal$ = this._store.select(fromTutor.selectAddTopicModal);
    this.isAddingTopic$ = this._store.select(
      fromCore.selectIsAddingSyllabusTopic
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorSyllabus),
      this._store.select(fromCore.selectIsLoadingTutorSyllabus),
    ]).pipe(map(([syllabus, loading]) => ({ loading, syllabus })));
  }
}
