import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketStatus } from 'src/app/config';
import { ITicket } from 'src/app/core/models';
import { SupportService } from 'src/app/core/services';

@Component({
  selector: 'metutors-student-support-ticket',
  templateUrl: './student-support-ticket.component.html',
  styleUrls: ['./student-support-ticket.component.scss'],
})
export class StudentSupportTicketComponent implements OnInit {
  listTickets: ITicket[] = [];
  ticketStatus = TicketStatus;
  getListTicketsSub?: Subscription;

  constructor(private _supportService: SupportService) {}

  ngOnInit(): void {
    this.getListTicketsSub = this._supportService.fetchListTickets().subscribe(
      (response) => {
        this.listTickets = response;
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.getListTicketsSub?.unsubscribe();
  }
}
