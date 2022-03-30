import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { IStudent, IStudentFilters } from '@metutor/core/models';
import { TutorStatus, TUTOR_STATUSES_CONST } from '@metutor/config';

@Component({
  selector: 'metutors-admin-student-list',
  templateUrl: './admin-student-list.component.html',
  styleUrls: ['./admin-student-list.component.scss'],
})
export class AdminStudentListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  students$: Observable<IStudent[] | null>;

  name: string;
  tutorStatus = TutorStatus;
  tutorStatuses = TUTOR_STATUSES_CONST;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareStudents();
  }

  filterStudents(filters: IStudentFilters): void {
    this.students$ = this._store.select(fromCore.selectFilteredStudents, {
      ...filters,
    });
  }

  onFilterStudents(): void {
    this.filterStudents({
      name: this.name,
    });
  }

  private _prepareStudents(): void {
    this._store.dispatch(fromCore.loadStudents());
    this.students$ = this._store.select(fromCore.selectStudents);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingStudents);
  }
}
