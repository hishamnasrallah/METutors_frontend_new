import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ITicket } from '@metutor/core/models';
import { TicketStatus } from '@metutor/config';
import * as fromCore from '@metutor/core/state';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-tutor-support-ticket',
  templateUrl: './tutor-support-ticket.component.html',
  styleUrls: ['./tutor-support-ticket.component.scss'],
})
export class TutorSupportTicketComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tickets$: Observable<ITicket[] | null>;

  ticketStatus = TicketStatus;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTickets();
  }

  private _prepareTickets(): void {
    this._store.dispatch(fromCore.loadTickets());
    this.tickets$ = this._store.select(fromCore.selectTickets);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTickets);
  }
}
