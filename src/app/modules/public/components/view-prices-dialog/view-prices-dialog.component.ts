import { IField, ISubject } from '@metutor/core/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'metutors-view-prices-dialog',
  templateUrl: './view-prices-dialog.component.html',
  styleUrls: ['./view-prices-dialog.component.scss']
})
export class ViewPricesDialogComponent implements OnInit {
  fieldId!: string;
  fields: IField[];
  subjects: ISubject[];

  constructor(
    public dialogRef: MatDialogRef<ViewPricesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.fields = data.fields;
      this.subjects =
        data.subjects && data.subjects.length
          ? data.subjects.filter(
              (item: ISubject) => item.programId === data.programId
            )
          : [];
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
