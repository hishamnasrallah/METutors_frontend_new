export class IClass {
  id?: number;
  subject?: string;
  number?: number;
  days?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;

  constructor(createDefault = false, classroom: any = null) {
    if (createDefault) {
      this.id = 0;
      this.number = 0;
      this.subject = '';
      this.days = '';
      this.date = '';
      this.startTime = '';
      this.endTime = '';
      this.duration = 0;
    }

    if (classroom) {
      this.id = classroom.id;
      this.days = classroom.days;
      this.number = classroom.number;
      this.subject = classroom.subject;
      this.date = classroom.date;
      this.startTime = classroom.start_time;
      this.endTime = classroom.end_time;
      this.duration = classroom.duration || 0;
    }
  }
}
