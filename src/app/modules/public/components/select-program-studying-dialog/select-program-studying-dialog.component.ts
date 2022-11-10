import { IProgram } from '@metutor/core/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'metutors-select-program-studying-dialog',
  templateUrl: './select-program-studying-dialog.component.html',
  styleUrls: ['./select-program-studying-dialog.component.scss']
})
export class SelectProgramStudyingDialogComponent implements OnInit {
  programs: IProgram[];

  constructor(
    public dialogRef: MatDialogRef<SelectProgramStudyingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.programs = data.programs;
    }
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectProgram(program: IProgram): void {
    this.dialogRef.close({ program, grade: 12 });
  }
}
