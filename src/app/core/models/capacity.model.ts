import { ISubject } from './subject.model';

export class ICapacity {
  id!: number;
  subject: ISubject;
  totalBookings: number;
  totalRevenue: number;
  hiredTutors: number;
  capacity: number;

  constructor(createDefault = false, capacity: any = null) {
    if (createDefault) {
      this.id = 0;
      this.subject = new ISubject(false);
      this.totalBookings = 0;
      this.totalRevenue = 0;
      this.hiredTutors = 0;
      this.capacity = 0;
    }

    if (capacity) {
      this.id = capacity.id;
      this.subject = new ISubject(false, capacity?.subject);
      this.totalBookings = capacity?.total_bookings;
      this.totalRevenue = capacity?.total_revenue;
      this.hiredTutors = capacity?.hired_tutors;
      this.capacity = capacity?.capacity;
    }
  }
}

export interface ICapacityFilters {
  name: string;
}
