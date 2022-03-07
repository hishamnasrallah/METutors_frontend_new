import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TicketUserType } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import { ITicket } from 'src/app/core/models';
import { SupportService } from 'src/app/core/services';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxAutoScroll } from 'ngx-auto-scroll';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'metutors-student-ticket-details',
  templateUrl: './student-ticket-details.component.html',
  styleUrls: ['./student-ticket-details.component.scss'],
  animations: [
    trigger('dropMenuAnimate', [
      transition('void => *', [
        style({ transform: 'translateY(20PX)' }),
        animate(700, style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class StudentTicketDetailsComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll?: NgxAutoScroll;

  isLoading$: Observable<boolean>;
  user$: Observable<IUser | null>;
  ticket$: Observable<ITicket | null>;

  loading = false;
  messageForm: FormGroup;
  ticketUserType = TicketUserType;

  constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _route: ActivatedRoute,
    private _supportService: SupportService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.messageForm = this._fb.group({
      reply: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);

    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = res.get('id') || '';

      this._prepareTicket(id);
    });
  }

  onSubmit({ valid, value }: any): void {
    if (valid) {
      this.loading = true;
      const message = {
        ...value,
        // ticket: this.ticket?.id,
      };
      this._supportService.submitMessage(message).subscribe(
        (response) => {
          this.loading = false;
          this.messageForm.reset();
          // this.ticket?.replies.push(new ITicketReply(false, response));
        },
        (error) => {
          this.loading = false;
          this._alertNotificationService.error(
            error.error.detail || 'Error in sending message'
          );
        }
      );
    }
  }

  private _prepareTicket(id: string): void {
    this._store.dispatch(fromCore.loadTicket({ id }));
    this.ticket$ = this._store.select(fromCore.selectTicket).pipe(
      tap((ticket) => {
        if (ticket) {
          this._title.setTitle(ticket.subject);
          this.ngxAutoScroll?.forceScrollDown();
        }
      })
    );
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTicket);
  }
}
