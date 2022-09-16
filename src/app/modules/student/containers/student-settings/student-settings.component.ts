import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import { ICountry, IUser } from '@metutor/core/models';
import * as fromRoot from '@metutor/state';

@Component({
  selector: 'metutors-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.scss'],
})
export class StudentSettingsComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  countries$: Observable<ICountry[] | null>;
  isChangingPassword$: Observable<boolean>;
  changePasswordSuccess$: Observable<boolean>;

  tab = 'ACCOUNT_SETTINGS';

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
    this.isChangingPassword$ = this._store.select(
      fromCore.selectIsChangingPassword
    );

    this.changePasswordSuccess$ = this._store.select(
      fromCore.selectChangePasswordSuccess
    );

    this.countries$ = this._store.select(fromCore.selectCountries);
  }

  onChangePassword(value: any): void {
    this._store.dispatch(fromCore.changePassword({ value }));
  }
}
