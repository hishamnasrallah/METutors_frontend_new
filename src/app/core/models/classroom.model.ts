import { ClassroomType, DAYS_WEEK } from 'src/app/config';
import { ICourse } from './course.model';
import { ITutor } from './tutor.model';
import { IUser } from '@metutor/core/models/user.model';

export class IClassroom {
  id!: number;
  course?: ICourse;
  name?: string;
  slug?: string;
  number?: number;
  classes?: number;
  classrooms?: any;
  hours?: number;
  type?: number;
  oneOneTuitionPriceInHour?: number;
  groupTuitionPriceInHour?: number;
  price?: number;
  maxStudentsGroup?: number;
  installmentsInd?: boolean;
  totalInstallments?: number;
  firstInstallment?: any;
  startDate?: string;
  endDate?: string;
  days?: string[];
  listDays?: string[];
  startTime?: Date;
  endTime?: Date;
  status?: number;
  tutor?: ITutor;
  progress?: number;
  programName?: string;
  fieldName?: string;
  tutoringLanguage?: string;
  tutoringType?: string;
  completedClasses?: number;
  remainingClasses?: number;
  isComplete?: boolean;
  enrolledStudents?: any;
  isFree?: boolean;

  constructor(createDefault = false, classroom: any = null) {
    if (createDefault) {
      this.id = 0;
      this.course = new ICourse(false);
      this.name = '';
      this.slug = '';
      this.number = 0;
      this.classes = 0;
      this.hours = 0;
      this.type = 0;
      this.oneOneTuitionPriceInHour = 0;
      this.groupTuitionPriceInHour = 0;
      this.price = 0;
      this.maxStudentsGroup = 0;
      this.installmentsInd = false;
      this.totalInstallments = 0;
      this.firstInstallment = 0;
      this.startDate = '';
      this.endDate = '';
      this.days = [];
      this.listDays = [];
      this.startTime = new Date();
      this.endTime = new Date();
      this.status = 0;
      this.tutor = new ITutor(false);
      this.progress = 0;
      this.completedClasses = 0;
      this.remainingClasses = 0;
      this.isComplete = false;
    }

    if (classroom) {
      this.id = classroom.id;
      this.course = new ICourse(false, classroom.course);
      this.name = classroom.name || '';
      this.slug = classroom.slug || '';
      this.number = classroom.number || 0;
      this.classes = classroom.total_classes || 0;
      this.hours = classroom.total_hours || 0;
      this.type = classroom.batch_type || 0; // 1:1 , Group
      this.oneOneTuitionPriceInHour =
        classroom.one_2_one_tuition_price_in_hour || 0;
      this.groupTuitionPriceInHour = classroom.group_tuition_price_in_hour || 0;
      this.price = calculatePrice(
        classroom.batch_type,
        classroom.one_2_one_tuition_price_in_hour,
        classroom.group_tuition_price_in_hour
      );
      this.maxStudentsGroup = classroom.max_students_in_group || 0;
      this.installmentsInd = classroom.installments_ind || false;
      this.totalInstallments = classroom.total_installments || 0;
      this.firstInstallment = classroom.first_installment;
      this.startDate = classroom.batch_start_date || '';
      this.endDate = classroom.batch_expected_end_date || '';
      this.days = classroom.batch_days || [];
      this.listDays = calculateListDays(classroom.batch_days);
      this.startTime = classroom.batch_start_time || '';
      this.endTime = classroom.batch_end_time || '';
      this.status = classroom.batch_status || false;
      this.tutor = new ITutor(false, classroom.tutor);
      this.progress = classroom.progress || 0;
      this.completedClasses = classroom.completed_classes || 0;
      this.remainingClasses = classroom.remaining_classes || 0;
      this.isComplete = classroom?.is_complete || false;
    }
  }
}

export function calculatePrice(
  type: number,
  oneOneTuitionPriceInHour: number,
  groupTuitionPriceInHour: number
) {
  if (type === ClassroomType.one) return oneOneTuitionPriceInHour || 0;
  else return groupTuitionPriceInHour || 0;
}

export function calculateListDays(days: any) {
  let list: any = [];
  days.forEach((day: any) => {
    list.push(DAYS_WEEK[day]);
  });

  return list;
}

export interface IInvoiceDetails {
  user: IUser;
  coupon: string;
  discount: number;
  totalHours: number;
  noOfClasses: number;
  totalAmount: number;
  pricePerHour: number;
  totalDueAmount: number;
  discountedAmount: number;
  discountPercentage: number;
}
