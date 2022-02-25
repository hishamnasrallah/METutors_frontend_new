export class IClass {
  id?: number;
  number?: number;
  day?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  duration?: number;

  constructor(createDefault = false, classroom: any = null) {
    if (createDefault) {
      this.id = 0;
      this.number = 0;
      this.day = '';
      this.date = '';
      this.startTime = '';
      this.endTime = '';
      this.duration = 0;
    }

    if (classroom) {
      this.id = classroom.id;
      this.day = classroom.day;
      this.number = classroom.number;
      this.date = classroom.date;
      this.startTime = classroom.start_time;
      this.endTime = classroom.end_time;
      this.duration = classroom.duration || 0;
    }
  }
}
