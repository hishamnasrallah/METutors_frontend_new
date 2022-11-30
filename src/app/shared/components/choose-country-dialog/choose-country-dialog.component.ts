import { ICountry } from '@metutor/core/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'metutors-choose-country-dialog',
  templateUrl: './choose-country-dialog.component.html',
  styleUrls: ['./choose-country-dialog.component.scss']
})
export class ChooseCountryDialogComponent implements OnInit {
  country: ICountry;
  isLoading: boolean;
  countries: ICountry[];
  tempCountries: ICountry[];

  constructor(
    public dialogRef: MatDialogRef<ChooseCountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.countries = data.countries;
      this.isLoading = data.isLoading;
      this.tempCountries = data.countries;
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChangeCountry(event: any): void {
    this.tempCountries = this.countries.filter(country =>
      country.name?.toLowerCase()?.includes(event.target.value)
    );
  }

  onSelectCountry(country: ICountry): void {
    this.country = country;
    this.dialogRef.close({ country, grade: 12 });
  }
}
