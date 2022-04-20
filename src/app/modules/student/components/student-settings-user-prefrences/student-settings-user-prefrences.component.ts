import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILanguage } from '@models';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';
import { GENDERS } from '@config';

@Component({
  selector: 'metutors-student-settings-user-prefrences',
  templateUrl: './student-settings-user-prefrences.component.html',
  styleUrls: ['./student-settings-user-prefrences.component.scss'],
})
export class StudentSettingsUserPrefrencesComponent implements OnInit {
  genders = GENDERS;
  showLanguages = false;
  languages$: Observable<ILanguage[] | null>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadLanguages());
    this.languages$ = this._store.select(fromCore.selectLanguages);
  }

  onChange(event: any): void {
    this.showLanguages = event.value === '-1';
  }
}
