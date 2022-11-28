import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-student-certificates',
  templateUrl: './student-certificates.component.html',
  styleUrls: ['./student-certificates.component.scss'],
})
export class StudentCertificatesComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  view$: Observable<{ loading: boolean; certificates: any }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentCertificates());

    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentLoading),
      this._store.select(fromCore.selectStudentCertificates),
    ]).pipe(map(([loading, certificates]) => ({ loading, certificates })));
  }
}
