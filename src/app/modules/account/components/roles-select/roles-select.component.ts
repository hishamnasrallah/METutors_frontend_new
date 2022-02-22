import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/services';

@Component({
  selector: 'metutors-roles-select',
  templateUrl: './roles-select.component.html',
  styleUrls: ['./roles-select.component.scss'],
})
export class RolesSelectComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  roles: any;

  constructor(
    public dialogRef: MatDialogRef<RolesSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      userRole: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getRoles().subscribe((response) => {
      if (response) {
        this.roles = response.roles;
        this.loading = false;
      }
    });
  }

  get userRole(): AbstractControl | null {
    return this.form.get('userRole');
  }

  onSubmit(role: any) {
    const value = role;
    this.dialogRef.close({ data: value });
  }

  ngOnDestroy(): void {}
}
