import { environment } from '@environment';
import camelcaseKeys from 'camelcase-keys';
import { IUser } from '.';

export class ITicketComment {
  id!: number;
  comment!: string;
  file?: string;
  user?: IUser;
  createdDate!: Date;

  constructor(createDefault = false, reply: any = null) {
    if (createDefault) {
      this.id = 0;
      this.comment = '';
      this.user = undefined;
      this.createdDate = new Date();
    }

    if (reply) {
      this.id = reply.id;
      this.comment = reply.comment;
      this.file = reply.file ? environment.imageURL + reply.file : '';
      this.user = camelcaseKeys(reply.user, {
        deep: true,
      });
      this.createdDate = reply.created_at;
    }
  }
}
