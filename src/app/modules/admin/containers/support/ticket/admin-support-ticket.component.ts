import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';

import { TicketStatus } from '@config';
import * as fromCore from '@metutor/core/state';
import * as fromAdmin from '@metutor/modules/admin/state';
import { ITicket, ITicketCategory, ITicketPriority } from '@models';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-ticket',
  templateUrl: './admin-support-ticket.component.html',
  styleUrls: ['./admin-support-ticket.component.scss'],
})
export class AdminSupportTicketComponent implements OnInit {
  isChangeTicketStatus$: Observable<boolean>;
  showChangeStatusModal$: Observable<boolean>;

  status = '';
  perPage = 10;
  category = '';
  priority = '';
  ticketId: string;
  ticketStatus = TicketStatus;

  view$: Observable<{
    counts: any;
    loading: boolean;
    tickets: ITicket[] | null;
    categories: ITicketCategory[] | null;
    priorities: ITicketPriority[] | null;
  }>;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this.isChangeTicketStatus$ = this._store.select(
      fromCore.selectIsChangeTicketStatus
    );

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
    );

    this._store.dispatch(fromCore.loadTicketPriorities());
    this._store.dispatch(fromCore.loadTicketCategories());

    this._store.dispatch(
      fromCore.loadAdminTickets({
        params: { page: 1, priority: '', category: '', status: '', search: '' },
      })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTickets),
      this._store.select(fromCore.selectTicketCounts),
      this._store.select(fromCore.selectIsLoadingTickets),
      this._store.select(fromCore.selectTicketPriorities),
      this._store.select(fromCore.selectTicketCategories),
    ]).pipe(
      map(([tickets, counts, loading, priorities, categories]) => ({
        counts,
        loading,
        tickets,
        priorities,
        categories,
      }))
    );
  }

  onOpenChangeStatusModal(ticketId: string) {
    this.ticketId = ticketId;

    this._store.dispatch(fromAdminAction.openAdminChangeStatusModal());
  }

  onCloseChangeStatusModal() {
    this._store.dispatch(fromAdminAction.closeAdminChangeStatusModal());
  }

  onChangeTicketStatus({ status }: any): void {
    this._store.dispatch(
      fromCore.changeTicketStatus({ ticketId: this.ticketId, status })
    );
  }

  onChangeTab(event: any): void {
    switch (event.index) {
      case 0:
        this.status = '';
        break;
      case 1:
        this.status = TicketStatus.open;
        break;
      case 2:
        this.status = TicketStatus.closed;
        break;
      case 3:
        this.status = TicketStatus.urgent;
        break;
    }

    this._store.dispatch(
      fromCore.loadAdminTickets({
        params: {
          page: 1,
          search: '',
          priority: '',
          category: '',
          status: this.status,
        },
      })
    );
  }

  onPageChange({ page }: any): void {
    this._store.dispatch(
      fromCore.loadAdminTickets({
        params: {
          page,
          status: '',
          search: '',
          priority: '',
          category: '',
        },
      })
    );
  }

  onFilter(filters: any): void {
    this._store.dispatch(
      fromCore.loadAdminTickets({
        params: {
          page: 1,
          status: this.status,
          ...filters,
        },
      })
    );
  }
}
