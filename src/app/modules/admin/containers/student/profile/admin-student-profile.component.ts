import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import { courseStatusLabel } from '@config';

@Component({
  selector: 'metutors-profile',
  templateUrl: './admin-student-profile.component.html',
  styleUrls: ['./admin-student-profile.component.scss'],
})
export class AdminStudentProfileComponent implements OnInit {
  view$: Observable<{ profile: any; loading: boolean }>;

  imageUrl = environment.imageURL;
  statusLabel = courseStatusLabel;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadAdminStudentProfile());
    this.view$ = combineLatest([
      this._store.select(fromCore.selectAdminStudentProfile),
      this._store.select(fromCore.selectIsLoadingAdminStudentProfile),
    ]).pipe(map(([profile, loading]) => ({ profile, loading })));
  }
}
