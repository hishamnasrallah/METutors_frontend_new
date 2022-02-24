export class ISubject {
  id?: number;
  name?: string;
  subject?: string;

  constructor(createDefault = false, subject: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.subject = '';
    }

    if (subject) {
      this.id = subject?.id;
      this.name = subject?.field?.name || '';
      this.subject = subject?.subject?.name || '';
    }
  }
}
