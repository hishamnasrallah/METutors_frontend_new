export class ISubject {
  id?: number;
  name?: string;
  subject?: string;
  fieldId?: number;
  pricePerHour?: number;

  constructor(createDefault = false, subject: any = null) {
    if (createDefault) {
      this.id = 0;
      this.name = '';
      this.subject = '';
      this.fieldId = 0;
      this.pricePerHour = 0;
    }

    if (subject) {
      this.id = subject?.id;
      this.name = subject?.field?.name || '';
      this.subject = subject?.subject?.name || '';
      this.fieldId = subject?.field_id || 0;
      this.pricePerHour = subject?.price_per_hour || 0;
    }
  }
}
