import { ITicket } from '@metutor/core/models';
import { TicketStatus, TicketPriority } from '@metutor/config';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-support-ticket-card',
  templateUrl: './support-ticket-card.component.html',
  styleUrls: ['./support-ticket-card.component.scss'],
})
export class SupportTicketCardComponent implements OnInit {
  @Input() linkUrl: string;
  @Input() ticket: ITicket;
  @Input() ticketId: string;
  @Input() isAdmin: boolean = false;

  @Output() changeStatus: EventEmitter<any> = new EventEmitter<any>();

  ticketStatus = TicketStatus;
  ticketPriority = TicketPriority;

  constructor() {}

  ngOnInit(): void {}
}
