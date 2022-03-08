import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'metutors-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.scss'],
})
export class StudentSettingsComponent implements OnInit {
  isChangingPassword$: Observable<boolean>;
  changePasswordSuccess$: Observable<boolean>;

  tab = 'ACCOUNT_SETTINGS';

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.isChangingPassword$ = this._store.select(
      fromCore.selectIsChangingPassword
    );

    this.changePasswordSuccess$ = this._store.select(
      fromCore.selectChangePasswordSuccess
    );
  }

  onChangePassword(value: any): void {
    this._store.dispatch(fromCore.changePassword({ value }));
  }
}
