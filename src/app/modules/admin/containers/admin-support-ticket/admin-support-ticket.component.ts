import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import {
  ITicket,
  ITicketFilters,
  ITicketCategory,
  ITicketPriority,
} from '@metutor/core/models';
import { TicketStatus } from '@metutor/config';
import * as fromAdmin from '@metutor/modules/admin/state';
import * as fromAdminAction from '@metutor/modules/admin/state/actions';

@Component({
  selector: 'metutors-admin-support-ticket',
  templateUrl: './admin-support-ticket.component.html',
  styleUrls: ['./admin-support-ticket.component.scss'],
})
export class AdminSupportTicketComponent implements OnInit {
  ticketsCounts$: Observable<any>;
  isLoading$: Observable<boolean>;
  tickets$: Observable<ITicket[] | null>;
  isChangeTicketStatus$: Observable<boolean>;
  showChangeStatusModal$: Observable<boolean>;
  categories$: Observable<ITicketCategory[] | null>;
  priorities$: Observable<ITicketPriority[] | null>;

  title?: string;
  status?: string;
  ticketId: string;
  category?: string;
  priority?: string;
  ticketStatus = TicketStatus;

  constructor(private _store: Store<any>) {}

  ngOnInit(): void {
    this._prepareTickets();
    this._prepareTicketPriorities();
    this._prepareTicketCategories();
    this.isChangeTicketStatus$ = this._store.select(
      fromCore.selectIsChangeTicketStatus
    );

    this.showChangeStatusModal$ = this._store.select(
      fromAdmin.selectIsChangeStatusModal
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

  filterTickets(filters: ITicketFilters): void {
    this.tickets$ = this._store.select(fromCore.selectFilteredTickets, {
      ...filters,
    });
  }

  onChangeTab(event: any): void {
    if (event.index === 0) {
      this.status = '';
      this.filterTickets({});
    } else if (event.index === 1) {
      this.status = TicketStatus.open;
      this.filterTickets({ status: TicketStatus.open });
    } else if (event.index === 2) {
      this.status = TicketStatus.closed;
      this.filterTickets({ status: TicketStatus.closed });
    } else if (event.index === 3) {
      this.status = TicketStatus.urgent;
      this.filterTickets({ status: TicketStatus.open, priority: '1' });
    }
    this.title = '';
    this.category = '';
    this.priority = '';
  }

  onChangeSelection(): void {
    this.filterTickets({
      priority: this.priority,
      category: this.category,
      title: this.title,
      status: this.status,
    });
  }

  private _prepareTickets(): void {
    this._store.dispatch(fromCore.loadAdminTickets());
    this.tickets$ = this._store.select(fromCore.selectTickets);
    this.ticketsCounts$ = this._store.select(fromCore.selectTicketsCounts);
    this.isLoading$ = this._store.select(fromCore.selectIsLoadingTickets);
  }

  private _prepareTicketPriorities(): void {
    this._store.dispatch(fromCore.loadTicketPriorities());
    this.priorities$ = this._store.select(fromCore.selectTicketPriorities);
  }

  private _prepareTicketCategories(): void {
    this._store.dispatch(fromCore.loadTicketCategories());
    this.categories$ = this._store.select(fromCore.selectTicketCategories);
  }
}
