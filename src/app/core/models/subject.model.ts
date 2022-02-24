export class ISubject {
  id?: number;
  field?: string;
  subject?: string;

  constructor(createDefault = false, subject: any = null) {
    if (createDefault) {
      this.id = 0;
      this.field = '';
      this.subject = '';
    }

    if (subject) {
      this.id = subject?.id;
      this.field = subject?.field?.name || '';
      this.subject = subject?.subject?.name || '';
    }
  }
}
