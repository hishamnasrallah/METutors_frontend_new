import { environment } from '@environment';
import { ITicketCategory, ITicketPriority } from './lookups.model';
import { ITicketComment } from './ticket-comment.model';
import { IUser } from './user.model';

export class ITicket {
  id!: number;
  category?: ITicketCategory;
  file!: string;
  message!: string;
  priority?: ITicketPriority;
  status!: string;
  subject!: string;
  ticketId!: string;
  comments!: ITicketComment[];
  user?: IUser;
  duration?: number;
  lastReply?: string;
  createdDate!: string;
  updatedDate!: string;

  constructor(createDefault = false, ticket: any = null) {
    if (createDefault) {
      this.id = 0;
      this.category = undefined;
      this.file = '';
      this.message = '';
      this.priority = undefined;
      this.ticketId = '';
      this.subject = '';
      this.status = '';
      this.comments = [];
      this.user = undefined;
      this.duration = 0;
      this.createdDate = '';
      this.updatedDate = '';
      this.lastReply = '';
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
      this.user = new IUser(false, ticket.user);
      this.comments =
        ticket.comments && ticket.comments.length
          ? ticket.comments.map(
              (comment: ITicketComment) => new ITicketComment(false, comment)
            )
          : [];
      this.duration = Math.ceil(
        Math.abs(
          new Date(ticket.updated_at).valueOf() -
            new Date(ticket.created_at).valueOf()
        ) /
          (1000 * 60 * 60 * 24)
      );
      this.createdDate = ticket.created_at;
      this.updatedDate = ticket.updated_at;
      this.lastReply = ticket?.last_reply;
    }
  }
}

export interface ITicketFilters {
  status?: string;
  title?: string;
  priority?: string;
  category?: string;
}
