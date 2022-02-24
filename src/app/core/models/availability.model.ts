export class IAvailability {
  id!: number;
  day!: string;
  timeFrom!: string;
  timeTo!: string;

  constructor(createDefault = false, availability: any = null) {
    if (createDefault) {
      this.id = 0;
      this.day = '';
      this.timeFrom = '';
      this.timeTo = '';
    }

    if (availability) {
      this.id = availability?.id;
      this.day = availability?.day || '';
      this.timeFrom = availability?.time_from || '';
      this.timeTo = availability?.time_to || '';
    }
  }
}
