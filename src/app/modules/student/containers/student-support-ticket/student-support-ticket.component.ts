import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import { ITicket } from '@metutor/core/models';

@Component({
  selector: 'metutors-student-support-ticket',
  templateUrl: './student-support-ticket.component.html',
  styleUrls: ['./student-support-ticket.component.scss'],
})
export class StudentSupportTicketComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tickets$: Observable<ITicket[] | null>;

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
