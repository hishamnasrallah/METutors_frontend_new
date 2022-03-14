import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TicketStatus } from 'src/app/config';
import { ITicket } from 'src/app/core/models';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxAutoScroll } from 'ngx-auto-scroll';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'metutors-admin-ticket-details',
  templateUrl: './admin-ticket-details.component.html',
  styleUrls: ['./admin-ticket-details.component.scss'],
  animations: [
    trigger('dropMenuAnimate', [
      transition('void => *', [
        style({ transform: 'translateY(20PX)' }),
        animate(700, style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AdminTicketDetailsComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll?: NgxAutoScroll;

  isLoading$: Observable<boolean>;
  user$: Observable<IUser | null>;
  ticket$: Observable<ITicket | null>;
  isSubmitTicketComment$: Observable<boolean>;

  messageForm: FormGroup;
  ticketStatus = TicketStatus;

  constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _store: Store<any>,
    private _route: ActivatedRoute
  ) {
    this.messageForm = this._fb.group({
      comment: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
    this.isSubmitTicketComment$ = this._store
      .select(fromCore.selectIsSubmitTicketComment)
      .pipe(
        tap((isSubmit) => {
          if (isSubmit) {
            this.messageForm.reset();
          }
        })
      );

    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = res.get('id') || '';

      this._prepareTicket(id);
    });
  }

  onSubmit({ valid, value }: any): void {
    if (valid) {
      const comment = value.comment;

      this._store.dispatch(fromCore.submitTicketComment({ comment }));
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
