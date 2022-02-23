import { getLookups, TICKET_STATUSES_CONST } from 'src/app/config';
import { ITicketReply } from '.';

export class ITicket {
  id!: number;
  category!: string;
  type!: number;
  typeValue!: string;
  title!: string;
  ticketNumber!: string;
  description!: string;
  status!: string;
  statusValue!: string;
  assignedEmployee!: any;
  attachedFile!: string;
  createdByUser!: number;
  createdByUserType!: any;
  createdDate!: string;
  replies!: ITicketReply[];

  constructor(createDefault = false, ticket: any = null) {
    if (createDefault) {
      this.id = 0;
      this.category = '';
      this.type = 0;
      this.typeValue = '';
      this.title = '';
      this.ticketNumber = '';
      this.description = '';
      this.status = '';
      this.statusValue = '';
      this.assignedEmployee = null;
      this.attachedFile = '';
      this.createdByUser = 0;
      this.createdByUserType = null;
      this.createdDate = '';
      this.replies = [];
    }

    if (ticket) {
      this.id = ticket.id;
      this.category = ticket.category;
      this.type = ticket.type;
      this.typeValue = ticketListType(ticket.type);
      this.title = ticket.title;
      this.ticketNumber = ticket.ticket_number;
      this.description = ticket.description;
      this.status = ticket.status;
      this.statusValue = TICKET_STATUSES_CONST[ticket.status];
      this.assignedEmployee = ticket.assigned_employee;
      this.attachedFile = ticket.attached_file;
      this.createdByUser = ticket.created_by_user;
      this.createdByUserType = ticket.created_by_user_type;
      this.createdDate = ticket.created_date;
      this.replies =
        ticket.replies && ticket.replies.length
          ? ticket.replies.map((item: any) => new ITicketReply(false, item))
          : [];
    }
  }
}

export function ticketListType(value: number): string {
  const ticketsList = getLookups().ticketTypes;
  let tValue = '';

  if (Array.isArray(ticketsList) && ticketsList && ticketsList.length) {
    ticketsList.forEach((ticket) => {
      if (ticket?.id === value) {
        tValue = ticket?.name;
      }
    });
  }

  return tValue;
}
