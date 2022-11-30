import { UserRole } from '@metutor/config';
import { IRole } from 'src/app/core/models';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'metutors-roles-select',
  templateUrl: './roles-select.component.html',
  styleUrls: ['./roles-select.component.scss']
})
export class RolesSelectComponent implements OnInit {
  roles!: IRole[];
  userRole = UserRole;

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
