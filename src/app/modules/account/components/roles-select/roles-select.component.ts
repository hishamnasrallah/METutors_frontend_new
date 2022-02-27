import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRole } from 'src/app/core/models';

@Component({
  selector: 'metutors-roles-select',
  templateUrl: './roles-select.component.html',
  styleUrls: ['./roles-select.component.scss'],
})
export class RolesSelectComponent implements OnInit {
  roles!: IRole[];

  constructor(
    public dialogRef: MatDialogRef<RolesSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roles = data;
  }

  ngOnInit(): void {}

  onSubmit(role: any) {
    this.dialogRef.close({ data: role });
  }

  ngOnDestroy(): void {}
}
