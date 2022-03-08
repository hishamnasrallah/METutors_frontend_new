import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'metutors-tutor-settings',
  templateUrl: './tutor-settings.component.html',
  styleUrls: ['./tutor-settings.component.scss'],
})
export class TutorSettingsComponent implements OnInit {
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
