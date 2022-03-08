import { environment } from '@environment';
import { ICategory } from '.';
import { ITicketComment } from './ticket-comment.model';

export class ITicket {
  id!: number;
  category?: ICategory;
  file!: string;
  message!: string;
  priority!: number;
  status!: string;
  subject!: string;
  ticketId!: string;
  comments!: ITicketComment[];
  createdDate!: string;

  constructor(createDefault = false, ticket: any = null) {
    if (createDefault) {
      this.id = 0;
      this.category = undefined;
      this.file = '';
      this.message = '';
      this.priority = 0;
      this.ticketId = '';
      this.subject = '';
      this.status = '';
      this.comments = [];
      this.createdDate = '';
    }

    if (ticket) {
      this.id = ticket.id;
      this.category = ticket.category;
      this.message = ticket.message;
      this.file = ticket.file ? environment.imageURL + ticket.file : '';
      this.priority = ticket.priority;
      this.ticketId = ticket.ticket_id;
      this.subject = ticket.subject;
      this.status = ticket.status;
      this.comments =
        ticket.comments && ticket.comments.length
          ? ticket.comments.map(
              (comment: ITicketComment) => new ITicketComment(false, comment)
            )
          : [];
      this.createdDate = ticket.created_at;
    }
  }
}
