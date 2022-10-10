import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { formatBytes } from 'src/app/config';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertNotificationService } from 'src/app/core/components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITicketCategory, ITicketPriority } from '@metutor/core/models';

@Component({
  selector: 'metutors-student-create-ticket',
  templateUrl: './student-create-ticket.component.html',
  styleUrls: ['./student-create-ticket.component.scss'],
})
export class StudentCreateTicketComponent implements OnInit {
  isCreatingTicket$: Observable<boolean>;
  categories$: Observable<ITicketCategory[] | null>;
  priorities$: Observable<ITicketPriority[] | null>;

  filePreview: any;
  supportForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _translate: TranslateService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.supportForm = this._fb.group({
      category: [null, Validators.required],
      priority: [null, Validators.required],
      title: [null, Validators.required],
      message: [null, Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.isCreatingTicket$ = this._store.select(
      fromCore.selectIsCreatingTicket
    );
    this._store.dispatch(fromCore.loadTickets());
    this._prepareTicketCategories();
    this._prepareTicketPriorities();
  }

  onFileUpload(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];

      if (file.size > 10 * 1024 * 1024) {
        this._translate.get('ALLOWED_SIZE_10MB').subscribe((res: string) => {
          this._alertNotificationService.error(res);
        });

        return;
      }

      this.supportForm.patchValue({ file });
      this.supportForm?.get('file')?.updateValueAndValidity();
      this.filePreview = {
        name: file.name,
        size: formatBytes(file.size),
      };
    }
  }

  onSubmit(supportForm: FormGroup) {
    if (supportForm.valid) {
      const ticket = supportForm.value;

      this._store.dispatch(fromCore.createTicket({ ticket }));
    }
  }

  private _prepareTicketCategories(): void {
    this._store.dispatch(fromCore.loadTicketCategories());
    this.categories$ = this._store.select(fromCore.selectTicketCategories);
  }

  private _prepareTicketPriorities(): void {
    this._store.dispatch(fromCore.loadTicketPriorities());
    this.priorities$ = this._store.select(fromCore.selectTicketPriorities);
  }
}
