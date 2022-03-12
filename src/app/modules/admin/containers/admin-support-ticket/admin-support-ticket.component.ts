import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import { ITicket } from '@metutor/core/models';
import { TicketStatus } from '@metutor/config';

@Component({
  selector: 'metutors-admin-support-ticket',
  templateUrl: './admin-support-ticket.component.html',
  styleUrls: ['./admin-support-ticket.component.scss'],
})
export class AdminSupportTicketComponent implements OnInit {
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
