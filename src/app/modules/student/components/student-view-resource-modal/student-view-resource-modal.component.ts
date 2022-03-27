import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromCore from '@metutor/core/state';

@Component({
  selector: 'metutors-student-view-resource-modal',
  templateUrl: './student-view-resource-modal.component.html',
  styleUrls: ['./student-view-resource-modal.component.scss'],
})
export class StudentViewResourceModalComponent implements OnInit {
  @Input() showModal = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  filesPreview: any[] = [];
  selectedURLs: any[] = [];

  view$: Observable<{ loading: boolean; data: any }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentResource),
      this._store.select(fromCore.selectIsLoadingStudentResource),
    ]).pipe(map(([data, loading]) => ({ data, loading })));
  }
}
