import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addLookups, formatBytes, getLookups } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import { LookupsService, SupportService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-create-ticket',
  templateUrl: './student-create-ticket.component.html',
  styleUrls: ['./student-create-ticket.component.scss'],
})
export class StudentCreateTicketComponent implements OnInit, OnDestroy {
  loading = false;
  filePreview: any;
  supportForm: FormGroup;
  ticketsList: any[] = [];
  getTicketTypesSub?: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _lookupsService: LookupsService,
    private _alertNotificationService: AlertNotificationService,
    private _supportService: SupportService,
    private _router: Router
  ) {
    this.supportForm = this._fb.group({
      type: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      file: [null],
    });
  }

  ngOnInit(): void {
    this.getTicketTypesSub = this._lookupsService.fetchTicketTypes().subscribe(
      (fetchedValues) => {
        this.ticketsList = fetchedValues.results;
        addLookups('ticketTypes', this.ticketsList);
      },
      () => {}
    );
    this.ticketsList = getLookups().ticketTypes;
  }

  onFileUpload(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];

      if (file.size > 10 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 10MB');

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
      this.loading = true;
      this._supportService.createTicket(supportForm.value).subscribe(
        (response) => {
          this.loading = false;
          this._alertNotificationService.success(
            'Your ticket has been sent successfully'
          );
          this.supportForm.reset();
          this.filePreview = null;
          this._router.navigate(['/student/help/support-ticket']);
        },
        (error) => {
          this.loading = false;
          this._alertNotificationService.error(
            error.error.message || 'Error in sending your ticket'
          );
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.getTicketTypesSub?.unsubscribe();
  }
}
