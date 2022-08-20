import { FormArray, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ILanguage } from '@models';
import { LANGUAGES_LEVELS_CONST } from '@config';

@Component({
  selector: 'metutors-spoken-languages',
  templateUrl: './spoken-languages.component.html',
  styleUrls: ['./spoken-languages.component.scss'],
})
export class SpokenLanguagesComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() languagesList: ILanguage[] | null;

  @Output() removeLanguage: EventEmitter<number> = new EventEmitter<number>();

  levels = LANGUAGES_LEVELS_CONST;

  constructor() {}

  returnZero(): number {
    return 0;
  }

  get languages(): FormArray {
    return this.form?.get('languages') as FormArray;
  }

  get filteredLanguages(): ILanguage[] {
    const selectedLanguage = this.languages.value.map((item: any) =>
      item?.level && item?.language ? item?.language?.id : undefined
    );

    return this.languagesList && this.languagesList.length
      ? this.languagesList.filter((el) => !selectedLanguage.includes(el?.id))
      : [];
  }

  ngOnInit(): void {}
}
