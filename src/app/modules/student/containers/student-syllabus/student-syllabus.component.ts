import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromStudentAction from '../../state/actions';
import * as fromStudent from '@metutor/modules/student/state';
import {
  state,
  style,
  group,
  animate,
  trigger,
  transition,
} from '@angular/animations';
import {
  WEEK_DAYS,
  courseStatusLabel,
  CLASSROOM_TOPICS_SCALE_NUM,
} from 'src/app/config';

@Component({
  selector: 'metutors-student-syllabus',
  templateUrl: './student-syllabus.component.html',
  styleUrls: ['./student-syllabus.component.scss'],
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
export class StudentSyllabusComponent implements OnInit {
  topic: any;
  selectedCourse = null;
  openCourse: boolean = false;
  statusLabel = courseStatusLabel;
  addingTopic$: Observable<boolean>;
  showHighlightedModal$: Observable<boolean>;

  view$: Observable<{ loading: boolean; syllabus: any }>;

  constructor(private _store: Store<any>) {}

  getDays(weekdays: string) {
    const listDays: any = [];
    const splitDays = weekdays.split(',');
    if (splitDays.length) {
      splitDays.forEach((day: any) => listDays.push(WEEK_DAYS[day]));
    }

    return listDays;
  }

  OnOpenHighlightedTopicModal(topic = null): void {
    this.topic = topic;
    this._store.dispatch(fromStudentAction.openHighlightedTopicModal());
  }

  onCloseHighlightedTopicModal(): void {
    this._store.dispatch(fromStudentAction.closeHighlightedTopicModal());
  }

  onSaveTopic(topic: FormGroup, course_id: number): void {
    const payload = {
      course_id,
      ...topic.value,
      confidence_scale:
        CLASSROOM_TOPICS_SCALE_NUM[topic.value.confidence_scale],
    };

    this._store.dispatch(fromCore.studentSyllabusAddEditTopic({ payload }));
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentSyllabus());

    this.addingTopic$ = this._store.select(fromCore.selectStudentLoading);

    this.showHighlightedModal$ = this._store.select(
      fromStudent.selectHighlightedModal
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentSyllabus),
      this._store.select(fromCore.selectIsLoadingStudentSyllabus),
    ]).pipe(map(([syllabus, loading]) => ({ loading, syllabus })));
  }
}
