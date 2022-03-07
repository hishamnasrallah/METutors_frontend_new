import { environment } from '@environment';

export class ITicket {
  id!: number;
  category!: number;
  file!: string;
  message!: string;
  priority!: number;
  status!: string;
  subject!: string;
  ticketId!: string;
  createdDate!: string;

  constructor(createDefault = false, ticket: any = null) {
    if (createDefault) {
      this.id = 0;
      this.category = 0;
      this.file = '';
      this.message = '';
      this.priority = 0;
      this.ticketId = '';
      this.subject = '';
      this.status = '';
      this.createdDate = '';
    }

    if (ticket) {
      this.id = ticket.id;
      this.category = ticket.category_id;
      this.message = ticket.message;
      this.file = ticket.file ? environment.imageURL + ticket.file : '';
      this.priority = ticket.priority;
      this.ticketId = ticket.ticket_id;
      this.subject = ticket.subject;
      this.status = ticket.status;
      this.createdDate = ticket.created_at;
    }
  }
}
