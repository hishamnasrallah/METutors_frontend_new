import { Component, OnInit } from '@angular/core';

import {
  state,
  style,
  group,
  animate,
  trigger,
  transition
} from '@angular/animations';

@Component({
  selector: 'metutors-community-terms',
  templateUrl: './community-terms.component.html',
  styleUrls: ['./community-terms.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),

        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ opacity: '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),

        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ opacity: '1' }))
        ])
      ])
    ])
  ]
})
export class CommunityTermsComponent implements OnInit {
  questions = [
    {
      id: 1,
      title: 'What do we expect from our students?',
      answer: `
        <strong>Behavior and participation during sessions</strong>
        <br/><br/>
        The Student is expected to behave in a calm and orderly manner throughout the duration of tutoring session and in any other contact with the Tutor. 
        <br/><br/>
        The Tutors at MEtutors will provide the Student with the best possible educational experience. In turn, the Student has the responsibility to take learning very seriously. The Student agrees to make every effort to do the following:
        <br/><br/>
        <ul type="a">
          <li>attend every class and on time</li>
          <li>cooperate with classmates (for group tutoring)</li>
          <li>do homework independently and thoughtfully</li>
          <li>actively engage in class activities</li>
          <li>follow the Tutor's directions and instructions</li>
        </ul>
        <br/>
        Students are expected not to interfere or influence Tutor’s student rating submission in any way, doing so would be in violation of this contract and may lead to immediate account suspension.
        <br/><br/>
        <u>Attendance</u>
        The Student is expected to make all reasonable efforts to attend all scheduled classes in a timely manner. 
        <br/><br/>
        <ol>
          <li>Students are expected to attend all scheduled classes in a timely manner. Students are allowed to cancel courses at any time and receive a refund for remaining classes after deducting 5% for administration fee. </li>
          <li>Students shall receive make-up class for classes missed by Tutors. Also, Students are given the choice to cancel these courses and receive a full refund if desired.</li>
          <li>Attendance is determined by the Site at the beginning of each class. Students are encouraged to maintain a perfect attendance record.</li>
        </ol>
        <br/>
        <u>Lesson policy</u>
        <br/><br/>
        <ol>
          <li>Through the Platform you will be able to connect with Tutors from around the world with differing cultures, beliefs and different first languages.  </li>
          <li>We ask you to always respect personal values and traditions.  </li>
          <li>Please avoid asking your Tutors about their sensitive personal life, including their political or religious affirmations. </li>
          <li>Do not answer personal calls or use your mobile phone in class unless it is of utmost importance. </li>
        </ol>
      `
    },
    {
      id: 2,
      title: 'Is there a dress code?',
      answer: `
        School or casual attire is acceptable and allows you to project a professional image while taking advantage of more  relaxed clothing. Casual dress offers an alternative to the formal business attire of dresses, suits, ties, and dress shoes. Examples of appropriate casual dress for men are cotton, wrinkle-free slacks; collared shirts; and sweaters with collared shirts underneath. For women, examples are skirts, shirts, blouses, sweaters, and knit tops. Unacceptable clothing includes low cut tops, sleeveless shirts or anything which could be considered inappropriate for a learning environment. If you have any questions about appropriate dress, he or she should speak to us.
        <br/><br/>
        <u>Feedback and rating</u>
        <br/><br/>
        As described in the <u><strong>Onboarding Guide</strong></u>, before the course is complete, Tutors can rate their Students and leave feedback on their profile. Students must not interfere or influence the Tutor’s rating submission in any way, doing so would be considered a material breach of the <strong><a href="/student-terms" target="_blank">Student terms</a></strong> and may lead to lower Student rating and termination of our agreement with you.
        <br/><br/>
        Attendance
        <br/><br/>
        <ul>
          <li>Students are expected to start their classes on time. </li>
          <li>If for any reason you think you are going to be late you must let your Tutor know as soon as possible. </li>
          <li>If you are late to class, your tutor will only be able to teach you until the originally scheduled time. </li>
          <li>If you fail to attend a class, this counts as an absence and you will lose that class from your course. </li>
          <li>You can purchase extra classes on the course if you wish. </li>
          <li>If your Tutor fails to attend to teach your class, you will be given a make-up class which you will be able to schedule directly on your dashboard with access to your tutors available hours.</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'Can I cancel or reschedule classes?',
      answer: `
        We understand that sometimes things come up last minute that can’t be helped and this may mean you have to reschedule a class.   Please do this as far in advance as possible. 
        <br/><br/>
        <ol>
          <li>We ask that our Students do this by informing their Tutor in advance to prevent disruption in schedules.</li>
          <li>Students and Tutors are able to reschedule classes that are 24 hours in advance using the “reschedule” button on their classroom dashboard.  </li>
          <li>Classes that start within less than 24 hours cannot be rescheduled. </li>
          <li>Each time you are late for, miss or reschedule a class your Student rating score might be impacted. </li>
        </ol>
      `
    },
    {
      id: 4,
      title: 'How can I contact my tutor?',
      answer: `
        All exchanges with your tutor must be made via the MEtutors Platform. 
        <br/><br/>
        <strong>You must under no circumstances communicate or exchange your personal information: email, address, contact number, cloud storage, social media etc. with tutors to communicate off the platform.</strong>
      `
    },
    {
      id: 5,
      title: 'What do we expect from our tutors?',
      answer: `
        <u>Professionalism</u>
        <br/><br/>
        Tutors are expected to behave in a professional manner throughout the duration of tutoring session and in any other contact with the student(s). Professional manner includes (but is not limited to) the use of polite and respectful language with the student(s), calm and clear control of tutoring sessions, timely grading and assessment of student assignments, and prompt responses to all emails and other correspondence from students. 
        <br/><br/>
        The following are non-exhaustive examples of our expectations of Tutors to adhere to high standards of professionalism:
        <br/>
        <ul>
          <li>Be responsive and reply to any requests within given time frames that are highlighted in notification emails. For example, a new course booking from a student must be accepted or rejected within 4 hours. </li>
          <li>Keep the lesson student focused – your lessons are time to optimize and help your students’ progress.</li>
          <li>Provide respectful and accurate feedback for students being positive and constructive to help them with their learning experience. If you believe any feedback between you and your student to be unfair please contact MEtutors teacher success team at <a href="mailto:teachersuccess@metutors.com" target="_blank">teachersuccess@metutors.com</a> to discuss the matter.</li>
          <li>Maintain a professional working relationship with students and try to help them the best you can with any queries. </li>
          <li>Do not answer personal calls during class unless it is an emergency. </li>
        </ul>
        <br/>
        <u>Lesson and teaching policy</u>
        <br/><br/>
        <ul>
          <li>Be culturally sensitive – MEtutors is a global platform and we expect you to respect the values and traditions of your students. Please avoid asking about personal life, political or religious affiliations. </li>
          <li>Do not use rude or offensive language in the classroom.</li>
          <li>Be patient and encouraging to motivate your students to learn.</li>
          <li>If for any reason you come across a situation you are not able to handle alone you can contact the MEtutors teacher success team at <a href="mailto:teachersuccess@metutors.com" target="_blank">teachersuccess@metutors.com</a>. </li>
        </ul>
        <br/>
        <u>Dress code</u>
        <br/><br/>
        School or casual attire is acceptable and allows you to project a professional image while taking advantage of more  relaxed clothing. Casual dress offers an alternative to the formal business attire of dresses, suits, ties, and dress shoes. Examples of appropriate casual dress for men are cotton, wrinkle-free slacks; collared shirts; and sweaters with collared shirts underneath. For women, examples are skirts, shirts, blouses, sweaters, and knit tops. Unacceptable clothing includes low cut tops, sleeveless shirts or anything which could be considered inappropriate for a learning environment. If you have any questions about appropriate dress, he or she should speak to us.
        <br/><br/>
        <u>Conducting a lesson</u>
        <br/><br/>
        As set out in our Onboarding Guide, we expect:
        <br/>
        <ul>
          <li>each one of your lessons to be personalized and adapted to the student by carefully taking into consideration their learning goals, capabilities and subject matter.</li>
          <li>full commitment from our Tutors (a confirmed lesson is a commitment). </li>
          <li>that you deliver on anything you say on specified deadlines. For example, sending students homework to give them enough time to complete it before the next class. </li>
          <li>all of your marking should also be complete before the next class. </li>
          <li>you listen to student’s feedback which will allow you to improve as a Tutor. </li>
        </ul>
        <br/>
        It is your duty as a student’s chosen tutor to ensure their progression in their subject matter. This must be done through resources such as classes, homework and assigning extra resources. Resources used are done so at the teacher’s discretion and what they see most appropriate and necessary to help student’s progress. 
      `
    },
    {
      id: 6,
      title: 'Will I receive feedback on my profile?',
      answer: `
        As described in the <u><strong>Onboarding Guide</strong></u>, before the course is complete Tutors must rate their students and leave feedback on their profile. Tutors are expected not to interfere or influence Student’s tutors rating submission in any way, doing so would be considered a material breach of the <strong><a href="/tutor-terms" target="_blank">Tutor terms</a></strong> and may lead to lower Tutor’s rating and termination of our agreement with you.
      `
    },
    {
      id: 7,
      title: "What happens if I'm late?",
      answer: `
        <ol>
          <li>Tutors are expected to start their class on time. If for any reason you think you are going to be late you must let your student know as soon as possible.</li>
          <li>Tutors should end the lesson on time and can politely let the students know 5 minutes before the end of the class that there is only 5 minutes remaining.  Any time spent teaching over the scheduled lesson time will not be chargeable to or otherwise recoverable by the Tutor.</li>
          <li>If you are unable to attend a class for whatever reason without giving prior notice to your student, the student will have the opportunity to schedule a make-up class as per your schedule availability set on your profile.  </li>
          <li>If a student is late to a class, Tutors should wait for the student until the end of the scheduled lesson time. The Tutor should be available to start the lesson any time during the scheduled lesson time. The Tutor is not required to make up for lost time because of the student’s lateness. The class should finish at the originally scheduled time.</li>
          <li>If a student fails to attend a lesson this will count as an absence and they will lose that class from the course. Students are able to purchase extra classes on the course if they want.</li>
        </ol>
      `
    },
    {
      id: 8,
      title: 'Can I cancel classes if I need to?',
      answer: `
      <ul>
        <li>The Tutor is expected to attend all scheduled classes and appointments in a timely manner. Canceling classes repeatedly, being late or not showing up for any class would be in violation of this contract and may lead to lowering the Tutor’s rating, minimize securing business and termination of contract. </li>
        <li>Tutors are expected to attend every class and in case of missing any class make-up classes will be offered to Students. </li>
        <li>Class rescheduling is permitted in emergency situations providing student’s approval and lead time of more than 48 hours from starting class time.</li>
      </ul>
      <br/>
      Attendance is determined by the Platform at the beginning of each class. Tutors are encouraged to maintain a perfect attendance record. <u>Cancelling and rescheduling classes </u>
      <br/><br/>
      We understand that sometimes things come up last minute that can’t be helped and this may mean you have to reschedule a class. 
      <br/>
      <ol>
        <li>We ask that our Tutors do this by informing their Students in advance to prevent disruption in schedules and complaints from Students.</li>
        <li>Students and Tutors are able to reschedule classes that are 24 hours in advance using the “reschedule” button on their classroom dashboard.  </li>
        <li>Classes that start within less than 24 hours cannot be rescheduled. </li>
        <li>If the student has to reschedule a class, they will be able to do this automatically with access to the teacher’s calendar and availability.</li>
        <li>If you are unable to provide a class that you have already agreed with a student, you must let them know as soon as possible providing an explanation.  You must contact the student using the inbox tool on the teacher dashboard to agree on a new date and time. The class needs to be rescheduled manually by teachers using the “reschedule” tool on the teacher dashboard. </li>
        <li>Each time you decline teaching a new course, miss or reschedule a class your teacher rating score will decrease. Missing or rescheduling too many classes can lead to the suspension of your account with MEtutors. </li>
      </ol>
      `
    },
    {
      id: 9,
      title: 'How can I contact my students?',
      answer: `
        <ol>
          <li>Tutors should initiate contact with a Student as soon as practicable once a course has been accepted.  </li>
          <li>Tutors should determine goals and aims more specifically in order to prepare the first lesson accordingly. </li>
          <li>Tutors must create the main topics for the course according to the syllabus and pay attention to the highlighted topics that the student submits. </li>
          <li>Tutors should contact the student to clarify any doubts.</li>
          <li><strong>All exchanges with students must be made via the Platform using the Inbox tool available to you. </strong></li>
          <li><strong>You must under no circumstances communicate or exchange your personal information: email, address, contact number, cloud storage, social media etc. with students to communicate outside of the Platform. </strong></li>
        </ol>
      `
    }
  ];
  selectedQuestion?: number;
  openQuestion: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  changeOpenSelection(id: number) {
    if (this.selectedQuestion === id) {
      this.openQuestion = false;
      this.selectedQuestion = undefined;
    } else {
      this.openQuestion = true;
      this.selectedQuestion = id;
    }
  }
}
