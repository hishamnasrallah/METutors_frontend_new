import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StudentComponent,
  StudentFaqComponent,
  StudentHelpComponent,
  StudentClassesComponent,
  StudentSyllabusComponent,
  StudentSettingsComponent,
  StudentDashboardComponent,
  StudentResourcesComponent,
  StudentClassroomsComponent,
  StudentAssignmentsComponent,
  StudentCreateTicketComponent,
  StudentCertificatesComponent,
  StudentSupportTicketComponent,
  StudentTicketDetailsComponent,
  StudentClassDashboardComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: {
      layout: {
        title: 'Student - Metutors',
        showHeader: false,
        showFooter: false,
      },
    },
    children: [
      {
        path: 'classrooms',
        children: [
          {
            path: '',
            component: StudentClassroomsComponent,
            data: {
              layout: {
                title: 'Student Classroom - Metutors',
                navbarTitle: 'Classroom',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'classes',
            component: StudentClassesComponent,
            data: {
              layout: {
                title: 'Student Classes - Metutors',
                navbarTitle: 'CLASSES_DASHBOARD',
                showHeader: false,
                showFooter: false,
                hideSidebar: true,
              },
            },
            children: [
              {
                path: 'syllabus/:id',
                component: StudentSyllabusComponent,
                data: {
                  layout: {
                    title: 'Student Syllabus - Metutors',
                    navbarTitle: 'Syllabus',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'resources/:id',
                component: StudentResourcesComponent,
                data: {
                  layout: {
                    title: 'Student Resources - Metutors',
                    navbarTitle: 'Resources',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },

              {
                path: 'assignments/:id',
                component: StudentAssignmentsComponent,
                data: {
                  layout: {
                    title: 'Student Assignments - Metutors',
                    navbarTitle: 'Assignments Dashboard',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'dashboard/:id',
                component: StudentClassDashboardComponent,
                data: {
                  layout: {
                    title: 'Student Classes - Metutors',
                    navbarTitle: 'CLASSES_DASHBOARD',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: '',
                redirectTo: 'dashboard/:id',
                pathMatch: 'full',
              },
            ],
          },
        ],
      },
      {
        path: 'help',
        component: StudentHelpComponent,
        data: {
          layout: {
            title: 'Help - Metutors',
            navbarTitle: 'Help',
            showHeader: false,
            showFooter: false,
            hideSidebar: true,
          },
        },
        children: [
          {
            path: 'faq',
            component: StudentFaqComponent,
            data: {
              layout: {
                title: 'FAQs - Metutors',
                navbarTitle: 'Frequently asked questions',
                showHeader: false,
                showFooter: false,
                hideSidebar: true,
              },
            },
          },
          {
            path: 'support-ticket',
            children: [
              {
                path: '',
                component: StudentSupportTicketComponent,
                data: {
                  layout: {
                    title: 'My tickets - Metutors',
                    navbarTitle: 'SUPPORT_TICKET',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'create-ticket',
                component: StudentCreateTicketComponent,
                data: {
                  layout: {
                    title: 'Create ticket - Metutors',
                    navbarTitle: 'Create ticket',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'ticket-details/:id',
                component: StudentTicketDetailsComponent,
                data: {
                  layout: {
                    title: 'Ticket details - Metutors',
                    navbarTitle: 'TICKET_DETAILS',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
            ],
          },
          {
            path: '',
            redirectTo: '/student/help/faq',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
        data: {
          layout: {
            title: 'Dashboard - Metutors',
            navbarTitle: 'Student Dashboard',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'certificates',
        component: StudentCertificatesComponent,
        data: {
          layout: {
            title: 'Certificates - Metutors',
            navbarTitle: 'Certificates',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'settings',
        component: StudentSettingsComponent,
        data: {
          layout: {
            title: 'Settings - Metutors',
            navbarTitle: 'Settings',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: '',
        redirectTo: '/student/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
