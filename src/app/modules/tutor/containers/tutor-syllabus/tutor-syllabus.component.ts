import {
  state,
  style,
  group,
  trigger,
  animate,
  transition,
} from '@angular/animations';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import * as fromTutor from '../../state';
import { WEEK_DAYS } from '@metutor/config';
import * as fromCore from '@metutor/core/state';
import * as fromTutorAction from '../../state/actions';

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
  topic = null;
  subjectId = null;
  selectedCourse = null;
  unclassifiedClasses = null;
  openCourse: boolean = false;

  form: FormGroup;
  isAddingTopic$: Observable<boolean>;
  showAddTopicModal$: Observable<boolean>;
  isSavingSubjectTitle$: Observable<boolean>;
  selectIsDeletingTopic$: Observable<boolean>;
  view$: Observable<{ loading: boolean; syllabus: any }>;

  constructor(private _store: Store<any>, private _formBuilder: FormBuilder) {}

  get subjectTitle(): AbstractControl | null {
    return this.form.get('subjectTitle');
  }

  setSubjectTitle(val: string): void {
    this.subjectTitle?.setValue(val);
  }

  onShowAddTopicModal(): void {
    this.topic = null;
    this.unclassifiedClasses = null;
    this._store.dispatch(fromTutorAction.openTutorAddTopicModal());
  }

  onCloseAddTopicModal(): void {
    this._store.dispatch(fromTutorAction.closeTutorAddTopicModal());
  }

  onAddEditTopic(form: FormGroup): void {
    const body = form.value;

    if (body.topic_id) {
      this._store.dispatch(fromCore.tutorEditSyllabusTopic({ body }));
    } else {
      this._store.dispatch(fromCore.tutorAddSyllabusTopic({ body }));
    }
  }

  onEditTopic(topic: any, unclassifiedClasses: number): void {
    this.topic = topic;
    this.unclassifiedClasses = topic?.classes?.length + unclassifiedClasses;
    this._store.dispatch(fromTutorAction.openTutorAddTopicModal());
  }

  onDeleteTopic(id: number): void {
    this._store.dispatch(fromCore.tutorDeleteSyllabusTopic({ id }));
  }

  onSaveSubjectTitle(classId: number): void {
    this._store.dispatch(
      fromCore.tutorEditSyllabusSubjectTitle({
        classId,
        title: this.subjectTitle?.value,
      })
    );
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
    this.form = this._formBuilder.group({
      subjectTitle: [null, Validators.required],
    });

    this._store.dispatch(fromCore.loadTutorSyllabus());

    this.showAddTopicModal$ = this._store.select(fromTutor.selectAddTopicModal);

    this.selectIsDeletingTopic$ = this._store.select(
      fromCore.selectIsDeletingTopic
    );

    this.isSavingSubjectTitle$ = this._store.select(
      fromCore.selectIsSavingSubjectTitle
    );
    this.isAddingTopic$ = this._store.select(
      fromCore.selectIsAddingSyllabusTopic
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorSyllabus),
      this._store.select(fromCore.selectIsLoadingTutorSyllabus),
      this._store.select(fromCore.selectSubjectTitleEditedSuccess).pipe(
        tap((edited) => {
          if (edited) {
            this.subjectId = null;
          }
        })
      ),
    ]).pipe(map(([syllabus, loading]) => ({ loading, syllabus })));
  }
}
