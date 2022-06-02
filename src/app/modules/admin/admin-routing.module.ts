import { NgModule } from '@angular/core';
import { AdminAuthGuard } from '@metutor/core/guards';
import { RouterModule, Routes } from '@angular/router';

import {
  AdminComponent,
  AdminCountryComponent,
  AdminSubjectComponent,
  AdminTutorListComponent,
  AdminStudentListComponent,
  AdminProgramListComponent,
  AdminFieldOfStudyComponent,
  AdminTestimonialsComponent,
  AdminCurrentTutorsComponent,
  AdminPendingTutorsComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminFinanceOrdersComponent,
  AdminCourseRequestsComponent,
  AdminTutorInterviewComponent,
  AdminStudentProfileComponent,
  AdminClassroomsListComponent,
  AdminSuspendedTutorsComponent,
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
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    data: {
      layout: {
        title: 'Admin - MEtutors',
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
                        title: 'Tutor interview - Metutors',
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
                        title: 'Tutor interview - Metutors',
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
                    title: 'Tutor interview - Metutors',
                    navbarTitle: 'Interview requests',
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
                title: 'All Teachers - Metutors',
                navbarTitle: 'All Teachers',
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
                title: 'Current Teachers - Metutors',
                navbarTitle: 'Current Teachers',
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
                title: 'Pending Teachers - Metutors',
                navbarTitle: 'Pending Teachers',
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
                title: 'Suspended Teachers - Metutors',
                navbarTitle: 'Suspended Teachers',
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
                title: 'Workforce Capacity - Metutors',
                navbarTitle: 'Workforce Capacity',
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
                title: 'Students - Metutors',
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
                title: 'Student profile - Metutors',
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
                title: 'Student booking detail - Metutors',
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
                title: 'All Booking - Metutors',
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
                title: 'Cancelled - Metutors',
                navbarTitle: 'Classrooms',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'booking-details/:id',
            component: AdminTutorBookingDetailsComponent,
            data: {
              layout: {
                title: 'Booking Details - Metutors',
                navbarTitle: 'Booking Details',
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
                title: 'Course - Metutors',
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
            path: 'orders',
            component: AdminFinanceOrdersComponent,
            data: {
              layout: {
                title: 'Finance Orders - Metutors',
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
                title: 'Finance Refund Orders - Metutors',
                navbarTitle: 'Finance',
                showHeader: false,
                showFooter: false,
              },
            },
          },
        ],
      },
      {
        path: 'management',
        children: [
          {
            path: 'program',
            component: AdminProgramListComponent,
            data: {
              layout: {
                title: 'Program list - Metutors',
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
                title: 'Tutor Re-assignment - Metutors',
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
                title: 'New Course Requests - Metutors',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'field-of-study',
            component: AdminFieldOfStudyComponent,
            data: {
              layout: {
                title: 'Field of Study - Metutors',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'subject',
            component: AdminSubjectComponent,
            data: {
              layout: {
                title: 'Subject - Metutors',
                navbarTitle: 'Management',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'country',
            component: AdminCountryComponent,
            data: {
              layout: {
                title: 'Country - Metutors',
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
                title: 'Testimonials - Metutors',
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
                title: 'Support ticket - Metutors',
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
                title: 'Ticket details - Metutors',
                navbarTitle: 'Ticket details',
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
