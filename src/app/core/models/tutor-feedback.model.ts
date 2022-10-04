import { ITutor } from './tutor.model';
import { IStudent } from './student.model';

export class ITutorFeedback {
  id: number;
  review: string;
  rating: number;
  student?: IStudent;
  tutor?: ITutor;
  courseId: number;
  studentId: number;
  updatedAt: string;

  constructor(createDefault = false, feedback: any = null) {
    if (createDefault) {
      this.id = 0;
      this.review = '';
      this.rating = 0;
      this.student = undefined;
      this.tutor = undefined;
      this.courseId = 0;
      this.studentId = 0;
      this.updatedAt = '';
    }

    if (feedback) {
      this.id = feedback.id;
      this.review = feedback.review;
      this.rating = feedback.rating;
      this.courseId = +feedback?.course_id || 0;
      this.student = new IStudent(false, feedback.sender);
      this.tutor = new ITutor(false, feedback.reciever);
      this.studentId = +feedback.sender_id || 0;
      this.updatedAt = feedback.updated_at;
    }
  }
}
