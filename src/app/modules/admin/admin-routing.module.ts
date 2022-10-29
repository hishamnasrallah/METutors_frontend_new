import { NgModule } from '@angular/core';
import { AdminAuthGuard } from '@metutor/core/guards';
import { RouterModule, Routes } from '@angular/router';

import {
  AdminDashboardComponent,
  AdminTutorListComponent,
  AdminStudentListComponent,
  AdminProgramHomeComponent,
  AdminTestimonialsComponent,
  AdminTutorProfileComponent,
  AdminCurrentTutorsComponent,
  AdminPendingTutorsComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminFinanceOrdersComponent,
  AdminCourseRequestsComponent,
  AdminTutorInterviewComponent,
  AdminStudentProfileComponent,
  AdminClassroomsListComponent,
  AdminFinanceCoursesComponent,
  AdminFinanceCouponsComponent,
  AdminSuspendedTutorsComponent,
  AdminTeacherScheduleComponent,
  TutorApprovalRequestComponent,
  AdminWorkforceCapacityComponent,
  AdminTutorBookingDetailsComponent,
  AdminCancelledClassroomsComponent,
  AdminClassroomsPerCourseComponent,
  AdminFinanceRefundOrdersComponent,
  AdminStudentBookingDetailComponent,
  AdminTutorInterviewDetailsComponent,
  AdminTutorInterviewDocumentsComponent,
  AdminManagementTutorReAssignmentComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    data: {
      layout: {
        title: 'Admin',
        showHeader: false,
        showFooter: false,
      },
    },
    children: [
      {
        path: 'tutor',
        children: [
          {
            path: 'interview',
            children: [
              {
                path: 'details/:id',
                children: [
                  {
                    path: 'documents',
                    component: AdminTutorInterviewDocumentsComponent,
                    data: {
                      layout: {
                        title: 'Tutor interview',
                        navbarTitle: 'Interview requests',
                        showHeader: false,
                        showFooter: false,
                      },
                    },
                  },
                  {
                    path: '',
                    component: AdminTutorInterviewDetailsComponent,
                    data: {
                      layout: {
                        title: 'Tutor interview',
                        navbarTitle: 'Interview requests',
                        showHeader: false,
                        showFooter: false,
                      },
                    },
                  },
                ],
              },
              {
                path: '',
                component: AdminTutorInterviewComponent,
                data: {
                  layout: {
                    title: 'Tutor interview',
                    navbarTitle: 'Teachers',
                    showHeader: false,
                    showFooter: false,
                  },
                },
              },
            ],
          },
          {
            path: 'all',
            component: AdminTutorListComponent,
            data: {
              layout: {
                title: 'All Teachers',
                navbarTitle: 'Teachers',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'current',
            component: AdminCurrentTutorsComponent,
            data: {
              layout: {
                title: 'Current Teachers',
                navbarTitle: 'Teachers',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'pending',
            component: AdminPendingTutorsComponent,
            data: {
              layout: {
                title: 'Pending Teachers',
                navbarTitle: 'Teachers',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'suspended',
            component: AdminSuspendedTutorsComponent,
            data: {
              layout: {
                title: 'Suspended Teachers',
                navbarTitle: 'Teachers',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'capacity',
            component: AdminWorkforceCapacityComponent,
            data: {
              layout: {
                title: 'Workforce Capacity',
                navbarTitle: 'Teachers',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'schedule',
            component: AdminTeacherScheduleComponent,
            data: {
              layout: {
                title: 'Teacher Schedule',
                navbarTitle: 'Teacher Schedule',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'profile/:id',
            component: AdminTutorProfileComponent,
            data: {
              layout: {
                title: 'Tutor profile',
                navbarTitle: 'Tutor profile',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: ':tutorId/booking-detail/:courseId',
            component: AdminTutorBookingDetailsComponent,
            data: {
              layout: {
                title: 'Booking Details',
                navbarTitle: 'Booking Details',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'student',
        children: [
          {
            path: '',
            component: AdminStudentListComponent,
            data: {
              layout: {
                title: 'Students',
                navbarTitle: 'Students',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'profile/:id',
            component: AdminStudentProfileComponent,
            data: {
              layout: {
                title: 'Student profile',
                navbarTitle: 'Student profile',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: ':studentId/booking-detail/:courseId',
            component: AdminStudentBookingDetailComponent,
            data: {
              layout: {
                title: 'Student booking detail',
                navbarTitle: 'Booking detail',
                showHeader: false,
                showFooter: false,
              },
            },
          },
        ],
      },
      {
        path: 'classrooms',
        children: [
          {
            path: 'all',
            component: AdminClassroomsListComponent,
            data: {
              layout: {
                title: 'All Booking',
                navbarTitle: 'Classrooms',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'cancelled',
            component: AdminCancelledClassroomsComponent,
            data: {
              layout: {
                title: 'Cancelled',
                navbarTitle: 'Classrooms',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'course',
            component: AdminClassroomsPerCourseComponent,
            data: {
              layout: {
                title: 'Course',
                navbarTitle: 'Classrooms',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'finance',
        children: [
          {
            path: 'courses',
            component: AdminFinanceCoursesComponent,
            data: {
              layout: {
                title: 'All Courses',
                navbarTitle: 'Finance',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'orders',
            component: AdminFinanceOrdersComponent,
            data: {
              layout: {
                title: 'Finance Orders',
                navbarTitle: 'Finance',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'coupons',
            component: AdminFinanceCouponsComponent,
            data: {
              layout: {
                title: 'Finance Coupons',
                navbarTitle: 'Finance',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'refunds',
            component: AdminFinanceRefundOrdersComponent,
            data: {
              layout: {
                title: 'Finance Refund Orders',
                navbarTitle: 'Finance',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: '',
            redirectTo: 'orders',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'management',
        children: [
          {
            path: 'program',
            component: AdminProgramHomeComponent,
            data: {
              layout: {
                title: 'Program list',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'tutor-re-assignment',
            component: AdminManagementTutorReAssignmentComponent,
            data: {
              layout: {
                title: 'Tutor Re-assignment',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'tutor-approval-requests',
            component: TutorApprovalRequestComponent,
            data: {
              layout: {
                title: 'Tutor Approval Request',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'course-requests',
            component: AdminCourseRequestsComponent,
            data: {
              layout: {
                title: 'New Course Requests',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'testimonials',
            component: AdminTestimonialsComponent,
            data: {
              layout: {
                title: 'Testimonials',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: '',
            redirectTo: 'program',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'support-ticket',
        children: [
          {
            path: '',
            component: AdminSupportTicketComponent,
            data: {
              layout: {
                title: 'Support ticket',
                navbarTitle: 'Support ticket',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'ticket-details/:id',
            component: AdminTicketDetailsComponent,
            data: {
              layout: {
                title: 'Ticket details',
                navbarTitle: 'TICKET_DETAILS',
                showHeader: false,
                showFooter: false,
              },
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
