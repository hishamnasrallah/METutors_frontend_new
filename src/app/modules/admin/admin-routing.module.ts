import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@metutor/core/guards';

import {
  AdminComponent,
  AdminCountryComponent,
  AdminSubjectComponent,
  AdminTutorListComponent,
  AdminStudentListComponent,
  AdminProgramListComponent,
  AdminFieldOfStudyComponent,
  AdminCurrentTutorsComponent,
  AdminPendingTutorsComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminTutorInterviewComponent,
  AdminSuspendedTutorsComponent,
  AdminWorkforceCapacityComponent,
  AdminCancelledClassroomsComponent,
  AdminAllBookingClassroomsComponent,
  AdminTutorInterviewDetailsComponent,
  AdminTutorInterviewDocumentsComponent,
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
        component: AdminStudentListComponent,
        data: {
          layout: {
            title: 'Student List - Metutors',
            navbarTitle: 'Student list',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'classrooms',
        children: [
          {
            path: 'all',
            component: AdminAllBookingClassroomsComponent,
            data: {
              layout: {
                title: 'All Booking - Metutors',
                navbarTitle: 'All Booking',
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
                navbarTitle: 'Cancelled',
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
        path: 'program',
        children: [
          {
            path: 'list',
            component: AdminProgramListComponent,
            data: {
              layout: {
                title: 'Program list - Metutors',
                navbarTitle: 'Program',
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
                navbarTitle: 'Field of Study',
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
                navbarTitle: 'Subject',
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
                navbarTitle: 'Country List',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: '',
            redirectTo: 'list',
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
